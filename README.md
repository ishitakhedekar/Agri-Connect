# AgriConnect — Frontend

React frontend for the AgriConnect platform. Connects landowners with farmers through land listings, direct messaging, and role-based dashboards.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| UI Library | Material UI (MUI) v5 |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Image Uploads | Cloudinary (unsigned preset) |
| State | React Context API |
| Storage | localStorage |

---

## Project Structure

```
src/
├── components/
│   ├── About/
│   │   └── AboutUs.js
│   ├── Auth/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Profile.js
│   │   └── ProtectedRoute.js
│   ├── Chat/
│   │   └── Chat.js
│   ├── Dashboard/
│   │   └── Dashboard.js
│   ├── Home/
│   │   └── Home.js
│   ├── Lands/
│   │   ├── BrowseLands.js
│   │   ├── LandDetails.js
│   │   └── PostLand.js
│   └── Layout/
│       ├── Header.js
│       └── Footer.js
├── contexts/
│   └── LandContext.js        # Global land state
├── api.js                    # API base URL config
├── App.js                    # Routes and theme
├── index.js                  # Entry point
└── index.css                 # Global styles
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- AgriConnect backend running on `http://localhost:5000`

### Installation

```bash
# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root of the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the App

```bash
# Development
npm start
```

App runs on `http://localhost:3000`

---

## Pages & Routes

| Route | Component | Auth | Role |
|---|---|---|---|
| `/` | Home | No | Any |
| `/about` | AboutUs | No | Any |
| `/login` | Login | No | Any |
| `/register` | Register | No | Any |
| `/dashboard` | Dashboard | Yes | Any |
| `/profile` | Profile | Yes | Any |
| `/lands` | BrowseLands | No | Any |
| `/lands/:id` | LandDetails | No | Any |
| `/post-land` | PostLand | Yes | Landowner only |
| `/chat` | Chat (inbox) | Yes | Any |
| `/chat/:userId` | Chat (conversation) | Yes | Any |

---

## Key Features

### Role-Based Access
- Users register as either **Farmer** or **Landowner**
- Role is stored in JWT and verified on both frontend and backend
- `ProtectedRoute` component blocks access based on auth and role
- UI adapts throughout — nav links, dashboard content, and CTAs differ per role

### Land Listings
- Landowners post land with photos (uploaded to Cloudinary), soil type, area, lease terms, and yield distribution
- Farmers browse and filter listings by location, land type, and area
- Each listing shows a status badge — **Available** or **Occupied**
- Landowners can toggle status from the land detail page

### Image Uploads
Images are uploaded directly from the browser to Cloudinary using an unsigned upload preset.

```
Cloud Name: djfk9eavu
Upload Preset: Agri-App
```

To change the Cloudinary config, update these constants in `PostLand.js`:
```js
const CLOUDINARY_CLOUD_NAME = 'djfk9eavu';
const CLOUDINARY_UPLOAD_PRESET = 'Agri-App';
```

### Messaging
- Farmers contact landowners directly from a land listing
- Full inbox view shows all conversations with last message preview
- Conversation view polls every 4 seconds for new messages
- Send messages with Enter key or the Send button

### Session Management
User sessions are stored in `sessionStorage` — the session clears automatically when the browser tab is closed.

---

## Theme

The app uses a consistent green agricultural theme throughout:

| Token | Value |
|---|---|
| Primary | `#2e7d32` |
| Secondary | `#66bb6a` |
| Dark Green | `#1b5e20` |
| Light Green | `#e8f5e9` |
| Accent | `#a5d6a7` |
| Background | `#f5f5f5` |

Font: Roboto (body), Georgia serif (headings and brand name)

---

## Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Go to **Settings → Upload → Upload Presets**
3. Create an **unsigned** preset
4. Copy the preset name into `PostLand.js`