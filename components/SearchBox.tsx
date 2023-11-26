'use client'

import { useIsClient } from "@/lib/hooks";
import type { SearchableReview } from "@/lib/reviews";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";


export default function SearchBox() {
    const router = useRouter();
    const isClient = useIsClient();
    const [query, setQuery] = useState('');
    const [debounceQuery] = useDebounce(query, 300);
    const [reviews, setReviews] = useState<SearchableReview[]>([]);

    useEffect(() => {
        if (debounceQuery.length > 1) {
            const controller = new AbortController();
            (async () => {
                const url = '/api/search?query=' + encodeURIComponent(query);
                const response = await fetch(url, { signal: controller.signal });
                const reviews = await response.json();
                console.log("[SearchBox] API response:", reviews);
                setReviews(reviews);
            })();
            return () => controller.abort();
        } else {
            setReviews([]);
        }
    }, [debounceQuery])

    const handleChange = (review: SearchableReview) => {
        router.push(`/reviews/${review.slug}`);
    }
//console.log("[searchBox] ", {query, debounceQuery})
    if (!isClient) {
        return null;
    }

    const filteredReviews = query === '' ? reviews : reviews.filter((review) => {
        return review.title.toLowerCase().includes(query.toLowerCase());
})
    return (
        <div className="relative w-48">
        <Combobox onChange={handleChange}>
                <Combobox.Input placeholder="Search..."
                    className="border px-2 py-1 rounded w-full"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}/>
            <Combobox.Options className="absolute bg-white py-1 w-full">
                {filteredReviews.map((review) => (
                    <Combobox.Option key={review.slug} value={review}>
                        {({ active }) => (
                            <span className={`block px-2 truncate w-full ${
                                active ? 'bg-cyan-200' : ''
                            }`}>
                                {review.title}</span> 
                        )} 
                    </Combobox.Option>
                ))}
            </Combobox.Options>
            </Combobox>
        </div>
    )
}


