import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const orders = await Order.findById(id);
		return NextResponse.json({ data: orders });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const deletedOrder = await Order.findByIdAndDelete(id);
		return NextResponse.json({ data: deletedOrder });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const body = await req.json();
		const updatedOrder = await Order.findByIdAndUpdate(id, body, { new: true });
		return NextResponse.json({ data: updatedOrder });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}