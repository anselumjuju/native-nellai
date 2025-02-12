import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/db/Category";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	await connectToDatabase();
	const id = (await params).id;
	if (!id) return NextResponse.json({ error: "Category ID is required", status: 400 });
	try {
		const category = await Category.findById(id);
		if (!category) return NextResponse.json({ error: "Category not found", status: 404 });
		return NextResponse.json({ data: category, message: "Category fetched successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch category", status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	await connectToDatabase();
	const id = (await params).id;
	if (!id) return NextResponse.json({ error: "Category ID is required", status: 400 });
	try {
		const deletedCategory = await Category.findByIdAndDelete(id);
		if (!deletedCategory) return NextResponse.json({ error: "Category not found", status: 404 });
		return NextResponse.json({ data: deletedCategory, message: "Category deleted successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to delete category", status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	await connectToDatabase();
	const id = (await params).id;
	if (!id) return NextResponse.json({ error: "Category ID is required", status: 400 });
	try {
		const body = await req.json();
		const updatedCategory = await Category.findByIdAndUpdate(id, body, { new: true });
		if (!updatedCategory)
			return NextResponse.json({ error: "Category not found", status: 404 });
		return NextResponse.json({ data: updatedCategory, message: "Category updated successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to update category", status: 500 });
	}
}
