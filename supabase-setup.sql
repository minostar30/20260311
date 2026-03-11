-- Supabase SQL Editor에서 실행
-- 로또 추천 번호 저장 테이블 생성

create table if not exists lotto_recommendations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  main_numbers text not null,
  bonus_number int not null,
  source text default 'random'
);

alter table lotto_recommendations enable row level security;

-- 기존 정책 제거 후 재생성 (이미 있으면 에러 방지)
drop policy if exists "Allow anonymous insert" on lotto_recommendations;
drop policy if exists "Allow public read" on lotto_recommendations;

create policy "Allow anonymous insert"
  on lotto_recommendations for insert
  with check (true);

create policy "Allow public read"
  on lotto_recommendations for select
  using (true);
