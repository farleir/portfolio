
import { getBlogPosts } from "@/lib/data";
import BlogClient from "./BlogClient";

export default async function AdminBlogPage() {
    const posts = await getBlogPosts();
    
    return (
        <div>
            <BlogClient posts={posts} />
        </div>
    );
}
