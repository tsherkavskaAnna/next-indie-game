import 'server-only';

import Heading from "@/components/Heading"
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReview, getSlugs } from '@/lib/reviews';
import { Metadata } from "next";
import Image from 'next/image';

interface ReviewPageParams {
    slug: string;
}

interface ReviewPageProps {
    params: ReviewPageParams;
}


export async function generateStaticParams() : Promise<ReviewPageParams[]> {
    const slugs = await getSlugs();
    // console.log("[Review rendering]:", slugs)
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params: { slug } }: ReviewPageProps): Promise<Metadata> {
  const review = await getReview(slug);
  if (!review) {
      throw new Error(`Not found any review for slug: ${slug}`);
  }
  return {
    title: review.title,
  };
}

export default async function ReviewPage({ params: { slug } }: ReviewPageProps) {
    const review = await getReview(slug);
    //console.log("[Review rendering]:", review)
    if (!review) {
        throw new Error(`Error with fetching data from server. Status: ${slug}`);
    }
    return (
        <>
            <Heading>{review.title}</Heading>
            <p className="font-semibold pb-3">
                {review.subtitle}
            </p>
            <div className="flex gap-3 items-baseline">
            <p className="italic pb-2">{review.date}</p>
            <ShareLinkButton />
            </div>
            <Image src={review.image} alt="" 
            className="mb-2 rounded" width="640" height="360" />
            <article dangerouslySetInnerHTML={{ __html: review.body }}
            className="max-w-screen-sm prose prose-slate"/>
        </>
    );
}
