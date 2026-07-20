export default async function handler(req, res) {
  const { endpoint, ...queryParams } = req.query;

  if (!endpoint) {
    return res.status(400).json({ error: 'Missing endpoint parameter' });
  }

  // Construct query string for passing down per_page, q, etc.
  const qs = new URLSearchParams(queryParams).toString();
  const githubUrl = `https://api.github.com/${endpoint}${qs ? `?${qs}` : ''}`;

  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'GitHub-Profile-Analyzer'
  };

  // Use the secret token if available
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(githubUrl, { headers });
    
    // Relay status back to the client so we can handle 404s, 403s properly
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Serverless proxy error:', error);
    return res.status(500).json({ error: 'Failed to fetch from GitHub API' });
  }
}
