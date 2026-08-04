-- CivicAI public demo content. The first MVP is account-free and keeps no
-- personal documents. These tables are ready for the future retrieval layer.
CREATE TABLE IF NOT EXISTS public.demo_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  authority text NOT NULL,
  subject text NOT NULL,
  deadline text,
  summary text NOT NULL,
  confidence text NOT NULL DEFAULT 'medium'
);
ALTER TABLE public.demo_cases ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.demo_cases TO anonymous, authenticated;
DROP POLICY IF EXISTS demo_cases_read ON public.demo_cases;
CREATE POLICY demo_cases_read ON public.demo_cases FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS public.demo_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt text UNIQUE NOT NULL,
  answer text NOT NULL,
  source_note text NOT NULL
);
ALTER TABLE public.demo_questions ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.demo_questions TO anonymous, authenticated;
DROP POLICY IF EXISTS demo_questions_read ON public.demo_questions;
CREATE POLICY demo_questions_read ON public.demo_questions FOR SELECT USING (true);
