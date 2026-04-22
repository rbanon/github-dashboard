# 🚀 GitHub Dashboard

A modern **Single Page Application (SPA)** for exploring GitHub profiles interactively. Search any user and visualize their activity, repositories, languages used, and statistics.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)]()
[![Built with Vue 3](https://img.shields.io/badge/built%20with-Vue%203-4FC08D?style=flat-square&logo=vue.js)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)]()
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite)]()

## ✨ Features

### 🔍 Smart Search
- Search any GitHub user by username
- Real-time search without authentication
- Public GitHub API (60 req/hour without token)

### 👤 User Profile
- **Avatar** and basic information
- **Bio** and location
- Statistics: followers, following, public repos
- Direct link to GitHub profile

### 📊 Repository Analysis
- **Repository grid** with key information
- Stars and forks per repo
- Programming language
- Description and update date
- Fork badge

### 📈 Language Chart
- **Doughnut chart** of most-used languages
- Top 10 languages with frequencies
- Custom colors per language
- Dropdown list with details

### 📅 Recent Activity
- **Timeline** of public events
- Latest commits, PRs, releases
- Relative timestamps (e.g., "2 hours ago")
- Links to repositories

### 🌐 Internationalization (i18n)
- **English and Spanish**
- Real-time language switching
- localStorage persistence

### 🎨 Light/Dark Theme
- **Dark mode** by default (GitHub/Discord style)
- **Light mode** with clean colors
- Auto-detection of system theme
- Header toggle with SVG icons

## 🛠️ Tech Stack

| Component | Technology | Why |
|-----------|-----------|-----|
| **Framework** | Vue 3 + Composition API | Modern, reactive, performant |
| **Language** | TypeScript | Type-safe, better development |
| **Bundler** | Vite | Fast, current standard |
| **Styles** | Custom SCSS | No UI library dependencies |
| **Charts** | Chart.js + vue-chartjs | Simple and effective |
| **HTTP** | Axios | Request management |
| **i18n** | vue-i18n | Professional multi-language |
| **API** | GitHub REST API v3 | Public, no authentication |

## 📦 Installation

### Requirements
- Node.js 16+
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/github-dashboard.git
cd github-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

## 🚀 Usage

1. **Start the app** with `npm run dev`
2. **Enter a GitHub username** in the search bar
3. **Press Enter** or click "Search"
4. **Explore the dashboard** with:
   - User profile
   - Language chart
   - Recent activity
   - Featured repositories

### Controls
- 🌙 **Toggle theme**: Sun/moon button in header
- 🌐 **Change language**: EN/ES buttons in header
- 🔗 **External links**: Click repositories to go to GitHub

## 📁 Project Structure

```
src/
├── components/
│   ├── AppHeader.vue          # Sticky header with controls
│   ├── SearchBar.vue          # User search
│   ├── UserProfile.vue        # Profile card
│   ├── RepoCard.vue           # Individual repo card
│   ├── ReposList.vue          # Repository grid
│   ├── LanguageChart.vue      # Doughnut chart of languages
│   ├── ActivityFeed.vue       # Event timeline
│   └── icons/
│       ├── IconGitHub.vue
│       ├── IconSun.vue
│       └── IconMoon.vue
├── services/
│   └── githubApi.ts           # GitHub API functions
├── composables/
│   └── useTheme.ts            # Dark/light mode logic
├── types/
│   └── github.ts              # Type interfaces
├── i18n/
│   ├── index.ts
│   └── locales/
│       ├── en.ts              # English translations
│       └── es.ts              # Spanish translations
├── styles/
│   └── main.scss              # Global styles
├── App.vue                    # Root component
└── main.ts                    # Entry point
```

## 🎨 Themes

### Dark Mode (Default)
```scss
--bg-primary:     #0d1117
--text-primary:   #e6edf3
--accent:         #58a6ff
```

### Light Mode
```scss
--bg-primary:     #ffffff
--text-primary:   #1f2328
--accent:         #0969da
```

## 🔗 API

Uses the **GitHub REST API v3** publicly:

### Endpoints Used

- `GET /users/{username}` - User information
- `GET /users/{username}/repos` - Repositories (max 12, sorted by date)
- `GET /users/{username}/events/public` - Public events (latest 10)

**Limit**: 60 requests/hour without authentication

See [official documentation](https://docs.github.com/rest)

## 📊 TypeScript Types

```typescript
interface GithubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  followers: number
  public_repos: number
  // ... more fields
}

interface GithubRepo {
  id: number
  name: string
  description: string | null
  stargazers_count: number
  language: string | null
  // ... more fields
}
```

## 🚦 Available Scripts

```bash
npm run dev        # Start Vite server at http://localhost:5173
npm run build      # Build for production (dist/)
npm run preview    # Preview the build
npm run type-check # Check TypeScript types
```

## 📈 Next Steps

See [ROADMAP.md](./docs/ROADMAP.md) for complete list of planned features:

- ✅ Current MVP completed
- 🎯 **Phase 2**: UX & Performance (skeleton loaders, rate limiting)
- 🚀 **Phase 3**: Advanced features (user comparison, advanced search)
- 📦 **Phase 4**: Deployment & Docs
- ✨ **Phase 5**: PWA & Optimizations

## 🌍 Deployment

### GitHub Pages

```bash
npm run build
# Follow steps at https://pages.github.com/
```

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or simply connect the repo at [vercel.com](https://vercel.com)

## 🤝 Contributing

Contributions are welcome. For major changes:

1. Fork the project
2. Create a branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for development guide

## 📝 License

This project is under the MIT license. See [LICENSE](./LICENSE) for details.

## 👨‍💻 Author

Created as a portfolio project - GitHub Dashboard

## 🐛 Issues & Support

Found a bug? [Open an issue](../../issues/new)

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/rest)
- [Vue 3](https://vuejs.org/)
- [Chart.js](https://www.chartjs.org/)
- [Vite](https://vitejs.dev/)

---

**⭐ If you like the project, don't forget to leave a star!**

[Back to top ⬆️](#-github-dashboard)
