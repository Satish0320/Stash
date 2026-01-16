import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // 1. Detect Type
    let type = "OTHER";
    if (url.includes("youtube.com") || url.includes("youtu.be")) type = "YOUTUBE";
    else if (url.includes("twitter.com") || url.includes("x.com")) type = "TWITTER";
    else if (url.includes("linkedin.com")) type = "LINKEDIN";

    // 2. Fetch HTML (With Fake User-Agent)
    const response = await fetch(url, {
      headers: {
        // 👇 This makes YouTube/Twitter think you are a real laptop, not a server
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36" 
      },
    });

    if (!response.ok) {
        console.error(`Scrape failed: ${response.status} ${response.statusText}`);
        return NextResponse.json({ 
            title: url, // Fallback to URL if blocked
            type, 
            metadata: { image: "", description: "" } 
        });
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);

    // 3. Scrape Metadata (Open Graph Tags)
    const title = $('meta[property="og:title"]').attr("content") || $("title").text() || url;
    const description = $('meta[property="og:description"]').attr("content");
    const image = $('meta[property="og:image"]').attr("content");
    
    // 4. Custom Logic per Type
    const metadata: any = { image, description };

    if (type === "YOUTUBE") {
        // Extract Video ID specifically for better embeds later
        const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
        if (videoId) {
            metadata.videoId = videoId;
            // Force high-res thumbnail if scraping failed
            if (!metadata.image) {
                metadata.image = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`; 
            }
        }
    }

    return NextResponse.json({
      title,
      type,
      metadata,
    });

  } catch (error) {
    console.error("Metadata Error:", error);
    return NextResponse.json({ error: "Failed to fetch metadata" }, { status: 500 });
  }
}