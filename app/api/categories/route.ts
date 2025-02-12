import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/db/Category";

export async function GET() {
	await connectToDatabase();
	try {
		const categories = await Category.find();
		return NextResponse.json({ data: categories, message: "Categories fetched successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch categories", status: 500 });
	}
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	try {
		const body = await req.json();
		const newCategory = await Category.create(body);
		return NextResponse.json({ data: newCategory, message: "Category created successfully", status: 201 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to create category", status: 400 });
	}
}
