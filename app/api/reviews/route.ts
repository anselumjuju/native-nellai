import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET() {
	await connectToDatabase();
	try {
		const reviews = await Review.find();
		return NextResponse.json({ reviews });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	try {
		const body = await req.json();
		const newReview = await Review.create(body);
		return NextResponse.json({ data: newReview });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}