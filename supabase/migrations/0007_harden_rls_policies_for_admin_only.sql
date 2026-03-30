-- Hardening RLS policies for Projects: Only the specific admin can manage data
DROP POLICY IF EXISTS "Users can manage their own projects" ON projects;
DROP POLICY IF EXISTS "Public read access projects" ON projects;

CREATE POLICY "Public read access projects" ON projects 
FOR SELECT USING (user_id = '66f44605-2b47-4959-99a3-559196b05be1');

CREATE POLICY "Admin manage projects" ON projects 
FOR ALL TO authenticated USING (auth.uid() = '66f44605-2b47-4959-99a3-559196b05be1');

-- Hardening RLS policies for Skills
DROP POLICY IF EXISTS "Users can manage their own skills" ON skills;
DROP POLICY IF EXISTS "Public read access skills" ON skills;

CREATE POLICY "Public read access skills" ON skills 
FOR SELECT USING (user_id = '66f44605-2b47-4959-99a3-559196b05be1');

CREATE POLICY "Admin manage skills" ON skills 
FOR ALL TO authenticated USING (auth.uid() = '66f44605-2b47-4959-99a3-559196b05be1');

-- Hardening RLS policies for FAQs
DROP POLICY IF EXISTS "Admin gestiona sus faqs" ON faqs;
DROP POLICY IF EXISTS "Lectura pública de faqs" ON faqs;

CREATE POLICY "Public read access faqs" ON faqs 
FOR SELECT USING (user_id = '66f44605-2b47-4959-99a3-559196b05be1');

CREATE POLICY "Admin manage faqs" ON faqs 
FOR ALL TO authenticated USING (auth.uid() = '66f44605-2b47-4959-99a3-559196b05be1');

-- Hardening RLS policies for Testimonials
DROP POLICY IF EXISTS "Admin gestiona sus testimonios" ON testimonials;
DROP POLICY IF EXISTS "Lectura pública de testimonios" ON testimonials;

CREATE POLICY "Public read access testimonials" ON testimonials 
FOR SELECT USING (user_id = '66f44605-2b47-4959-99a3-559196b05be1');

CREATE POLICY "Admin manage testimonials" ON testimonials 
FOR ALL TO authenticated USING (auth.uid() = '66f44605-2b47-4959-99a3-559196b05be1');