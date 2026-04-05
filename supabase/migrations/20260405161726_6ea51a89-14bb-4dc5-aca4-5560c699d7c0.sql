
-- Create skin_checks table
CREATE TABLE public.skin_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_info TEXT NOT NULL,
  contact_type TEXT NOT NULL CHECK (contact_type IN ('email', 'phone', 'telegram')),
  photo_path TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  ai_result JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.skin_checks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (no auth required for anonymous submissions)
CREATE POLICY "Anyone can create a skin check"
  ON public.skin_checks FOR INSERT
  WITH CHECK (true);

-- Allow reading by ID (for result polling)
CREATE POLICY "Anyone can read skin checks"
  ON public.skin_checks FOR SELECT
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_skin_checks_updated_at
  BEFORE UPDATE ON public.skin_checks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public) VALUES ('skin-photos', 'skin-photos', false);

-- Allow anyone to upload photos
CREATE POLICY "Anyone can upload skin photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'skin-photos');

-- Allow service role to read photos (for edge functions)
CREATE POLICY "Service role can read skin photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'skin-photos');
