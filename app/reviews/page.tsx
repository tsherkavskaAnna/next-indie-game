import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
    title: 'Reviews'
}

export default async function ReviewsPage() {
    const reviews = await getReviews();
    //console.log('[ReviewsPage] reviews:', reviews);
    
    return (
        <>
            <Heading>Reviews</Heading>
            <ul className="flex flex-row flex-wrap gap-3">
                {reviews.map((review) => (
                    <li key={review.slug}
                        className="bg-white border rounded w-80 hover:shadow-xl">
                    <Link href={`/reviews/${review.slug}`}>
                        <img src={review.image} alt=""
                        className="rounded-t" width="320" height="180" />
                            <h2 className="font-semibold font-orbitron py-1 text-center">{review.title}</h2>    
                    </Link>
                </li>
                ))}
                
            </ul>
            
        </>
    )
}