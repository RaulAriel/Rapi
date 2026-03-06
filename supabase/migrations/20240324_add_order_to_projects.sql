-- Add order_index column to projects if it doesn't exist
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- Update existing projects with an initial order based on creation date
WITH numbered_projects AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) - 1 as new_order
  FROM public.projects
)
UPDATE public.projects p
SET order_index = np.new_order
FROM numbered_projects np
WHERE p.id = np.id;