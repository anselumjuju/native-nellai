import connectToDatabase from "@/lib/mongodb";
import Product from "@/db/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const product = await Product.findById(id);
		if (!product)
			return NextResponse.json({ error: "Product not found", status: 404 });
		return NextResponse.json({ data: product, message: "Product fetched successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch product", status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const deletedProduct = await Product.findByIdAndDelete(id);
		if (!deletedProduct)
			return NextResponse.json({ error: "Product not found", status: 404 });
		return NextResponse.json({ data: deletedProduct, message: "Product deleted successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to delete product", status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const body = await req.json();
		const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
		if (!updatedProduct)
			return NextResponse.json({ error: "Product not found", status: 404 });
		return NextResponse.json({ data: updatedProduct, message: "Product updated successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to update product", status: 500 });
	}
}
