import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Review from "@/db/Review";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const review = await Review.findById(id);
		if (!review)
			return NextResponse.json({ error: "Review not found" });
		return NextResponse.json({ data: review, message: "Review fetched successfully" });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const deletedReview = await Review.findByIdAndDelete(id);
		if (!deletedReview)
			return NextResponse.json({ error: "Review not found" });
		return NextResponse.json({ data: deletedReview, message: "Review deleted successfully" });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const body = await req.json();
		const updatedReview = await Review.findByIdAndUpdate(id, body, { new: true });
		if (!updatedReview)
			return NextResponse.json({ error: "Review not found" });
		return NextResponse.json({ data: updatedReview, message: "Review updated successfully" });
	} catch (error) {
		return NextResponse.json({ error });
	}
}
