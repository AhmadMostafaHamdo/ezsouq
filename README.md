# 🛒 EzSouq - Modern Marketplace Application

EzSouq is a modern, responsive marketplace application built with React, Redux Toolkit, and Vite. It provides a complete e-commerce solution with user authentication, product management, and admin dashboard.

## ✨ Features

- 🔐 **Authentication System** - Login, Register, Password Reset
- 🛍️ **Product Management** - Browse, Search, Filter products
- ❤️ **Wishlist & Favorites** - Save favorite products
- 💬 **Comments & Reviews** - Product reviews and ratings
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Modern UI** - Built with Tailwind CSS and Framer Motion
- 🔧 **Admin Dashboard** - Complete admin panel for management
- 🌐 **Multi-language Support** - Arabic interface

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, Redux Toolkit
- **Styling**: Tailwind CSS, Framer Motion
- **Forms**: React Hook Form, Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Charts**: Nivo
- **Routing**: React Router v7

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ezsouq
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your API endpoints and configuration.

4. **Start development server**
   ```bash
   npm start
   ```

## 🔧 Available Scripts

- `npm start` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌍 Environment Variables

The application uses environment variables for API endpoints. Copy `.env.example` to `.env` and configure:

```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_WHATSAPP_API_URL=https://api.whatsapp.com/send
# ... other endpoints
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── store/              # Redux store and slices
├── routes/             # Routing configuration
├── assets/             # Static assets
├── feedback/           # Loading and error components
└── utils/              # Utility functions
```

## 🔒 Security Features

- Environment variables for sensitive data
- Token-based authentication
- Protected routes
- Input validation with Zod
- XSS protection

## 🎯 Performance Optimizations

- Code splitting with React.lazy()
- Image lazy loading
- Bundle optimization with Vite
- Redux state persistence
- Debounced search

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **EzSouq Team** - Development Team

## 🐛 Bug Reports

If you find a bug, please create an issue with detailed information about the problem.

## 📞 Support

For support, email support@ezsouq.com or create an issue in this repository.
