import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/db/Category";

export async function GET() {
	try {
		await connectToDatabase();
		const categories = await Category.find();
		return NextResponse.json({ status: 200, success: true, message: "Categories fetched successfully", data: categories, })
	} catch (error) {
		console.error("GET /categories error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error", error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		await connectToDatabase();
		const body = await req.json();

		const existingCategory = await Category.findOne({ name: body.name.trim().toLowerCase() });
		if (existingCategory) {
			return NextResponse.json({
				status: 409, success: false, message: "Category already exists", error: { code: "CONFLICT", details: "A category with the same name already exists." }
			}, { status: 409 });
		}

		const newCategory = await Category.create(body);
		return NextResponse.json({
			status: 201, success: true, message: "Category created successfully", data: newCategory
		}, { status: 201 });

	} catch (error) {
		console.error("POST /categories error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error", error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}
