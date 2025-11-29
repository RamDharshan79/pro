# MaAaNn SkillSphere - Free Course Discovery Platform

A responsive static website that aggregates free online courses from various platforms and redirects users to the official course pages. It serves as a centralized discovery platform for learners seeking free educational resources across multiple domains.

## 🚀 Features

- **Course Discovery**: Search and browse free courses across multiple domains
- **Domain Navigation**: Explore courses by Technology, Commerce, Arts & Humanities, Science, and Design & Creativity
- **Advanced Filtering**: Filter courses by level, duration, and certificate availability
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **Platform Integration**: Courses from top platforms like Coursera, edX, Udemy, Khan Academy, and more

## 🏗️ Architecture

```
maaan-skillsphere/
├── index.html              # Homepage with search and domain navigation
├── domain.html             # Course listing page with filtering
├── assets/
│   ├── style.css          # Comprehensive CSS with dark mode support
│   └── script.js          # JavaScript functionality for filtering and interactions
└── data/
    └── courses.json       # Course data with 28 sample courses
```

## 🎯 Core Functionality

### Homepage Features
- Large search bar for course discovery
- Domain cards with course counts
- Featured courses section
- Dark mode toggle

### Domain Page Features
- Dynamic header based on domain or search parameters
- Left sidebar with filtering options (Level, Duration, Certificate)
- Responsive course grid with platform badges
- "Go to Course" buttons that open external course links

### Filtering System
- **Level**: Beginner, Intermediate, Advanced
- **Duration**: 0-10 hours, 10-30 hours, 30-50 hours, 50+ hours
- **Certificate**: Filter courses that offer certificates
- **Search**: Case-insensitive search across course names, subdomains, and domains

## 🎨 Design System

- **Primary Colors**: Blue accent (#2563eb) for CTAs and links
- **Typography**: Modern sans-serif system fonts
- **Layout**: Card-based design with consistent spacing
- **Responsive**: Mobile-first approach with breakpoints at 768px and 480px
- **Accessibility**: Focus states, high contrast support, reduced motion support

## 🚀 Deployment

### GitHub Pages Deployment

1. **Fork or clone this repository**
2. **Enable GitHub Pages** in repository settings
3. **Set source** to "Deploy from a branch" and select your main branch
4. **Access your site** at `https://[username].github.io/[repository-name]/`

### Local Development

```bash
# Clone the repository
git clone https://github.com/[username]/maaan-skillsphere.git
cd maaan-skillsphere

# Start a local server
python3 -m http.server 8000
# or
npx serve .

# Open in browser
open http://localhost:8000
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Customization

### Adding New Courses

Edit `data/courses.json` and add new course objects following this structure:

```json
{
  "id": 29,
  "course_name": "Your Course Name",
  "domain": "Technology",
  "subdomain": "Programming",
  "platform": "Coursera",
  "level": "Beginner",
  "duration": 20,
  "certificate": true,
  "language": "English",
  "url": "https://example.com/course",
  "last_verified": "2025-11-01"
}
```

### Modifying Domains

Update the domain cards in `index.html` and ensure corresponding courses exist in `courses.json`.

### Styling Customization

Modify CSS custom properties in `assets/style.css`:

```css
:root {
  --primary-color: #your-color;
  --background-color: #your-color;
  /* ... other variables */
}
```

## 🛡️ Performance

- **Minimal JavaScript**: Pure vanilla JavaScript, no frameworks
- **Optimized CSS**: Single stylesheet with efficient selectors
- **Static Files**: No server-side processing required
- **Browser Caching**: JSON data cached for better performance
- **Responsive Images**: Uses system fonts and emoji for fast loading

## 📊 Analytics (Optional)

To add analytics, include your tracking code in the `<head>` section of both HTML files.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Course data from various educational platforms
- Icons and emojis for visual elements
- Modern web standards for accessibility and performance