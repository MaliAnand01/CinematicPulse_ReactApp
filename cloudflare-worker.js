export default {
  async fetch(request, env) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    try {
      const url = new URL(request.url);
      const tmdbPath = url.searchParams.get('path');

      if (!tmdbPath) {
        return new Response(JSON.stringify({ error: 'Missing path parameter' }), {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        });
      }

      const TMDB_ACCESS_TOKEN = env.TMDB_ACCESS_TOKEN;
      if (!TMDB_ACCESS_TOKEN) {
        return new Response(JSON.stringify({ error: 'TMDB access token not configured' }), {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        });
      }

      const tmdbUrl = `https://api.themoviedb.org/3${tmdbPath}`;
      const response = await fetch(tmdbUrl, {
        headers: {
          'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch from TMDB', details: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
}; 