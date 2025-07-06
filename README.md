# Movie App

A modern React movie application that helps you discover and explore movies. Built with React, Vite, and TMDB API.

## Features

- 🎬 Search for movies with real-time results
- 📱 Responsive design that works on all devices
- ⭐ Movie ratings and detailed information
- 🎭 Cast and crew information
- 🏆 Awards and accolades
- 📊 TMDB ratings and popularity
- 🌍 Global movie database

## API Setup

This app uses the **TMDB API** (The Movie Database) for comprehensive movie data.

### Getting an API Key

1. Visit [TMDB API](https://www.themoviedb.org/settings/api)
2. Sign up for a free account
3. Request an API key
4. Create a `.env` file in the root directory
5. Add your API key:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Technologies Used

- React 18
- Vite
- React Router
- Framer Motion
- Tailwind CSS
- TMDB API

## Project Structure

```
src/
├── components/
│   ├── Home.jsx          # Main page with search and movie list
│   ├── MovieDetails.jsx  # Detailed movie information
│   ├── MovieCard.jsx     # Individual movie card component
│   ├── Search.jsx        # Search functionality
│   ├── Spinner.jsx       # Loading spinner
│   └── Footer.jsx        # Footer component
├── appwrite.js           # Appwrite integration
└── main.jsx             # App entry point
```

## Contributing

Feel free to submit issues and enhancement requests!
