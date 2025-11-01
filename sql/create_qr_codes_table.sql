-- Create QR Codes table for storing generated QR codes
-- This ensures QR codes are generated once and reused

CREATE TABLE IF NOT EXISTS qr_codes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    food_court_id UUID NOT NULL REFERENCES food_courts(id) ON DELETE CASCADE,
    table_number INTEGER NOT NULL,
    qr_code_url TEXT NOT NULL, -- URL to the QR code API or stored image
    qr_code_data TEXT, -- Base64 encoded QR code image (optional, for offline use)
    menu_url TEXT NOT NULL, -- The actual URL that the QR code points to
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Ensure unique QR code per table per food court
    UNIQUE(food_court_id, table_number)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_qr_codes_food_court ON qr_codes(food_court_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_table_number ON qr_codes(food_court_id, table_number);

-- Add RLS (Row Level Security)
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

-- Policy: Allow admins to read all QR codes
CREATE POLICY "Allow admins to read QR codes"
ON qr_codes FOR SELECT
USING (true); -- In production, add proper admin role check

-- Policy: Allow admins to insert QR codes
CREATE POLICY "Allow admins to insert QR codes"
ON qr_codes FOR INSERT
WITH CHECK (true); -- In production, add proper admin role check

-- Policy: Allow admins to update QR codes
CREATE POLICY "Allow admins to update QR codes"
ON qr_codes FOR UPDATE
USING (true); -- In production, add proper admin role check

-- Policy: Allow admins to delete QR codes
CREATE POLICY "Allow admins to delete QR codes"
ON qr_codes FOR DELETE
USING (true); -- In production, add proper admin role check

-- Add trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_qr_codes_updated_at
    BEFORE UPDATE ON qr_codes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add comment to table
COMMENT ON TABLE qr_codes IS 'Stores generated QR codes for food court tables. QR codes are generated once and reused to avoid regeneration.';
COMMENT ON COLUMN qr_codes.qr_code_url IS 'URL to QR code API or stored image location';
COMMENT ON COLUMN qr_codes.qr_code_data IS 'Base64 encoded QR code image for offline use (optional)';
COMMENT ON COLUMN qr_codes.menu_url IS 'The actual URL that customers land on when scanning the QR code';
