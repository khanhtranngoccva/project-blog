import {NextResponse} from "next/server";
import RSS from 'rss';
import {getBlogPostList} from "@/helpers/post-helpers";

export async function GET(request) {
    const url = new URL(request.url);
    const feed = new RSS({
        title: "Web Development RSS",
        feed_url: url.href,
        site_url: url.origin,
        pubDate: new Date(),
    });

    const posts = await getBlogPostList();

    for (let post of posts) {
        const item = {
            title: post.data.title,
            description: post.data.abstract,
            url: new URL(post.slug, url.origin).toString(),
            date: post.data.publishedOn,
        };
        feed.item(item);
    }

    const xml = feed.xml({indent: true});

    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/xml",
        }
    });
}
