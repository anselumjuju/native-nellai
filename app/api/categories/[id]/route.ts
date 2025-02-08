import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";

interface paramInterface {
	params: {
		id: string
	}
}

export async function GET({ params }: paramInterface) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const category = await Category.findById(id);
		return NextResponse.json({ data: category });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function DELETE({ params }: paramInterface) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const deletedCategory = await Category.findByIdAndDelete(id);
		return NextResponse.json({ data: deletedCategory });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: paramInterface) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const body = await req.json();
		const updatedCategory = await Category.findByIdAndUpdate(id, body, { new: true });
		return NextResponse.json({ data: updatedCategory });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}