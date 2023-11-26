import { searchReviews } from "@/lib/reviews";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('query');
    const queryNonNull = query || 'valoreDiDefault';
    const reviews = await searchReviews(queryNonNull);
    return NextResponse.json(reviews);
    
}