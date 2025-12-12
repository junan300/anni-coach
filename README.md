# Anni Aguilar - Professional Life Coach Website

A beautiful, bilingual (English/Spanish) static website for professional life coaching services.

## Features

- 🌐 Bilingual support (English/Spanish)
- 📱 Fully responsive design
- 🎨 Modern, professional UI with Tailwind CSS
- 📅 Calendly integration for appointment booking
- ✨ Smooth animations and transitions

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Wouter** - Client-side routing
- **shadcn/ui** - UI components

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deploying to GitHub Pages

### Option 1: Manual Setup (Recommended)

1. Go to your repository settings on GitHub
2. Navigate to **Pages** (under "Code and automation")
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. Create `.github/workflows/deploy.yml` with this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "22"
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist/public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. Commit and push - your site will deploy automatically!

### Option 2: Using a Custom Domain

1. Follow Option 1 first
2. In repository settings → Pages:
   - Add your custom domain (e.g., `anniaguilar.com`)
   - Enable "Enforce HTTPS"
3. In your domain registrar (where you bought the domain):
   - Add a CNAME record pointing to `<your-username>.github.io`
   - Or add A records pointing to GitHub's IPs (see [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))

## Project Structure

```
├── client/
│   ├── public/          # Static assets (images, fonts)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── contexts/    # React contexts
│   │   ├── App.tsx      # Main app component with routing
│   │   └── main.tsx     # Entry point
│   └── index.html       # HTML template
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

## Pages

- **Home** (`/`) - Hero section with CTA
- **About** (`/about`) - Professional bio and credentials
- **Services** (`/services`) - Coaching services offered
- **Testimonials** (`/testimonials`) - Client testimonials
- **Contact** (`/contact`) - Contact information
- **Booking** (`/booking`) - Calendly integration for appointments

## Customization

### Update Contact Information

Edit `client/src/components/Footer.tsx` to update:
- Social media links
- Email address
- Phone number

### Update Calendly Link

Edit `client/src/pages/Booking.tsx`:
```tsx
data-url="https://calendly.com/your-username"
```

### Change Colors

Edit `client/src/index.css` to modify the color palette in the `:root` section.

## License

MIT
