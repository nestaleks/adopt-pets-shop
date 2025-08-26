# 🐾 Adopt Pets - Pet Adoption Website

A modern, bilingual (English/Ukrainian) pet adoption website that connects loving families with pets in need.

## 🌟 Features

- **Bilingual Support**: Full English and Ukrainian language support
- **User Authentication**: Registration and login system with secure password validation
- **Pet Catalog**: Browse available pets with advanced filtering options
- **Pet Details**: Detailed pet profiles with photo galleries and personality traits
- **Adoption Process**: Multi-step adoption application form
- **User Dashboard**: Manage profile, view applications, and save favorite pets
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Quick Start

### Option 1: Direct Browser Opening
1. Navigate to the project folder
2. Double-click on `index.html` to open in your default browser

### Option 2: Using Live Server (Recommended)
1. Install a local web server (e.g., Live Server extension in VS Code)
2. Open the project folder
3. Right-click on `index.html` and select "Open with Live Server"

### Option 3: Using Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open `http://localhost:8000` in your browser

## 📁 Project Structure

```
adopt-pets/
├── index.html              # Homepage
├── pages/                  # All page templates
│   ├── auth.html          # Login/Registration
│   ├── catalog.html       # Pet catalog
│   ├── pet-details.html   # Individual pet details
│   ├── adoption-form.html # Adoption application
│   ├── profile.html       # User dashboard
│   └── how-it-works.html  # Process guide
├── css/                    # Stylesheets
├── js/                     # JavaScript files
└── images/                 # Image assets
```

## 🔑 Demo Credentials

For testing purposes, you can use these demo accounts:
- **Email**: john@example.com
- **Password**: password123

Or create your own account through the registration form.

## 💡 How to Use

1. **Browse Pets**: Click "Browse Available Pets" to see all available animals
2. **Filter & Search**: Use the sidebar filters to find your perfect match
3. **View Details**: Click on any pet card to see detailed information
4. **Create Account**: Register to save favorites and submit applications
5. **Apply for Adoption**: Click "Adopt Me!" on a pet's page to start the application
6. **Manage Profile**: View your applications and favorites in your dashboard

## 🌐 Language Switching

Use the language dropdown in the navigation bar to switch between:
- 🇬🇧 English
- 🇺🇦 Українська (Ukrainian)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **LocalStorage**: Data persistence
- **Responsive Design**: Mobile-first approach

## 📝 Notes

- This is a frontend-only demonstration using mock data
- All data is stored in browser's LocalStorage
- Pet images are placeholders (actual images need to be added)
- For production use, integrate with a backend API and database

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements!

## 📄 License

This project is open source and available for educational purposes.