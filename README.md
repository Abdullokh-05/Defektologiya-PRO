# Defektologiya PRO — Kurs Sayti

Israilova Nilufar Abdumajitovna amaliy kursi uchun bitta sahifali (single-page) marketing va ro'yxatdan o'tish sayti.

## 🚀 Texnologiyalar
- **Frontend**: Toza HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Shriftlar**: Google Fonts (Cormorant Garamond + Plus Jakarta Sans)
- **Ma'lumotlar bazasi**: Supabase (faqat `registrations` jadvaliga yozish)
- **Joylashtirish (Hosting)**: Vercel

---

## 📋 Sahifa tuzilmasi
1. **Sticky Header / Nav** — Kurs nomi va Ro'yxatdan o'tish tugmasi
2. **Hero** — Asosiy sarlavha, faktlar qatori (8 modul, 05.10–30.11, 05.12, 700+ mutaxassis), fotosurat uchun arka foni
3. **Kimlar uchun** — 4 ta maqsadli auditoriya guruhi
4. **Ustoz haqida** — Israilova Nilufar Abdumajitovna biografiyasi va yutuqlari
5. **Nima kiritilgan (Nega aynan biz)** — `TODO` kutilayotgan blok
6. **Format** — Onlayn vs Oflayn taqqoslama
7. **Dastur (8 modul)** — Har bir modul darslari bilan yig'ilgan (accordion) ko'rinishda
8. **Fikrlar** — (v1 talabiga binoan DOM dan chiqarib tashlangan, manbada izoh qoldirilgan)
9. **Sertifikatlar** — Oltin, Kumush, Bronza toifalari (rangli nuqtalar bilan)
10. **Narxlar** — Onlayn (2.2 mln), Oflayn (6 mln), Individual mentorlik (12 mln)
11. **Ro'yxatdan o'tish (`#royxat`)** — Ism, telefon va formatni tanlash shakli
12. **Footer** — Instagram havolasi, Telegram `TODO` va mualliflik huquqi

---

## 🗄 Supabase sozlamalari

Supabase SQL Editor bo'limida quyidagi jadvalni yarating:

```sql
create table registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  track text not null check (track in ('onlayn', 'oflayn', 'mentorlik')),
  created_at timestamptz not null default now()
);

-- Anonim foydalanuvchilarga arizalarni kiritish (INSERT) huquqini berish:
alter table registrations enable row level security;

create policy "Allow anonymous inserts"
on registrations
for insert
with check (true);
```

### Kalitlarni ulash:
`app.js` faylidagi quyidagi o'zgaruvchilarga Supabase loyiha manzili va Anon kalitini joylashtiring:
```javascript
const SUPABASE_URL = "https://your-project.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key";
```

---

## 🌐 Vercel ga yuklash

1. Kodni GitHub repozitoriyasiga push qiling:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Defektologiya PRO landing page"
   git branch -M main
   git remote add origin <GITHUB_REPO_URL>
   git push -u origin main
   ```
2. [Vercel](https://vercel.com) ga kiring va "Add New Project" orqali repozitoriyani import qiling.
3. Loyiha statik fayllardan iborat bo'lgani sababli hech qanday qo'shimcha build buyrug'i talab qilinmaydi. "Deploy" tugmasini bosing.
