-- Database Schema for HM Robotics

-- 1. Services Table
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT, -- Lucide icon name string
    features TEXT[], -- Array of strings
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY, -- e.g., PRJ-01
    title TEXT NOT NULL,
    client TEXT,
    category TEXT,
    sector TEXT, -- Defense, Industrial, Medical, Research
    image TEXT,
    size TEXT DEFAULT 'medium', -- large, medium, tall, wide
    coordinates TEXT,
    power TEXT,
    uptime TEXT,
    description TEXT,
    stats JSONB DEFAULT '[]'::jsonb, -- Array of objects: { label, value, icon }
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Contact Submissions (Lead Capture)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    interests TEXT[],
    skill_level TEXT,
    learning_goals TEXT,
    motivation TEXT,
    referral TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies (Public can read, Admin can manage)
CREATE POLICY "Public can view services" ON services FOR SELECT USING (true);
CREATE POLICY "Public can view projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can insert contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Admin policies (assuming authenticated users are admins for simplicity in this setup)
-- Admin policies (UPDATED FOR LOCAL TESTING: Allowing public anon access temporarily since user is using local bypass)
-- WARNING: In production, revert these to check for auth.role() = 'authenticated'
CREATE POLICY "Admins can manage services" ON services FOR ALL USING (true);
CREATE POLICY "Admins can manage projects" ON projects FOR ALL USING (true);
CREATE POLICY "Admins can view submissions" ON contact_submissions FOR SELECT USING (true);
