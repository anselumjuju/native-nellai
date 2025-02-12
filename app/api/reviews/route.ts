import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Review from "@/db/Review";

export async function GET() {
	await connectToDatabase();
	try {
		const reviews = await Review.find();
		return NextResponse.json({ data: reviews, message: "Reviews fetched successfully", status: 200 });
	} catch (error) {
		console.error("Error fetching reviews:", error);
		return NextResponse.json({ error: "Failed to fetch reviews", status: 500 });
	}
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	try {
		const body = await req.json();
		const newReview = await Review.create(body);
		return NextResponse.json({ data: newReview, message: "Review created successfully", status: 201 });
	} catch (error) {
		console.error("Error creating review:", error);
		return NextResponse.json({ error: "Failed to create review", status: 500 });
	}
}
