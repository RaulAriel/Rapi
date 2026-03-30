-- Drop the existing insecure policy
DROP POLICY IF EXISTS "Only authenticated users can view messages" ON contact_messages;

-- Create a new secure policy that only allows the admin (Raúl Ariel) to read messages
-- Using the hardcoded ADMIN_ID: 66f44605-2b47-4959-99a3-559196b05be1
CREATE POLICY "Only admin can view messages" ON contact_messages
FOR SELECT TO authenticated
USING (auth.uid() = '66f44605-2b47-4959-99a3-559196b05be1');