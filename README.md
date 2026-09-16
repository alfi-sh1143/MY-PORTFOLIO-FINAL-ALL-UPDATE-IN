# Alfi Shahriyar — UI/UX Designer & Front-End Developer Portfolio

Production-ready, highly accessible personal portfolio website for **Alfi Shahriyar**, highlighting work in UI/UX design, modern front-end development, and academic research in Federated Learning & IoT Intrusion Detection.

---

## 🚀 Public Deployment Guide (Vercel)

This project is fully optimized for standard static and modern edge deployment on [Vercel](https://vercel.com).

### Step 1: Push Code to GitHub
1. Create a repository on your GitHub account (e.g. `alfi-shahriyar-portfolio`).
2. Export or clone this project and push it to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/alfi-shahriyar-portfolio.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel
1. Log in to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New** → **Project**.
3. Import your GitHub repository (`alfi-shahriyar-portfolio`).
4. Framework Preset will auto-detect as **Vite**.
5. Keep the default build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. Click **Deploy**.
7. In under 60 seconds, your site will be live with a free worldwide public URL (e.g., `https://alfi-shahriyar.vercel.app`) with free automated SSL and global edge CDN caching.

---

## 🛠️ Local Development

To run this portfolio locally on your computer:

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## ⚙️ Content Customization

All portfolio data, text, projects, educational records, contact channels, and links are centralized in a single configuration file:

📁 **`src/config/portfolio.ts`**

### Updating Projects or Case Studies
Open `src/config/portfolio.ts` and update the `projects` array. You can easily modify descriptions, tools, screenshots, and UX case study narratives.

### Connecting Your Real PDF Resume
1. Place your compiled PDF resume in `public/cv/Alfi_Shahriyar_CV.pdf`.
2. In `src/config/portfolio.ts`, change:
   ```typescript
   cv: {
     available: true, // change to true
     path: "/cv/Alfi_Shahriyar_CV.pdf",
     label: "Download CV"
   }
   ```
3. Commit and push. Vercel will automatically re-deploy your updated resume.

---

## 📐 Technology Stack

- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (configured for dark mode obsidian aesthetics)
- **Typography:** Syne (display headings), Plus Jakarta Sans (body copy), JetBrains Mono (metrics & code)
- **Icons:** Lucide React
- **SEO & Social:** OpenGraph tags, Twitter cards, `sitemap.xml`, and `robots.txt`
