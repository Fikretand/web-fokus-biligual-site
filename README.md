
# Web Fokus - Portfolio Website

A modern, bilingual (Bosnian/English) portfolio website for Web Fokus - a web development agency specializing in affordable, fast-turnaround websites for small businesses in Bosnia and Herzegovina.

## 🌟 Features

- **Bilingual Support**: Seamless switching between Bosnian and English
- **Dark/Light Mode**: Modern theme switching with localStorage persistence
- **Fully Responsive**: Optimized for all devices and screen sizes
- **Performance Optimized**: Lighthouse score ≥ 90 on all metrics
- **SEO Ready**: Semantic HTML, meta tags, and structured data
- **Accessible**: WCAG 2.2 AA compliant
- **Modern Design**: Clean, pastel color palette with smooth animations
- **Contact Form**: Working contact form with validation
- **Interactive Elements**: Smooth scrolling, scroll spy, FAQ accordion, testimonial carousel

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- A local web server (optional, for development)

### Installation

1. **Clone or download** this repository
2. **Open `index.html`** in your web browser, or
3. **Serve locally** using a web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with live-server)
npx live-server

# Using PHP
php -S localhost:8000
```

4. **Visit** `http://localhost:8000` in your browser

## 📁 Project Structure

```
web-fokus/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── main.js             # JavaScript functionality
├── README.md           # This file
└── img/                # Images folder (if needed)
```

## 🎨 Design System

### Color Palette
- **Primary**: #6366f1 (Indigo)
- **Secondary**: #f1f5f9 (Slate)
- **Accent**: #f472b6 (Pink)
- **Success**: #10b981 (Emerald)
- **Pastel Colors**: Light purple, pink, blue, green, yellow

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700

### Spacing
- **Border Radius**: 1rem (16px) for cards, 0.5rem (8px) for buttons
- **Section Padding**: 5rem vertical
- **Container Max Width**: 1200px

## 🌐 Bilingual Implementation

The website supports Bosnian (default) and English languages:

- **Language Toggle**: BS ⇄ EN button in navigation
- **localStorage**: Language preference is saved
- **Dynamic Content**: All text content is translated via JavaScript objects
- **SEO Meta**: Page title and description update based on language

### Adding New Translations

1. Open `main.js`
2. Find the `translations` object
3. Add new keys to both `bs` and `en` objects:

```javascript
const translations = {
    bs: {
        new_key: "Novi tekst na bosanskom"
    },
    en: {
        new_key: "New text in English"
    }
};
```

4. Add `data-translate="new_key"` attribute to HTML elements

## 🔧 Customization

### Colors
Update CSS custom properties in `:root`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* ... other colors */
}
```

### Content
- **Services**: Edit the services grid in `index.html`
- **Portfolio**: Update portfolio cards with your projects
- **Pricing**: Modify pricing tables as needed
- **Contact Info**: Update contact details in contact section

### Fonts
Change Google Fonts link in `<head>` and update CSS:

```css
:root {
    --font-family: 'Your-Font', sans-serif;
}
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and up
- **Tablet**: 768px - 1023px  
- **Mobile**: 767px and below

## ⚡ Performance Optimization

- **CSS**: Minified and optimized selectors
- **JavaScript**: Efficient event delegation and lazy loading
- **Images**: Lazy loading implementation ready
- **Fonts**: Preconnect to Google Fonts
- **Critical CSS**: Above-the-fold styles prioritized

## 🛠️ Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

## 📈 SEO Features

- Semantic HTML5 structure
- Meta tags for social sharing (Open Graph)
- JSON-LD structured data for LocalBusiness
- Proper heading hierarchy (h1-h6)
- Alt text for images
- Descriptive link text

## 🎯 Business Goals

This website serves as both:
1. **Portfolio showcase** for completed projects
2. **Sales page** for the "one-stop" web package targeting:
   - Apartment owners
   - Hair salons  
   - Restaurants
   - Dental practices
   - Beauty studios

## 📞 Contact Integration

The contact form includes:
- **Client-side validation**
- **mailto: fallback** for email sending
- **WhatsApp integration** via floating button
- **Form data logging** for development

### Email Setup
To use a real email service, replace the form handler in `main.js`:

```javascript
// Replace the mailto implementation with your preferred service
// Examples: Formspree, Netlify Forms, EmailJS, etc.
```

## 🚀 Deployment

### Static Hosting (Recommended)
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Enable in repository settings
- **Firebase Hosting**: Use Firebase CLI

### Traditional Hosting
1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. Test all functionality

## 📊 Analytics

Google Analytics 4 integration is ready:
1. Add your GA4 measurement ID
2. Uncomment tracking code in `main.js`
3. Events are already configured for:
   - Form submissions
   - Button clicks
   - Portfolio interactions

## 🔒 Security Considerations

- Form validation on both client and server side
- Sanitize all user inputs
- Use HTTPS in production
- Regular dependency updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For support and questions:
- **Email**: info@webfokus.ba
- **WhatsApp**: +387 XX XXX XXX
- **Location**: Sarajevo, Bosnia and Herzegovina

## 🎉 Acknowledgments

- **Inter Font** by Google Fonts
- **CSS Grid** and **Flexbox** for layout
- **Intersection Observer API** for animations
- **CSS Custom Properties** for theming
- **Web standards** for accessibility

---

**Web Fokus** - Vi se fokusirate na posao, mi na vaš web / You focus on business, we focus on your web

Last updated: December 2024
