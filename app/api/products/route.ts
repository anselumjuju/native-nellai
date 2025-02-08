import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	await connectToDatabase();
	try {
		const products = await Product.find();
		return NextResponse.json({ products });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	try {
		const body = await req.json();
		const newProduct = await Product.create(body);
		return NextResponse.json({ data: newProduct });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
