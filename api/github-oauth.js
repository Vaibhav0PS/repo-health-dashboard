export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: "Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET" });
  }

  const { code, redirect_uri, code_verifier } = req.body || {};
  if (!code || !redirect_uri) {
    return res.status(400).json({ error: "Missing OAuth code or redirect_uri" });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri,
      code_verifier
    })
  });

  const payload = await tokenRes.json();
  if (!tokenRes.ok || payload.error) {
    return res.status(400).json({
      error: payload.error_description || payload.error || "GitHub OAuth exchange failed"
    });
  }

  return res.status(200).json({
    access_token: payload.access_token,
    token_type: payload.token_type,
    scope: payload.scope
  });
}
