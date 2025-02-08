import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
	await connectToDatabase();
	try {
		const orders = await Order.find();
		return NextResponse.json({ orders });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	try {
		const body = await req.json();
		const newOrder = await Order.create(body);
		return NextResponse.json({ data: newOrder });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}