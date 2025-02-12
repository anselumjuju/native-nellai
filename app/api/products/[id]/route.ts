import connectToDatabase from "@/lib/mongodb";
import Product from "@/db/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectToDatabase();
		const id = (await params).id;
		if (!id) {
			return NextResponse.json({
				status: 400, success: false, message: "Product ID is required", error: { code: "BAD_REQUEST", details: "You must provide a product ID." }
			}, { status: 400 });
		}
		const product = await Product.findById(id);
		if (!product) {
			return NextResponse.json({
				status: 404, success: false, message: "Product not found", error: { code: "NOT_FOUND", details: `No product found with ID: ${id}` }
			}, { status: 404 });
		}
		return NextResponse.json({
			status: 200, success: true, message: "Product fetched successfully", data: product
		});
	} catch (error) {
		console.error("GET /products/[id] error:", error);
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
				status: 400, success: false, message: "Product ID is required", error: { code: "BAD_REQUEST", details: "You must provide a product ID." }
			}, { status: 400 });
		}

		const deletedProduct = await Product.findByIdAndDelete(id);
		if (!deletedProduct) {
			return NextResponse.json({
				status: 404, success: false, message: "Product not found", error: { code: "NOT_FOUND", details: `No product found with ID: ${id}` }
			}, { status: 404 });
		}

		return NextResponse.json({
			status: 200, success: true, message: "Product deleted successfully", data: deletedProduct
		}, { status: 200 });

	} catch (error) {
		console.error("DELETE /products/[id] error:", error);
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
				status: 400, success: false, message: "Product ID is required",
				error: { code: "BAD_REQUEST", details: "You must provide a product ID." }
			}, { status: 400 });
		}

		const body = await req.json();
		if (!Object.keys(body).length) {
			return NextResponse.json({
				status: 400, success: false, message: "Update data is required",
				error: { code: "BAD_REQUEST", details: "You must provide at least one field to update." }
			}, { status: 400 });
		}

		const existingProduct = await Product.findById(id);
		if (!existingProduct) {
			return NextResponse.json({
				status: 404, success: false, message: "Product not found",
				error: { code: "NOT_FOUND", details: `No product found with ID: ${id}` }
			}, { status: 404 });
		}

		const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
		return NextResponse.json({
			status: 200, success: true, message: "Product updated successfully", data: updatedProduct
		});

	} catch (error) {
		console.error("PATCH /products/[id] error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error",
			error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}
