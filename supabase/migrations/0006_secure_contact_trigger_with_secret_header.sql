-- Update the trigger function to include the security secret header
CREATE OR REPLACE FUNCTION public.handle_contact_insert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- We include a secret header that matches the one checked in the Edge Function
  PERFORM
    net.http_post(
      url := 'https://akwlgcghwgrulymouckd.supabase.co/functions/v1/contact-notification',
      headers := '{"Content-Type": "application/json", "X-Contact-Secret": "6589e472-5f6a-4b9e-9d8c-7f5b8a9c0d1e"}'::jsonb,
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Never block the user from sending a message even if the notification fails
  RETURN NEW;
END;
$function$;