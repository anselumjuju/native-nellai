import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/db/Order";

export async function GET() {
	await connectToDatabase();
	try {
		const orders = await Order.find();
		return NextResponse.json({ data: orders, message: "Orders fetched successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch orders", status: 500 });
	}
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	try {
		const body = await req.json();
		const newOrder = await Order.create(body);
		return NextResponse.json({ data: newOrder, message: "Order created successfully", status: 201 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to create order", status: 500 });
	}
}
