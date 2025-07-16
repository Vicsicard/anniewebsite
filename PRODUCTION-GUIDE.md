# Self Cast Studios Client Site Production Guide

## Project Overview
This is a production-ready template for Self Cast Studios client-facing websites. It is built on top of the ONE TO RULE THEM ALL CMS system and provides a standardized set of pages and components for client websites.

## Site Pages Structure
The website contains the 6 required pages:

1. **Home Page** (`pages/index.tsx`) - Main landing page with hero section, featured content, and call-to-action areas
2. **About Page** (`pages/about.tsx`) - Company/personal information page with biography, mission statement, and team section
3. **Blog Section**:
   - Blog Listing (`pages/blog.tsx`) - Lists all blog posts with pagination and category filtering
   - Blog Post Detail (`pages/blog/[slug].tsx`) - Individual blog post display with comments and social sharing
4. **Contact Page** (`pages/contact.tsx`) - Contact form, map, and company information
5. **Projects Page** (`pages/projects.tsx`) - Portfolio showcase with filtering by category
6. **Social Page** (`pages/social.tsx`) - Social media feed integration and sharing options

## Getting Production Ready

### 1. Content Setup
- Configure site content in the Payload CMS at http://localhost:3000/admin
- Upload all necessary media assets (logo, images, etc.)
- Create sample blog posts and project items
- Set up contact form email destination

### 2. Branding Customization
- Update brand colors in `tailwind.config.js` to match client's branding
- Replace placeholder logo in public directory
- Adjust typography settings as needed
- Update site metadata (title, description, etc.)

### 3. Deployment Steps
1. Run `npm install` in the client site directory
2. Test locally with `npm run dev` (available at http://localhost:5000)
3. Build for production with `npm run build`
4. Deploy the built site to your chosen hosting provider
5. Set up proper domain redirects and SSL certificates

### 4. Production Checklist
- [ ] All pages tested for responsiveness across devices
- [ ] SEO metadata properly configured
- [ ] Site performance optimized (images compressed, code minified)
- [ ] Forms tested and working properly
- [ ] Analytics tracking implemented
- [ ] Accessibility standards met (WCAG compliance)
- [ ] Cross-browser testing completed
- [ ] 404 and error pages created
- [ ] Favicon and app icons created
- [ ] Social sharing preview cards configured

## Technical Details
- **Frontend**: Next.js 14
- **Styling**: TailwindCSS with Self Cast Studios preset colors
- **CMS**: Payload CMS
- **Content API**: REST API from Payload CMS
- **Authentication**: None required for client-facing site
- **Forms**: Server-side form handling through API routes

## Support
For questions or issues, contact the Self Cast Studios development team or refer to the main ONE TO RULE THEM ALL documentation.
