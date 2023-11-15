import Heading from "@/components/Heading"
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReview, getSlugs } from '@/lib/reviews';

interface ReviewPageParams {
    slug: string;
}

interface ReviewPageProps {
    params: ReviewPageParams;
}
export async function generateStaticParams() {
    const slugs = await getSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params: { slug }} : ReviewPageProps) {
    const review = await getReview(slug);
    return {
        title: review.title,
    }
}

export default async function StardewValleyPage({ params: { slug }} : ReviewPageProps) {
    const review = await getReview(slug);
    return (
        <>
            <Heading>{review.title}</Heading>
            <div className="flex gap-3 items-baseline">
            <p className="italic pb-2">{review.data}</p>
            <ShareLinkButton />
            </div>
            <img src={review.image} alt=""
            className="mb-2 rounded" width="640" height="360" />
            <article dangerouslySetInnerHTML={{ __html: review.body }}
            className="max-w-screen-sm prose prose-slate"/>
        </>
    );
}
