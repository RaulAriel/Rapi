-- Add honeypot column to the table
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS website TEXT;

-- Update the notification handler with rate limiting and honeypot check
CREATE OR REPLACE FUNCTION public.handle_contact_insert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'vault'
AS $function$
DECLARE
  contact_secret text;
  recent_count int;
BEGIN
  -- 1. HONEYPOT CHECK: If 'website' field is filled, it's a bot. Stop here.
  IF NEW.website IS NOT NULL AND NEW.website <> '' THEN
    RAISE LOG 'Contact honeypot triggered by %', NEW.email;
    RETURN NEW;
  END IF;

  -- 2. RATE LIMIT CHECK: Max 5 messages per email in the last hour
  SELECT count(*) INTO recent_count 
  FROM public.contact_messages 
  WHERE email = NEW.email 
    AND created_at > now() - interval '1 hour';

  IF recent_count > 5 THEN
    RAISE LOG 'Rate limit exceeded for email %', NEW.email;
    RETURN NEW;
  END IF;

  -- 3. GLOBAL RATE LIMIT: Max 50 messages total in the last hour (protects Resend quota)
  SELECT count(*) INTO recent_count 
  FROM public.contact_messages 
  WHERE created_at > now() - interval '1 hour';

  IF recent_count > 50 THEN
    RAISE LOG 'Global contact rate limit exceeded';
    RETURN NEW;
  END IF;

  -- 4. PROCEED WITH NOTIFICATION
  SELECT decrypted_secret INTO contact_secret 
  FROM vault.decrypted_secrets 
  WHERE name = 'CONTACT_NOTIFICATION_SECRET';

  PERFORM
    net.http_post(
      url := 'https://akwlgcghwgrulymouckd.supabase.co/functions/v1/contact-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-contact-secret', COALESCE(contact_secret, '')
      ),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
    
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW;
END;
$function$;