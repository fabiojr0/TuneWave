# Sound Scout

Sound Scout is a web application integrated with Spotify, designed to help you explore and discover music based on your listening habits. With Sound Scout, you can:

- View your top tracks, artists, and genres over different time periods.
- Discover new music recommendations based on your listening history.
- Create playlists from your top tracks or curated recommendations.
- Explore detailed information about tracks, artists, and playlists.

## Features

- **Top Tracks, Artists, and Genres:** See your most-listened-to tracks, artists, and genres over the last 4 weeks, 6 months, or all time.
- **Discovery:** Discover new music recommendations tailored to your tastes.
- Playlist Creation: Create playlists from your top tracks or curated recommendations.
- Detailed Information: Get detailed information about tracks, artists, and playlists.

## Technologies Used

- Frontend: React.js, Tailwind CSS
- Authentication: OAuth 2.0 with Spotify
- API Integration: Spotify Web API

## Setup

1. Clone the repository: git clone https://github.com/fabiojr0/sound-scout.git
2. Install dependencies: npm install
3. Create a .env file in the root directory and add your Spotify API credentials:
```
SPOTIFY_CLIENT_ID=your-client-id
SPOTIFY_CLIENT_SECRET=your-client-secret
REDIRECT_URI=http://localhost:5173/callback
```
4. Start the development server: npm run dev
5. Open http://localhost:5173 to view Sound Scout in your browser.
