Movie Explorer je moderna web aplikacija za istraživanje filmova, izgrađena pomoću [Next.js](https://nextjs.org/), React-a i TypeScript-a. Omogućava korisnicima da pretražuju, filtriraju, ocenjuju i čuvaju omiljene filmove koristeći podatke sa [The Movie Database (TMDb)](https://www.themoviedb.org/). Aplikacija podržava autentifikaciju putem Google naloga, kao i čuvanje liste omiljenih i "watchlist" filmova po korisniku.

---

## Karakteristike

- **Pretraga filmova** po nazivu
- **Pregled popularnih, najbolje ocenjenih, nadolazećih i trenutno prikazivanih filmova**
- **Filtriranje** po žanru i godini
- **Detalji o filmu** (sinopsis, glumci, režiseri, trejler)
- **Korisnička autentifikacija** (Google)
- **Omiljeni filmovi** i **Watchlist** (po korisniku, lokalno čuvanje)
- **Paginacija** rezultata
- **Podrška za svetlu i tamnu temu**

---

## Tehnologije

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://zustand-demo.pmnd.rs/) (state management)
- [Firebase](https://firebase.google.com/) (autentifikacija)
- [Tailwind CSS](https://tailwindcss.com/) (stilizacija)
- [TMDb API](https://developers.themoviedb.org/3) (izvor podataka)

---

## Instalacija

1. **Klonirajte repozitorijum:**

   ```bash
   git clone git@github.com:anesferatovic/Movie-Explorer.git
   cd movie-explorer
   ```

2. **Instalirajte zavisnosti:**

   ```bash
   npm install
   # ili
   yarn install
   # ili
   pnpm install
   # ili
   bun install
   ```

3. **Pokrenite razvojni server:**

   ```bash
   npm run dev
   # ili
   yarn dev
   # ili
   pnpm dev
   # ili
   bun dev
   ```

4. Otvorite [http://localhost:3000](http://localhost:3000) u vašem pretraživaču.

---

## Konfiguracija okruženja (`.env` fajl)

Za ovaj projekat nije neophodan `.env` fajl jer su TMDb API ključ i Firebase konfiguracija već postavljeni u kodu.  
**Međutim, za produkciju se preporučuje da osetljive podatke (API ključeve) prebacite u `.env.local` fajl i učitate ih iz okruženja.**

Primer `.env.local` fajla:

```
NEXT_PUBLIC_TMDB_API_KEY=vaš_tmdb_api_ključ
NEXT_PUBLIC_FIREBASE_API_KEY=vaš_firebase_api_ključ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
```

Zatim izmenite kod da koristi promenljive okruženja umesto hardkodovanih vrednosti.

---

## Skripte

- `npm run dev` – Pokreće razvojni server
- `npm run build` – Pravi produkcijski build
- `npm run start` – Pokreće produkcijski server
- `npm run lint` – Pokreće ESLint proveru

---

## Deploy

Najlakši način za deploy je korišćenje [Vercel](https://vercel.com/) platforme.  
Pratite [Next.js deploy dokumentaciju](https://nextjs.org/docs/app/building-your-application/deploying) za više informacija.

---

## Zahvalnice

- [TMDb](https://www.themoviedb.org/) za API i podatke o filmovima
- [Vercel](https://vercel.com/) za hosting i Next.js

---

## Licenca

Ovaj projekat je open-source i koristi MIT licencu.
