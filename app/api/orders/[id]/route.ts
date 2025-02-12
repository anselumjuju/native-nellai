import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/db/Order";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const order = await Order.findById(id);
		if (!order)
			return NextResponse.json({ error: "Order not found", status: 404 });
		return NextResponse.json({ data: order, message: "Order fetched successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch order", status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const deletedOrder = await Order.findByIdAndDelete(id);
		if (!deletedOrder)
			return NextResponse.json({ error: "Order not found", status: 404 });
		return NextResponse.json({ data: deletedOrder, message: "Order deleted successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to delete order", status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const body = await req.json();
		const updatedOrder = await Order.findByIdAndUpdate(id, body, { new: true });
		if (!updatedOrder)
			return NextResponse.json({ error: "Order not found", status: 404 });
		return NextResponse.json({ data: updatedOrder, message: "Order updated successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to update order", status: 500 });
	}
}
