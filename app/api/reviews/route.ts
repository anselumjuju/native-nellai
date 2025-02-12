import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Review from "@/db/Review";

export async function GET() {
	try {
		await connectToDatabase();
		const reviews = await Review.find();
		return NextResponse.json({ status: 200, success: true, message: "Reviews fetched successfully", data: reviews, })
	} catch (error) {
		console.error("GET /reviews error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error", error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		await connectToDatabase();
		const body = await req.json();

		const existingReview = await Review.findOne({ name: body.name.trim().toLowerCase() });
		if (existingReview) {
			return NextResponse.json({
				status: 409, success: false, message: "Review already exists", error: { code: "CONFLICT", details: "A review with the same name already exists." }
			}, { status: 409 });
		}

		const newReview = await Review.create(body);
		return NextResponse.json({
			status: 201, success: true, message: "Review created successfully", data: newReview
		}, { status: 201 });

	} catch (error) {
		console.error("POST /reviews error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error", error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}
