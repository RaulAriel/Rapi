-- Update the trigger function to be more robust
CREATE OR REPLACE FUNCTION public.handle_contact_insert()
RETURNS TRIGGER AS $$
DECLARE
  request_headers TEXT;
  headers_json JSONB;
  api_key TEXT;
BEGIN
  -- Get the headers string safely
  request_headers := current_setting('request.headers', true);
  
  -- If we have headers, try to parse them as JSON
  IF request_headers IS NOT NULL THEN
    BEGIN
      headers_json := request_headers::jsonb;
      api_key := headers_json->>'apikey';
    EXCEPTION WHEN OTHERS THEN
      api_key := NULL;
    END;
  END IF;

  -- Call the edge function
  -- We use the anon key if available, otherwise just an empty string for the header
  -- The edge function currently just checks for the existence of the header
  PERFORM
    net.http_post(
      url := 'https://akwlgcghwgrulymouckd.supabase.co/functions/v1/contact-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || COALESCE(api_key, '')
      ),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
    
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- We don't want to block the insert if the notification fails
  -- Log the error if needed (though it's hard in PL/pgSQL without specific extensions)
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
