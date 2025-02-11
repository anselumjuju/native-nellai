import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/db/Category";

export async function GET() {
	await connectToDatabase();
	try {
		const categories = await Category.find();
		return NextResponse.json({ categories });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	try {
		const body = await req.json();
		const newCategory = await Category.create(body);
		return NextResponse.json({ data: newCategory });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
