# Redomy - UA Test Plan

## Site Information
| Field | Value |
|-------|-------|
| **Site Name** | Redomy |
| **Repository** | redomy-demo |
| **Live URL** | https://aiunites.github.io/redomy-demo/ |
| **Local Path** | C:/Users/Tom/Documents/GitHub/redomy-demo |
| **Last Updated** | January 24, 2026 |
| **Version** | 1.0.0 |
| **Based On** | DemoTemplate |
| **Tagline** | Redo My Home |

---

## Pages Inventory

| Page | File | Description | Status |
|------|------|-------------|--------|
| Main App | index.html | All screens (SPA) | ✅ Active |

---

## Screens (In index.html)

| Screen | ID | Description | Status |
|--------|-----|-------------|--------|
| Landing | landing-screen | Hero, features, projects showcase | ✅ |
| Auth | auth-screen | Login/Signup forms | ✅ |
| Dashboard | dashboard-screen | My Projects view | ✅ |

---

## Core Features (Inherited from DemoTemplate)

### 🔐 Authentication System
| Feature | Status | Notes |
|---------|--------|-------|
| User Registration | ✅ | |
| User Login | ✅ | |
| Demo Mode Login | ✅ | |
| Logout | ✅ | |
| First User = Admin | ✅ | |
| Auto-create Demo Users | ✅ | |
| Terms/Privacy Agreement | ✅ | |
| Reset App Link | ✅ | |

### 👤 User Dropdown Menu
| Feature | Status | Notes |
|---------|--------|-------|
| Click to Toggle | ✅ | |
| Admin Panel Link | ✅ | |
| Settings Link | ✅ | |
| Logout Link | ✅ | |

### ⚙️ Settings Modal
| Feature | Status | Notes |
|---------|--------|-------|
| Edit Display Name | ✅ | |
| Edit Email | ✅ | |
| Backup & Restore | ✅ | |
| View My Cache | ✅ | |
| Legal Links | ✅ | |

### 🗄️ Cache Viewer Modal
| Feature | Status | Notes |
|---------|--------|-------|
| Summary Tab | ✅ | Projects count |
| Items Tab | ✅ | My Projects list |
| Raw Data Tab | ✅ | |
| Clear My Data | ✅ | |

### 🛡️ Admin Panel Modal
| Feature | Status | Notes |
|---------|--------|-------|
| System Settings Tab | ✅ | |
| Users Tab | ✅ | |
| Statistics Tab | ✅ | |
| Changelog Tab | ✅ | |

### 📜 Legal Modal
| Feature | Status | Notes |
|---------|--------|-------|
| Terms of Service | ✅ | |
| Privacy Policy | ✅ | |

---

## Redomy-Specific Features

### 🏠 Item Configuration
| Item Property | Value |
|---------------|-------|
| Item Name | project |
| Item Name Plural | projects |
| Empty Icon | 🏠 |

### 📋 Project Fields
| Field | Type | Status |
|-------|------|--------|
| Project Name | text | ✅ |
| Room Type | select | ✅ |
| Status | select | ✅ |
| Budget | number | ✅ |
| Description | textarea | ✅ |

### 🎨 Landing Page
| Feature | Status | Notes |
|---------|--------|-------|
| Hero Section | ✅ | Transform Your Space |
| Hero Cards | ✅ | Bathroom, Kitchen, Living Room |
| Features Grid | ✅ | Plan, Budget, Inspiration, Contractors |
| Projects Showcase | ✅ | Sample projects |
| Demo Badge | ✅ | Pre-launch indicator |
| AIUNITES Webring | ✅ | |

### 📊 Dashboard Stats
| Stat | Description | Status |
|------|-------------|--------|
| Total Projects | Count all | ✅ |
| In Progress | Filter by status | ✅ |
| Completed | Filter by status | ✅ |
| Total Budget | Sum budgets | ✅ |

### ☁️ Cloud Integration
| Feature | Status | Notes |
|---------|--------|-------|
| CloudDB Module | ✅ | js/cloud-database.js |
| Form Submission | ⬜ | Not configured |
| API Fetch | ⬜ | Not configured |

---

## JavaScript Files

| File | Purpose | Status |
|------|---------|--------|
| config.js | App configuration | ✅ |
| storage.js | localStorage wrapper | ✅ |
| auth.js | Authentication logic | ✅ |
| app.js | Main app logic | ✅ |
| cloud-database.js | Cloud sync module | ✅ |

---

## localStorage Keys

| Key | Purpose |
|-----|---------|
| `redomy_users` | All user accounts |
| `redomy_currentUser` | Logged in user |
| `redomy_items` | All projects |
| `redomy_favorites_[userId]` | User's favorites |

---

## Test Scenarios

### Landing Page Tests
- [ ] Hero loads with cards
- [ ] Features grid displays
- [ ] Sample projects show
- [ ] Login button works
- [ ] Try Demo works

### Authentication Tests
- [ ] Signup creates user
- [ ] Login validates credentials
- [ ] Demo login works
- [ ] Logout clears session

### Dashboard Tests
- [ ] Stats display correctly
- [ ] Projects grid loads
- [ ] Empty state shows
- [ ] View tabs work

### CRUD Tests
- [ ] Create project
- [ ] Edit project
- [ ] Delete project
- [ ] Favorite toggle

### Modal Tests
- [ ] Settings modal works
- [ ] Backup downloads
- [ ] Restore imports
- [ ] Cache viewer works
- [ ] Admin panel works

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Jan 2026 | Initial release |

---

*Last tested: January 24, 2026*
