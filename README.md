## Lumi Digital Experience (TR/EN)

Minimal, performans odaklı ve etkileşimli bir Next.js 14 uygulaması. Özel 3D yıldız arka planı (React Three Fiber), yumuşak kaydırma (Lenis), GSAP animasyonları ve çok dilli içerik (TR/EN) içerir.

### Özellikler (TR)
- Etkileşimli 3D yıldız alanı (arka plan, mouse/scroll duyarlı)
- Hero başlık parallax ve giriş animasyonları
- Hizmetler bölümü için yatay scroll + pinlenmiş sahne
- Özel imleç ve buton/hover mikro etkileşimleri
- Türkçe / İngilizce dil desteği

### Kurulum (TR)
```bash
npm install
npm run dev
# http://localhost:3000
```

### Yapılandırma (TR)
- Yol aliası: `@/*` → `src/*` (bkz. `tsconfig.json`)
- Tailwind: `tailwind.config.js`, global stiller: `src/app/globals.css`
- Çeviriler: `src/data/translations.ts`
- Sağlayıcılar: `src/components/providers.tsx`

### Deploy (TR)
- Vercel önerilir. Projeyi GitHub’a push’layın → Vercel’de Import → Framework: Next.js → Deploy.
- Özel alan adı için: Project → Settings → Domains → Add → DNS yönlendirmesi → Set as Primary.

---

Minimal, performance‑driven, interactive Next.js 14 app. Includes a custom 3D starfield (React Three Fiber), smooth scrolling (Lenis), GSAP animations, and bilingual content (TR/EN).

### Features (EN)
- Interactive 3D starfield background (mouse/scroll aware)
- Hero title parallax and entrance animations
- Horizontal scroll section with pinned scene for Services
- Custom cursor and micro‑interactions
- Turkish / English language support

### Setup (EN)
```bash
npm install
npm run dev
# http://localhost:3000
```

### Configuration (EN)
- Path alias: `@/*` → `src/*` (see `tsconfig.json`)
- Tailwind: `tailwind.config.js`, global styles: `src/app/globals.css`
- Translations: `src/data/translations.ts`
- Providers: `src/components/providers.tsx`

### Deploy (EN)
- Recommended on Vercel. Push to GitHub → Import on Vercel → Framework: Next.js → Deploy.
- Custom domain: Project → Settings → Domains → Add → point DNS → Set as Primary.

### Lisans / License
Bu repo MIT lisansı ile yayınlanır. / Released under MIT.
