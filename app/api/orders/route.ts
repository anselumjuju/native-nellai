import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/db/Order";

export async function GET() {
	try {
		await connectToDatabase();
		const orders = await Order.find();
		return NextResponse.json({ status: 200, success: true, message: "Orders fetched successfully", data: orders, })
	} catch (error) {
		console.error("GET /orders error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error", error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		await connectToDatabase();
		const body = await req.json();

		// Check if items exists and is a string before parsing
		if (body.items && typeof body.items === 'string') {
			try {
				body.items = JSON.parse(body.items);
			} catch (error) {
				return NextResponse.json({
					status: 400,
					success: false,
					message: "Invalid items format",
					error: { code: "BAD_REQUEST", details: "Items must be a valid JSON array." }
				}, { status: 400 });
			}
		}

		const newOrder = await Order.create(body);
		return NextResponse.json({
			status: 201, success: true, message: "Order created successfully", data: newOrder
		}, { status: 201 });

	} catch (error) {
		console.error("POST /orders error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error", error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}
