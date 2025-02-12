import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/db/Category";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	await connectToDatabase();
	const id = (await params).id;
	if (!id) return NextResponse.json({ error: "Category ID is required" });
	try {
		const category = await Category.findById(id);
		if (!category) return NextResponse.json({ error: "Category not found" });
		return NextResponse.json({ data: category, message: "Category fetched successfully" });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	await connectToDatabase();
	const id = (await params).id;
	if (!id) return NextResponse.json({ error: "Category ID is required" });
	try {
		const deletedCategory = await Category.findByIdAndDelete(id);
		if (!deletedCategory) return NextResponse.json({ error: "Category not found" });
		return NextResponse.json({ data: deletedCategory, message: "Category deleted successfully" });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	await connectToDatabase();
	const id = (await params).id;
	if (!id) return NextResponse.json({ error: "Category ID is required" });
	try {
		const body = await req.json();
		const updatedCategory = await Category.findByIdAndUpdate(id, body, { new: true });
		if (!updatedCategory)
			return NextResponse.json({ error: "Category not found" });
		return NextResponse.json({ data: updatedCategory, message: "Category updated successfully" });
	} catch (error) {
		return NextResponse.json({ error });
	}
}
