import Heading from "@/components/Heading";
import Link from "next/link";
import { getFeaturedReview } from "@/lib/reviews";

export const metadata = {
    default: 'Indie gamer',
    template: '%s | Indie gamer'
} 

export default async function HomePage() {
    const review = await getFeaturedReview();

    return (
        <>
            <Heading>Indie gamer</Heading>
            <p className="pb-3">Only the best indie games, reviewed for you!</p>
            <ul className="flex flex-row flex-wrap gap-3">
                    <li key={review.slug}
                        className="bg-white border rounded w-80 hover:shadow-xl">
                    <Link href={`/reviews/${review.slug}`}>
                        <img src={review.image} alt=""
                        className="rounded-t" width="320" height="180" />
                            <h2 className="font-semibold font-orbitron py-1 text-center">{review.title}</h2>    
                    </Link>
                </li>
            </ul>
            
        </>
    );
}