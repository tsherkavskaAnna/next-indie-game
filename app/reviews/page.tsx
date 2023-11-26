import Heading from "@/components/Heading";
import PaginationBar from "@/components/PaginationBar"
import Image from 'next/image';
import { getReviews } from "@/lib/reviews";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";


export const metadata = {
    title: 'Reviews'
}

interface ReviewPageProps {
    searchParams: { page: string};
}

const PAGE_SIZE = 6;

export default async function ReviewsPage({ searchParams }: ReviewPageProps) {
    const page = parsePageParam(searchParams.page);
    const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);

    return (
        <>
            <Heading>Reviews</Heading>
            <div className="flex flex-col justify-center py-4">
                <PaginationBar href="/reviews" page={page} pageCount={pageCount} />
                <SearchBox />
            </div>
            <ul className="flex flex-row flex-wrap gap-3">
                {reviews.map((review: any) => (
                    <li key={review.slug}
                        className="bg-white border rounded w-80 hover:shadow-xl">
                    <Link href={`/reviews/${review.slug}`}>
                        <Image src={review.image} alt="game image"
                        className="rounded-t" width="320" height="180" />
                            <h2 className="font-semibold font-orbitron py-1 text-center">{review.title}</h2>    
                    </Link>
                </li>
                ))}
                
            </ul>
            
        </>
    )
}


function parsePageParam(paramValue: string) : number {
    if (paramValue) {
        const page = parseInt(paramValue);
        if (isFinite(page) && page > 0) {
            return page;
        }
    }
    return 1;
}