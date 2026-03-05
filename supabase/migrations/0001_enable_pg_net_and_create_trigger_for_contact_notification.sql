-- Enable the pg_net extension to allow making HTTP requests from SQL
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Function to call the edge function
CREATE OR REPLACE FUNCTION public.handle_contact_insert()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://akwlgcghwgrulymouckd.supabase.co/functions/v1/contact-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('request.headers')::jsonb->>'apikey' -- This might not work in background triggers
      ),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function after a new message is inserted
DROP TRIGGER IF EXISTS on_contact_message_inserted ON public.contact_messages;
CREATE TRIGGER on_contact_message_inserted
  AFTER INSERT ON public.contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_contact_insert();
