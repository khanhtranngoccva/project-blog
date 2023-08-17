import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";

const CONTENT_ROOT = path.join(process.cwd(), "content");

async function parsePostData(slug) {
    const mdxActualPath = path.join(CONTENT_ROOT, slug);
    const rawMdx = (await fs.promises.readFile(mdxActualPath)).toString();
    const {data} = matter(rawMdx);
    return {
        slug: path.parse(mdxActualPath).name,
        data,
    };
}

export const loadPostContent = React.cache(async function loadPostContent(slug) {
    const mdxActualPath = path.join(CONTENT_ROOT, `${slug}.mdx`);
    const rawMdx = (await fs.promises.readFile(mdxActualPath)).toString();
    const {data, content} = matter(rawMdx);
    return {
        content,
        data,
    };
});

export async function getBlogPostList() {
    const paths = await fs.promises.readdir(CONTENT_ROOT);
    const data = [];

    for (let mdxPath of paths) {
        data.push(parsePostData(mdxPath));
    }

    return (await Promise.all(data)).sort((p1, p2) => {
        return new Date(p2.publishedOn) - new Date(p1.publishedOn);
    });
}
