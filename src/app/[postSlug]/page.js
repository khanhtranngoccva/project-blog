import React from 'react';
import BlogHero from '@/components/BlogHero';
import styles from './postSlug.module.css';
import {loadPostContent} from "@/helpers/post-helpers";
import CustomMDXRemote from "@/components/CustomMDXRemote";
import {notFound} from "next/navigation";


export async function generateMetadata({params}) {
    try {
        const {data} = await loadPostContent(params.postSlug);
        return {
            title: data.title,
            description: data.abstract,
        }
    } catch (e) {
        return notFound()
    }
}

async function BlogPost({params}) {
    try {
        const {content, data} = await loadPostContent(params.postSlug);

        return (
            <article className={styles.wrapper}>
                <BlogHero
                    title={data.title}
                    publishedOn={data.publishedOn}
                />
                <div className={styles.page}>
                    <CustomMDXRemote source={content}></CustomMDXRemote>
                </div>
            </article>
        );
    } catch (e) {
        return notFound();
    }
}

export default BlogPost;
