# Supabase SQL Query Log

This document logs the SQL queries used for setting up the database for the Notion clone project.

## 1. `notes` 테이블 생성 (Create `notes` table)
```sql
-- `notes` 테이블 생성
CREATE TABLE public.notes (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    -- id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    -- user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    content jsonb NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT notes_pkey PRIMARY KEY (id),
    CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
```

## 2. RLS (Row Level Security) 정책 설정 (Set up RLS policies)
```sql
-- `notes` 테이블에 RLS 활성화
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- SELECT 정책: 사용자는 본인이 작성한 문서만 조회할 수 있습니다.
CREATE POLICY "Enable read access for own user" ON public.notes
AS PERMISSIVE FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
-- CREATE POLICY "Enable read access for own user" ON public.notes
-- FOR SELECT USING (auth.uid() = user_id);

-- INSERT 정책: 사용자는 자신의 user_id로만 문서를 생성할 수 있습니다.
CREATE POLICY "Enable insert for own user" ON public.notes
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
-- CREATE POLICY "Enable insert for own user" ON public.notes
-- FOR INSERT WITH CHECK (auth.uid() = user_id);

-- UPDATE 정책: 사용자는 본인이 작성한 문서만 수정할 수 있습니다.
CREATE POLICY "Enable update for own user" ON public.notes
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- DELETE 정책: 사용자는 본인이 작성한 문서만 삭제할 수 있습니다.
CREATE POLICY "Enable delete for own user" ON public.notes
AS PERMISSIVE FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
```
