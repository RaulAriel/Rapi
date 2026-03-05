-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy for public insertion (anyone can send a message)
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
FOR INSERT WITH CHECK (true);

-- Create policy for reading (only authenticated users, or you can keep it private)
-- For this simple use case, maybe only you want to see them in the dashboard.
CREATE POLICY "Only authenticated users can view messages" ON public.contact_messages
FOR SELECT TO authenticated USING (true);
