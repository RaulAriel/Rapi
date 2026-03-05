CREATE OR REPLACE FUNCTION public.handle_contact_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- We use a very simple approach. If it fails, it fails silently for the user.
  -- We'll try to get the apikey, but won't crash if we can't.
  PERFORM
    net.http_post(
      url := 'https://akwlgcghwgrulymouckd.supabase.co/functions/v1/contact-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || COALESCE((current_setting('request.headers', true)::jsonb)->>'apikey', '')
      ),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- This ensures the INSERT always succeeds even if notification fails
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
