# Visual Neuro - Interactive Brain Cohort Analysis

Static website for Visual Neuro, migrated from WordPress to GitHub Pages.

## Overview

This is a static website for Visual Neuro, a free software application for visually exploring neuroimaging and clinical data. The site has been migrated from WordPress/Elementor to a clean, static HTML/CSS/JavaScript implementation hosted on GitHub Pages.

## Features

- **Responsive Design**: Mobile-first approach with full support for desktop, tablet, and mobile devices
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML, ARIA labels, and keyboard navigation
- **Performance**: Optimized assets, lazy loading, and minimal dependencies
- **Modern CSS**: CSS Variables, Grid, Flexbox, and smooth animations
- **Contact Form**: Integrated with Formspree for static form handling

## Project Structure

```
visualneuro.io/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   ├── js/
│   │   └── main.js         # JavaScript functionality
│   ├── images/
│   │   ├── logo.png        # Site logo
│   │   ├── brain.jpg       # Hero background
│   │   ├── inviwo-logo.png # Inviwo framework logo
│   │   └── icons/          # Feature icons
│   └── video/
│       ├── VisualNeuroDemo.mp4
│       └── VisualNeuroDemo_Moment.jpg
├── _config.yml             # GitHub Pages configuration
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine directives
└── README.md               # This file
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/visualneuro.io.git
cd visualneuro.io
```

### 2. Set Up Contact Form (Formspree)

1. Go to [Formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your form ID
3. Open `index.html` and replace `YOUR_FORM_ID` in the contact form action:
   ```html
   <form id="contact-form" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### 3. Configure GitHub Pages

1. Push your code to GitHub
2. Go to your repository settings
3. Navigate to "Pages" in the left sidebar
4. Under "Source", select the branch (usually `main` or `master`)
5. Select the folder (usually `/ (root)`)
6. Click "Save"
7. Your site will be available at `https://yourusername.github.io/visualneuro.io/`

### 4. Custom Domain (Optional)

If you have a custom domain (e.g., `visualneuro.io`):

1. Add a `CNAME` file in the root directory with your domain:
   ```
   visualneuro.io
   ```
2. Configure DNS settings with your domain provider:
   - Add a CNAME record pointing to `yourusername.github.io`
3. In GitHub repository settings → Pages, enter your custom domain

## Development

### Local Development

Since this is a static site, you can open `index.html` directly in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### Making Changes

- **HTML**: Edit `index.html`
- **Styles**: Edit `assets/css/styles.css`
- **JavaScript**: Edit `assets/js/main.js`
- **Images**: Add to `assets/images/` and update references in HTML

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Implemented

- ✅ Responsive navigation with mobile menu
- ✅ Smooth scrolling for anchor links
- ✅ Video player with controls
- ✅ Contact form with validation
- ✅ SEO optimization (meta tags, sitemap, robots.txt)
- ✅ Accessibility features (ARIA labels, keyboard navigation)
- ✅ Performance optimizations (lazy loading, optimized assets)

## Color Scheme

- **Dark Grey**: `#2c2c2c` / `#1a1a1a`
- **Coral/Orange**: `#ff6b6b`
- **Teal**: `#4ecdc4`
- **Yellow**: `#ffd93d`
- **White**: `#ffffff`

## Typography

- **Primary Font**: Roboto (body text)
- **Heading Font**: Roboto Slab
- **Serif Font**: Libre Baskerville
- **Accent Font**: Poppins

## License

This website is for Visual Neuro software. Please refer to the original Visual Neuro project for licensing information.

## Credits

- **Project Lead**: [Daniel Jönsson](https://liu.se/en/employee/danjo37)
- **Institution**: Center for Medical Image Science and Visualization (CMIV), Linköping University, Sweden
- **Framework**: Based on [Inviwo](http://www.inviwo.org) visualization framework

## Citation

If you use Visual Neuro in your research, please cite:

```bibtex
@article{jonsson2020visualneuro,
  title={{VisualNeuro: A Hypothesis Formation and Reasoning Application for Multi-Variate Brain Cohort Study Data}},
  author={Jönsson, Daniel and Bergström, Albin and Forsell, Camilla and Simon, Rozalyn and Engström, Maria and Walter, Susanna and Ynnerman, Anders and Hotz, Ingrid},
  journal={Computer Graphics Forum},
  year={2020},
  volume = {39},
  number = {6},
  pages = {392-407},
  doi = {10.1111/cgf.14045}
}
```

## Support

For questions or issues with the website, please open an issue on GitHub or contact the project lead.
