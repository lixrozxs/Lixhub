# 🎌 Anime Community Platform

A full-stack anime community platform with enhanced moderation system, built with Next.js 15, Express.js, and Supabase.

## 🚀 Features

### 🎯 Core Features
- **Anime Discovery**: Browse, search, and track anime
- **Community**: Posts, comments, and discussions
- **User Profiles**: Customizable profiles with watchlists and favorites
- **Real-time**: Live notifications and interactions via WebSocket
- **Mobile-First**: Responsive design that works on all devices

### 🔐 Enhanced Moderation System
- **Role-based Permissions**: USER, MOD, ADMIN, OWNER roles
- **Content Moderation**: Report and review system for posts/comments
- **User Warnings**: Structured warning system with severity levels
- **Audit Trail**: Complete moderation action logging
- **Bulk Actions**: Efficient bulk moderation operations
- **Dashboard**: Comprehensive moderation analytics

### 🛠️ Technical Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Prisma ORM, JWT Authentication
- **Database**: PostgreSQL via Supabase
- **Real-time**: Socket.IO for live features
- **Authentication**: Secure JWT-based auth with bcrypt

## 📁 Project Structure

```
├── src/                      # Next.js 15 application
│   ├── app/                 # App Router pages
│   │   ├── page.tsx        # Main homepage
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   ├── components/          # Reusable UI components
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions
├── backend/                 # Express.js API server
│   ├── routes/             # API route handlers
│   │   ├── auth.js         # Authentication routes
│   │   ├── anime.js        # Anime data routes
│   │   ├── community.js    # Community features
│   │   ├── admin.js        # Admin functionality
│   │   ├── moderation.js   # Basic moderation
│   │   └── moderation-enhanced.js  # Advanced moderation
│   ├── middleware/         # Express middleware
│   ├── utils/              # Utility functions
│   ├── prisma/             # Database schema
│   └── index.js            # Server entry point
├── public/                 # Static assets
├── docs/                   # Documentation
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for database)

### 1. Clone the Repository
```bash
git clone https://github.com/lixrozxs/Lixhub.git
cd Lixhub
```

### 2. Set Up Backend
```bash
cd backend
npm install
```

### 3. Configure Supabase
```bash
# Edit SUPABASE_CONFIG.txt with your Supabase credentials
# Then run:
node configure-supabase.js
```

### 4. Set Up Database
```bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to Supabase
npm run db:seed      # Create admin user
```

### 5. Set Up Frontend
```bash
cd ..
npm install
```

### 6. Start Development Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
npm run dev
```

### 7. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Login**: Username: `admin`, Password: `admin123`

## 📱 Mobile Responsiveness

The platform is fully responsive and works seamlessly on:
- 📱 **Mobile phones** (320px+)
- 📱 **Tablets** (768px+)
- 💻 **Desktop** (1024px+)

### Mobile Features
- Collapsible navigation menu
- Touch-friendly buttons and interactions
- Optimized layouts for small screens
- Responsive typography and spacing

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Enhanced Moderation
- `GET /api/moderation-enhanced/dashboard` - Moderation statistics
- `GET /api/moderation-enhanced/reports` - Get all reports
- `POST /api/moderation-enhanced/warnings` - Create user warning
- `GET /api/moderation-enhanced/log` - Get moderation audit log
- `POST /api/moderation-enhanced/reports/bulk` - Bulk report actions

### Community Features
- `GET /api/community/posts` - Get community posts
- `GET /api/anime` - Get anime list
- `GET /api/anime/:id` - Get anime details

## 🔧 Configuration

### Environment Variables
Backend `.env` file requires:
```bash
DATABASE_URL="postgresql://..."
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-key"
JWT_SECRET="your-jwt-secret"
PORT=5000
```

### Database Schema
The platform uses a comprehensive schema with tables for:
- Users with role-based permissions
- Posts and comments with moderation
- Reports and warnings system
- Notifications and audit logs
- Watchlists, favorites, and ratings

## 🎯 Moderation System Features

### Role Hierarchy
1. **OWNER** - Full system access
2. **ADMIN** - User management and system settings
3. **MOD** - Content moderation and user warnings
4. **USER** - Standard community access

### Moderation Tools
- **Content Reports**: User-generated content reports
- **Warning System**: Structured warnings with severity levels
- **Audit Logging**: Complete action tracking
- **Bulk Operations**: Efficient multi-item moderation
- **Real-time Notifications**: Instant moderation alerts

## 🛡️ Security Features

- JWT-based authentication with secure token handling
- Password hashing with bcrypt (12 salt rounds)
- Role-based access control (RBAC)
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Helmet.js security headers

## 🌐 Deployment

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Railway/Heroku)
```bash
cd backend
# Set environment variables in deployment platform
npm start
```

### Database (Supabase)
- Schema automatically deployed via Prisma
- Real-time subscriptions enabled
- Row Level Security configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints above

---

**Built with ❤️ for the anime community** 🎌