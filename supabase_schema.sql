-- Schema for Marie's Sutil Detalle Store

-- Create a table for products
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,      -- Diamond price / main display price
    price_gold DECIMAL(10, 2) NOT NULL DEFAULT 0.00, -- Gold price
    stock INTEGER NOT NULL DEFAULT 0,
    category TEXT NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    contents JSONB DEFAULT '[]'::jsonb,              -- Legacy / flat contents
    diamond_variant JSONB DEFAULT NULL,              -- { contents, cost_box, cost_labor, price }
    gold_variant JSONB DEFAULT NULL                  -- { contents, cost_box, cost_labor, price }
);

-- Run these if the table already exists:
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS contents JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS price_gold DECIMAL(10,2) NOT NULL DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS diamond_variant JSONB DEFAULT NULL;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS gold_variant JSONB DEFAULT NULL;

-- Set up Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies (Idempotent: drop if exists before creating)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.products;
CREATE POLICY "Public profiles are viewable by everyone."
ON public.products FOR SELECT
USING (is_active = true);

DROP POLICY IF EXISTS "Admins can view all products" ON public.products;
CREATE POLICY "Admins can view all products"
ON public.products FOR SELECT
USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
CREATE POLICY "Admins can insert products"
ON public.products FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update products" ON public.products;
CREATE POLICY "Admins can update products"
ON public.products FOR UPDATE
USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete products" ON public.products;
CREATE POLICY "Admins can delete products"
ON public.products FOR DELETE
USING (auth.role() = 'authenticated');

-- Create a function to automatically keep updated_at current
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to execute the function before update
-- DROP TRIGGER IF EXISTS BEFORE CREATE matches table behavior
DROP TRIGGER IF EXISTS update_products_modtime ON public.products;
CREATE TRIGGER update_products_modtime
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Optional: Create a storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to images (Storage policies)
DROP POLICY IF EXISTS "Public Read Image Access" ON storage.objects;
CREATE POLICY "Public Read Image Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );

DROP POLICY IF EXISTS "Admin Upload Image Access" ON storage.objects;
CREATE POLICY "Admin Upload Image Access"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'product-images' );

DROP POLICY IF EXISTS "Admin Update Image Access" ON storage.objects;
CREATE POLICY "Admin Update Image Access"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'product-images' );

DROP POLICY IF EXISTS "Admin Delete Image Access" ON storage.objects;
CREATE POLICY "Admin Delete Image Access"
ON storage.objects FOR DELETE
USING ( bucket_id = 'product-images' );

-- Create a table for orders
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    items JSONB NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL
);

-- RLS for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Anyone can insert an order (checkout)
DROP POLICY IF EXISTS "Anyone can create an order" ON public.orders;
CREATE POLICY "Anyone can create an order"
ON public.orders FOR INSERT
WITH CHECK (true);

-- Only admins can see and update orders
DROP POLICY IF EXISTS "Admins can view orders" ON public.orders;
CREATE POLICY "Admins can view orders"
ON public.orders FOR SELECT
USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
CREATE POLICY "Admins can update orders"
ON public.orders FOR UPDATE
USING (auth.role() = 'authenticated');
