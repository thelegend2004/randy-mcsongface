export default async function handler(req, res) {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const query = searchParams.get("q");

  if (!query) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: "Missing query parameter" }));
  }

  try {
    const apiRes = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(query)}`
    );
    const data = await apiRes.json();

    res.setHeader("Access-Control-Allow-Origin", "*"); // optional if needed
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    res.end(JSON.stringify(data));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Failed to fetch Deezer data" }));
  }
}
