import { readFile, readdir } from "node:fs/promises";
import matter from 'gray-matter';
import { marked } from "marked";

export interface Review {
    slug: string;
    title: string;
    image: string;
    data: string;
    body: string;
}
export async function getFeaturedReview() {
    const featuredReview = await getReviews();
    return featuredReview[0];
}

export async function getReview(slug: string) {
    const text = await readFile(`./content/reviews/${slug}.md`, 'utf8');
    
    const { content, data: { title, data, image } } = matter(text);
    const body = marked(content);
    return { slug, title, data, image, body };
}

export async function getReviews() {
    const slugs = await getSlugs();
    const reviews = [];
    for (const slug of slugs) {
        const review = await getReview(slug);
        reviews.push(review);
    }
    reviews.sort((a, b) => b.data.localeCompare(a.data));
    return reviews;
}

export async function getSlugs() : Promise<string[]> {
    const files = await readdir('./content/reviews');
    const slugs = files.filter((file) => file.endsWith('.md'))
        .map((file) => file.slice(0, -3));
    
    return slugs;
}
