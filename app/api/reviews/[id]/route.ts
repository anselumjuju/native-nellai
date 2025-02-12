import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Review from "@/db/Review";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectToDatabase();
		const id = (await params).id;
		if (!id) {
			return NextResponse.json({
				status: 400, success: false, message: "Review ID is required", error: { code: "BAD_REQUEST", details: "You must provide a review ID." }
			}, { status: 400 });
		}
		const review = await Review.findById(id);
		if (!review) {
			return NextResponse.json({
				status: 404, success: false, message: "Review not found", error: { code: "NOT_FOUND", details: `No review found with ID: ${id}` }
			}, { status: 404 });
		}
		return NextResponse.json({
			status: 200, success: true, message: "Review fetched successfully", data: review
		});
	} catch (error) {
		console.error("GET /reviews/[id] error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error", error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectToDatabase();

		const id = (await params).id;
		if (!id) {
			return NextResponse.json({
				status: 400, success: false, message: "Review ID is required", error: { code: "BAD_REQUEST", details: "You must provide a review ID." }
			}, { status: 400 });
		}

		const deletedReview = await Review.findByIdAndDelete(id);
		if (!deletedReview) {
			return NextResponse.json({
				status: 404, success: false, message: "Review not found", error: { code: "NOT_FOUND", details: `No review found with ID: ${id}` }
			}, { status: 404 });
		}

		return NextResponse.json({
			status: 200, success: true, message: "Review deleted successfully", data: deletedReview
		}, { status: 200 });

	} catch (error) {
		console.error("DELETE /reviews/[id] error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error",
			error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectToDatabase();

		const id = (await params).id;
		if (!id) {
			return NextResponse.json({
				status: 400, success: false, message: "Review ID is required",
				error: { code: "BAD_REQUEST", details: "You must provide a review ID." }
			}, { status: 400 });
		}

		const body = await req.json();
		if (!Object.keys(body).length) {
			return NextResponse.json({
				status: 400, success: false, message: "Update data is required",
				error: { code: "BAD_REQUEST", details: "You must provide at least one field to update." }
			}, { status: 400 });
		}

		const existingReview = await Review.findById(id);
		if (!existingReview) {
			return NextResponse.json({
				status: 404, success: false, message: "Review not found",
				error: { code: "NOT_FOUND", details: `No review found with ID: ${id}` }
			}, { status: 404 });
		}

		const updatedReview = await Review.findByIdAndUpdate(id, body, { new: true });
		return NextResponse.json({
			status: 200, success: true, message: "Review updated successfully", data: updatedReview
		});

	} catch (error) {
		console.error("PATCH /reviews/[id] error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error",
			error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}
