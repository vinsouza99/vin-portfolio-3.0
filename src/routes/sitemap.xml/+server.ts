export const prerender = true;

export function GET() {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://vinsouza.com/en</loc></url>
  <url><loc>https://vinsouza.com/pt-br</loc></url>
</urlset>`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
