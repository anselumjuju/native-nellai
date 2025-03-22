import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/db/Order";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectToDatabase();
		const id = (await params).id;
		if (!id) {
			return NextResponse.json({
				status: 400, success: false, message: "Order ID is required", error: { code: "BAD_REQUEST", details: "You must provide an order ID." }
			}, { status: 400 });
		}
		const order = await Order.findById(id);
		if (!order) {
			return NextResponse.json({
				status: 404, success: false, message: "Order not found", error: { code: "NOT_FOUND", details: `No order found with ID: ${id}` }
			}, { status: 404 });
		}
		return NextResponse.json({
			status: 200, success: true, message: "Order fetched successfully", data: order
		});
	} catch (error) {
		console.error("GET /orders/[id] error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error", error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectToDatabase();

		const id = (await params).id;
		if (!id) {
			return NextResponse.json({
				status: 400, success: false, message: "Order ID is required", error: { code: "BAD_REQUEST", details: "You must provide an order ID." }
			}, { status: 400 });
		}

		const deletedOrder = await Order.findByIdAndDelete(id);
		if (!deletedOrder) {
			return NextResponse.json({
				status: 404, success: false, message: "Order not found", error: { code: "NOT_FOUND", details: `No order found with ID: ${id}` }
			}, { status: 404 });
		}

		return NextResponse.json({
			status: 200, success: true, message: "Order deleted successfully", data: deletedOrder
		}, { status: 200 });

	} catch (error) {
		console.error("DELETE /orders/[id] error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error",
			error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectToDatabase();

		const id = (await params).id;
		if (!id) {
			return NextResponse.json({
				status: 400, success: false, message: "Order ID is required",
				error: { code: "BAD_REQUEST", details: "You must provide an order ID." }
			}, { status: 400 });
		}

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

		if (!Object.keys(body).length) {
			return NextResponse.json({
				status: 400, success: false, message: "Update data is required",
				error: { code: "BAD_REQUEST", details: "You must provide at least one field to update." }
			}, { status: 400 });
		}

		const existingOrder = await Order.findById(id);
		if (!existingOrder) {
			return NextResponse.json({
				status: 404, success: false, message: "Order not found",
				error: { code: "NOT_FOUND", details: `No order found with ID: ${id}` }
			}, { status: 404 });
		}

		const updatedOrder = await Order.findByIdAndUpdate(id, body, { new: true });
		return NextResponse.json({
			status: 200, success: true, message: "Order updated successfully", data: updatedOrder
		});

	} catch (error) {
		console.error("PATCH /orders/[id] error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error",
			error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}