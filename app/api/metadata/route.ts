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

    // 2. Fetch HTML
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; StashBot/1.0)", // Mimic a browser
      },
    });
    
    const html = await response.text();
    const $ = cheerio.load(html);

    // 3. Scrape Metadata (Open Graph Tags)
    const title = $('meta[property="og:title"]').attr("content") || $("title").text();
    const description = $('meta[property="og:description"]').attr("content");
    const image = $('meta[property="og:image"]').attr("content");
    
    // 4. Custom Logic per Type
    const metadata: any = { image, description };

    if (type === "YOUTUBE") {
        // Extract Video ID specifically for better embeds later
        const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
        if (videoId) {
            metadata.videoId = videoId;
            metadata.image = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`; // High res thumbnail
        }
    }

    // Note: Twitter scraping is hard without API. 
    // This basic OG scrape works for public tweets often, but for deep integration 
    // we might need 'react-tweet' on the frontend instead of scraping backend.

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