import Heading from "@/components/Heading";
import Link from "next/link";
import { getReviews } from "@/lib/reviews";
import Image from 'next/image';
export const metadata = {
    default: 'Indie gamer',
    template: '%s | Indie gamer'
} 

export default async function HomePage() {
    const { reviews } = await getReviews(3);

    return (
        <>
            <Heading>Indie gamer</Heading>
            <p className="pb-3">Only the best indie games, reviewed for you!</p>
            <ul className="flex flex-col gap-3">
                {reviews.map((review, index) => (
                    <li key={review.slug} className="bg-white border rounded shadow w-80
                            hover:shadow-xl sm:w-full">
                        <Link href={`/reviews/${review.slug}`}
                               className="flex flex-col sm:flex-row">
                        <Image src={review.image} alt="" priority={index === 0}
                        className="rounded-t sm:rounded-l sm:rounded-r-none"
                                width="320" height="180" />
                    <div className="px-4 py-1 text-center sm:text-left">      
                        <h2 className="font-semibold font-orbitron">{review.title}</h2>  
                            <p className="hidden pt-2 sm:block">{review.subtitle}</p>   
                        </div>          
                        </Link>
                    </li>
                ))};
            </ul>
        </>
    );
}