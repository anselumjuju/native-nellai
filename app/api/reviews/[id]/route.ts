import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Review from "@/db/Review";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	await connectToDatabase();
	try {
		const review = await Review.findById(id);
		if (!review)
			return NextResponse.json({ error: "Review not found", status: 404 });
		return NextResponse.json({ data: review, message: "Review fetched successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch review", status: 500 });
	}
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	await connectToDatabase();
	try {
		const deletedReview = await Review.findByIdAndDelete(id);
		if (!deletedReview)
			return NextResponse.json({ error: "Review not found", status: 404 });
		return NextResponse.json({ data: deletedReview, message: "Review deleted successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to delete review", status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	await connectToDatabase();
	try {
		const body = await req.json();
		const updatedReview = await Review.findByIdAndUpdate(id, body, { new: true });
		if (!updatedReview)
			return NextResponse.json({ error: "Review not found", status: 404 });
		return NextResponse.json({ data: updatedReview, message: "Review updated successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to update review", status: 500 });
	}
}
