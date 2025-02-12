import connectToDatabase from "@/lib/mongodb";
import Product from "@/db/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	try {
		await connectToDatabase();
		const products = await Product.find();
		return NextResponse.json({ status: 200, success: true, message: "Products fetched successfully", data: products, })
	} catch (error) {
		console.error("GET /products error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error", error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		await connectToDatabase();
		const body = await req.json();

		const existingProduct = await Product.findOne({ name: body.name.trim().toLowerCase() });
		if (existingProduct) {
			return NextResponse.json({
				status: 409, success: false, message: "Product already exists", error: { code: "CONFLICT", details: "A product with the same name already exists." }
			}, { status: 409 });
		}

		const newProduct = await Product.create(body);
		return NextResponse.json({
			status: 201, success: true, message: "Product created successfully", data: newProduct
		}, { status: 201 });

	} catch (error) {
		console.error("POST /products error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error", error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}
