# 로또 번호 추천 서비스

한국 로또 6/45 번호를 추천해주는 웹 서비스입니다.

## 기능

- **랜덤 추천**: 1~45 중 6개 + 보너스 번호 추천
- **추천 이력**: 최근 5회 추천 번호 저장
- **Supabase 저장**: 추천 번호를 Supabase에 자동 저장
- **2026년 1등 당첨번호**: 최신 회차 당첨번호 표시
- **데이터 분석 추천**: 역대 100회 1등 당첨 데이터 기반 3가지 추천

## 사용 방법

- 로컬: `index.html` 또는 `lotto.html`을 브라우저에서 열면 됩니다.
- Vercel 배포: GitHub 연동 후 자동 배포.

## Supabase + Vercel 환경변수 설정

### 1. Supabase 테이블 생성

Supabase SQL Editor에서 실행:

```sql
create table lotto_recommendations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  main_numbers text not null,
  bonus_number int not null,
  source text default 'random'
);

alter table lotto_recommendations enable row level security;

create policy "Allow anonymous insert"
  on lotto_recommendations for insert with check (true);

create policy "Allow public read"
  on lotto_recommendations for select using (true);
```

### 2. Vercel 환경변수 설정

1. Vercel 대시보드 → 프로젝트 선택 → **Settings** → **Environment Variables**
2. 아래 변수 추가:

| Name | Value |
|------|-------|
| `SUPABASE_URL` | Supabase Project URL (Settings → API) |
| `SUPABASE_ANON_KEY` | Supabase anon public key |

3. **Save** 후 **Redeploy** (기존 배포가 있으면 재배포 필요)
