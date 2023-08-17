import React from 'react';
import BlogSummaryCard from "@/components/BlogSummaryCard";
import {getBlogPostList} from "@/helpers/post-helpers";

async function AllPosts() {
  const data = await getBlogPostList();

  return <>
    {data.map(post => {
      return <BlogSummaryCard
          key={post.slug}
          slug={post.slug}
          title={post.data.title}
          abstract={post.data.abstract}
          publishedOn={post.data.publishedOn}
      />
    })}
  </>
}

export default AllPosts;
