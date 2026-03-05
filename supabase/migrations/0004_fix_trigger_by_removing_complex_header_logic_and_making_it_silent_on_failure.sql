-- Final fix for the trigger: remove dependencies on request headers which are unreliable in background triggers
CREATE OR REPLACE FUNCTION public.handle_contact_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- We just pass the record. We'll handle auth in the edge function more gracefully.
  PERFORM
    net.http_post(
      url := 'https://akwlgcghwgrulymouckd.supabase.co/functions/v1/contact-notification',
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Never block the user from sending a message even if the email notification fails
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
