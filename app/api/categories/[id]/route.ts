import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/db/Category";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectToDatabase();
		const id = (await params).id;
		if (!id) {
			return NextResponse.json({
				status: 400, success: false, message: "Category ID is required", error: { code: "BAD_REQUEST", details: "You must provide a category ID." }
			}, { status: 400 });
		}
		const category = await Category.findById(id);
		if (!category) {
			return NextResponse.json({
				status: 404, success: false, message: "Category not found", error: { code: "NOT_FOUND", details: `No category found with ID: ${id}` }
			}, { status: 404 });
		}
		return NextResponse.json({
			status: 200, success: true, message: "Category fetched successfully", data: category
		});
	} catch (error) {
		console.error("GET /categories/[id] error:", error);
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
				status: 400, success: false, message: "Category ID is required", error: { code: "BAD_REQUEST", details: "You must provide a category ID." }
			}, { status: 400 });
		}

		const deletedCategory = await Category.findByIdAndDelete(id);
		if (!deletedCategory) {
			return NextResponse.json({
				status: 404, success: false, message: "Category not found", error: { code: "NOT_FOUND", details: `No category found with ID: ${id}` }
			}, { status: 404 });
		}

		return NextResponse.json({
			status: 200, success: true, message: "Category deleted successfully", data: deletedCategory
		}, { status: 200 });

	} catch (error) {
		console.error("DELETE /categories/[id] error:", error);
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
				status: 400, success: false, message: "Category ID is required",
				error: { code: "BAD_REQUEST", details: "You must provide a category ID." }
			}, { status: 400 });
		}

		const body = await req.json();
		if (!Object.keys(body).length) {
			return NextResponse.json({
				status: 400, success: false, message: "Update data is required",
				error: { code: "BAD_REQUEST", details: "You must provide at least one field to update." }
			}, { status: 400 });
		}

		const existingCategory = await Category.findById(id);
		if (!existingCategory) {
			return NextResponse.json({
				status: 404, success: false, message: "Category not found",
				error: { code: "NOT_FOUND", details: `No category found with ID: ${id}` }
			}, { status: 404 });
		}

		const updatedCategory = await Category.findByIdAndUpdate(id, body, { new: true });
		return NextResponse.json({
			status: 200, success: true, message: "Category updated successfully", data: updatedCategory
		});

	} catch (error) {
		console.error("PATCH /categories/[id] error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error",
			error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}
