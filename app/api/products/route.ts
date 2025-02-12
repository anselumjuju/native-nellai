import connectToDatabase from "@/lib/mongodb";
import Product from "@/db/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	await connectToDatabase();
	try {
		const products = await Product.find();
		return NextResponse.json({ data: products, message: "Products fetched successfully" });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	try {
		const body = await req.json();
		const newProduct = await Product.create(body);
		return NextResponse.json({ data: newProduct, message: "Product created successfully" });
	} catch (error) {
		return NextResponse.json({ error });
	}
}
