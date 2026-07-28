-- ==============================================================================
-- SUPABASE CONTACT FORM TABLE SETUP & QUERY SCRIPT (MADE BY NEXAFORCE)
-- ==============================================================================
-- Run this SQL in the Supabase SQL Editor:
-- 1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/hwvgcasaiemgfepeozbr
-- 2. Click on "SQL Editor" in the left sidebar
-- 3. Paste and run this script.
-- ==============================================================================

-- 1. CREATE "ContactMessage" TABLE (matching Prisma & Supabase JS SDK schema)
CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. CREATE INDEXES FOR FAST QUERYING
CREATE INDEX IF NOT EXISTS "ContactMessage_createdAt_idx" ON "ContactMessage" ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS "ContactMessage_read_idx" ON "ContactMessage" ("read");

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE "ContactMessage" ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES
-- Policy 1: Allow public user contact form submissions (INSERT)
DROP POLICY IF EXISTS "Allow public contact form submission" ON "ContactMessage";
CREATE POLICY "Allow public contact form submission" 
ON "ContactMessage" 
FOR INSERT 
WITH CHECK (true);

-- Policy 2: Allow reading messages (SELECT)
DROP POLICY IF EXISTS "Allow select contact messages" ON "ContactMessage";
CREATE POLICY "Allow select contact messages" 
ON "ContactMessage" 
FOR SELECT 
USING (true);

-- Policy 3: Allow updating read status (UPDATE)
DROP POLICY IF EXISTS "Allow update contact messages" ON "ContactMessage";
CREATE POLICY "Allow update contact messages" 
ON "ContactMessage" 
FOR UPDATE 
USING (true);

-- ==============================================================================
-- HOW TO VIEW FILLED CONTACT FORMS IN SUPABASE:
-- Run the query below in Supabase SQL Editor to see all contact submissions:
-- ==============================================================================

SELECT 
    "id",
    "name",
    "email",
    "message",
    "read",
    "createdAt"
FROM "ContactMessage"
ORDER BY "createdAt" DESC;
