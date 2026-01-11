# The Urban Chocolatier - Static Website

A beautiful, responsive landing page for The Urban Chocolatier, designed to be hosted on Cloudflare Pages.

## Features

- 📱 Fully responsive design
- 🎨 Modern gradient background
- 📍 Integrated Google Maps location
- ☎️ Direct call-to-action buttons
- 🔗 Links to menu, reviews, orders, loyalty program, Instagram, and website
- 🖼️ Signature products showcase
- 📤 Share functionality
- 🎯 Clean, accessible HTML structure

## Repository Structure

```
static-website/
├── index.html          # Main landing page
└── README.md           # This file
```

## Deployment to Cloudflare Pages

### Prerequisites
- A Cloudflare account (free tier works fine)
- This GitHub repository

### Step-by-Step Deployment

1. **Log in to Cloudflare Dashboard**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com/)
   - Sign in or create a free account

2. **Navigate to Pages**
   - Click on "Workers & Pages" in the left sidebar
   - Click "Create application"
   - Select "Pages" tab
   - Click "Connect to Git"

3. **Connect Your GitHub Repository**
   - Authorize Cloudflare to access your GitHub account
   - Select the `static-website` repository
   - Click "Begin setup"

4. **Configure Build Settings**
   - **Project name**: Choose a name (e.g., `urban-chocolatier`)
   - **Production branch**: `main`
   - **Build command**: Leave empty (no build needed)
   - **Build output directory**: `/` (root directory)
   - Click "Save and Deploy"

5. **Wait for Deployment**
   - Cloudflare will deploy your site in seconds
   - You'll receive a URL like: `https://your-project.pages.dev`

6. **Access Your Live Site**
   - Click on the provided URL to view your live website
   - The site will auto-deploy on every push to the main branch

### Custom Domain (Optional)

To use a custom domain:

1. Go to your Cloudflare Pages project
2. Click "Custom domains"
3. Click "Set up a custom domain"
4. Follow the instructions to add your domain

## Local Development

To preview the site locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/akimeh-source/static-website.git
   cd static-website
   ```

2. Open `index.html` in your browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

   Or use a simple HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (npx)
   npx serve
   ```

## Customization

The website uses embedded CSS and inline images. To customize:

- **Colors**: Edit the CSS variables in the `<style>` section
- **Content**: Update text directly in the HTML
- **Links**: Modify the `href` attributes in the anchor tags
- **Images**: Replace the QRCodeChimp CDN URLs with your own images

## Technologies Used

- HTML5
- CSS3 (with CSS Custom Properties)
- Vanilla JavaScript
- SVG icons

## License

This project is for The Urban Chocolatier business.

## Support

For issues or questions about deployment, visit [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
