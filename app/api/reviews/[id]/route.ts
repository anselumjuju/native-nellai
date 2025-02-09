import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Review from "@/models/Review";


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const review = await Review.findById(id);
		return NextResponse.json({ data: review });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const deletedReview = await Review.findByIdAndDelete(id);
		return NextResponse.json({ data: deletedReview });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const body = await req.json();
		const updatedReview = await Review.findByIdAndUpdate(id, body, { new: true });
		return NextResponse.json({ data: updatedReview });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}