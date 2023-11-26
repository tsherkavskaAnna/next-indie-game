import 'server-only';

import { marked } from "marked";
import qs from 'qs';


const CMS_URL = 'http://localhost:1337';
// console.log('CMS_URL', CMS_URL);

export const CACHE_TAG_REVIEWS = 'reviews';

export interface Review {
    slug: string;
    title: string;
    subtitle: string;
    image: string;
    date: string; 
}

export interface FullReview extends Review {
    body: string,
}

interface CmsItem {
    id: number;
    attributes: any;
    slug: string;
}

export interface PaginatedReviews {
  pageCount: number;
  reviews: Review[];
}
export type SearchableReview = Pick<Review, 'slug' | 'title'>;


export async function getReview(slug: string): Promise<FullReview | null> {
    const url = `${CMS_URL}/api/reviews?`
        + qs.stringify({
            filters: { slug: { $eq: slug } },
            fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
            populate: { image: { fields: ['url'] } },
            pagination: { pageSize: 1, withCount: false },
        }, { encodeValuesOnly: true });
    const response = await fetch(url);
    const { data } = await response.json();
    if (data.length === 0) {
        return null;
    }
    const { attributes } = data[0];
    return {
        slug: attributes.slug,
        title: attributes.title,
        subtitle: attributes.subtitle,
        date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
        image: CMS_URL + attributes.image.data.attributes.url,
        body: marked(attributes.body),
};
}

export async function getReviews(pageSize: number, page?: number): Promise<PaginatedReviews> {
    const url = `${CMS_URL}/api/reviews?`
    + qs.stringify({
      fields: ['slug', 'title', 'subtitle', 'publishedAt'],
      populate: { image: { fields: ['url'] } },
      sort: ['publishedAt:desc'],
      pagination: { pageSize, page},
    }, { encodeValuesOnly: true });
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from server. Status: ${response.status} `)
    }
    const { data, meta } = await response.json();
    return {
        pageCount: meta.pagination.pageCount,
        reviews: data.map(({ attributes }: any) => ({
            slug: attributes.slug,
            title: attributes.title,
            subtitle: attributes.subtitle,
            date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
            image: CMS_URL + attributes.image.data.attributes.url,
        }))
    }; 
}

export async function getSlugs() : Promise<string[]> {
    const { data } = await fetchReviews({
        fields: ['slug'],
        sort: ['publishedAt:desc'],
        pagination: { pageSize: 100 },
    }); 
    return data.map((item: CmsItem) => item.attributes.slug.toString());
}

export async function searchReviews(query: string): Promise<SearchableReview[]> {
    const { data } = await fetchReviews({
        filters: { title: { $containsi: query } },
        fields: ['slug', 'title'],
        sort: ['title'],
        pagination: { pageSize: 5 },
    });
    return data.map(({ attributes }: any) => ({
        slug: attributes.slug,
        title: attributes.title,
    }));
}

export async function fetchReviews(parameters: any) {
    const url = `${CMS_URL}/api/reviews?`;
    + qs.stringify(parameters, { encodeValuesOnly: true });
    const response = await fetch(url, {
        next: {
            tags: [CACHE_TAG_REVIEWS],
        }
    });
    if (!response.ok) {
        throw new Error(`CMS returned ${response.status} for ${url}`);
    }
    const responseData = await response.json();
    return responseData;
}
 



