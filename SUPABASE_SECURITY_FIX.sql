-- Ejecuta este código en el editor SQL de Supabase (SQL Editor)

-- 1. Asegurar que RLS está activado en la tabla
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 2. Eliminar la política insegura que permite a cualquier usuario autenticado leer todos los mensajes
DROP POLICY IF EXISTS "Only authenticated users can view messages" ON contact_messages;

-- 3. Crear una política restringida: solo tu ID de administrador puede leer los mensajes
-- Esto evita que cualquier otro usuario registrado pueda acceder a la información PII
CREATE POLICY "Only admin can view messages" ON contact_messages 
FOR SELECT TO authenticated 
USING (auth.uid() = '66f44605-2b47-4959-99a3-559196b05be1');

-- 4. Asegurar que cualquier visitante (público) pueda seguir enviando mensajes a través del formulario
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;
CREATE POLICY "Anyone can insert contact messages" ON contact_messages 
FOR INSERT WITH CHECK (true);