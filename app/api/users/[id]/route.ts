import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/db/User";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectToDatabase();
		const id = (await params).id;
		if (!id) {
			return NextResponse.json({
				status: 400, success: false, message: "User ID is required", error: { code: "BAD_REQUEST", details: "You must provide a user ID." }
			}, { status: 400 });
		}
		const user = await User.findById(id);
		if (!user) {
			return NextResponse.json({
				status: 404, success: false, message: "User not found", error: { code: "NOT_FOUND", details: `No user found with ID: ${id}` }
			}, { status: 404 });
		}
		return NextResponse.json({
			status: 200, success: true, message: "User fetched successfully", data: user
		});
	} catch (error) {
		console.error("GET /users/[id] error:", error);
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
				status: 400, success: false, message: "User ID is required", error: { code: "BAD_REQUEST", details: "You must provide a user ID." }
			}, { status: 400 });
		}

		const deletedUser = await User.findByIdAndDelete(id);
		if (!deletedUser) {
			return NextResponse.json({
				status: 404, success: false, message: "User not found", error: { code: "NOT_FOUND", details: `No user found with ID: ${id}` }
			}, { status: 404 });
		}

		return NextResponse.json({
			status: 200, success: true, message: "User deleted successfully", data: deletedUser
		}, { status: 200 });

	} catch (error) {
		console.error("DELETE /users/[id] error:", error);
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
				status: 400, success: false, message: "User ID is required",
				error: { code: "BAD_REQUEST", details: "You must provide a user ID." }
			}, { status: 400 });
		}

		const body = await req.json();

		// Check if address exists and is a string before parsing
		if (body.address && typeof body.address === 'string') {
			try {
				body.address = JSON.parse(body.address);
			} catch (error) {
				console.log(error);
				return NextResponse.json({
					status: 400,
					success: false,
					message: "Invalid address format",
					error: { code: "BAD_REQUEST", details: "Address must be a valid JSON object." }
				}, { status: 400 });
			}
		}


		// Check if cart exists and is a string before parsing
		if (body.cart && typeof body.cart === 'string') {
			try {
				body.cart = JSON.parse(body.cart);
			} catch (error) {
				console.log(error);
				return NextResponse.json({
					status: 400,
					success: false,
					message: "Invalid cart format",
					error: { code: "BAD_REQUEST", details: "Cart must be a valid JSON array." }
				}, { status: 400 });
			}
		}

		// Check if wishlist exists and is a string before parsing
		if (body.wishlist && typeof body.wishlist === 'string') {
			try {
				body.wishlist = JSON.parse(body.wishlist);
			} catch (error) {
				console.log(error);
				return NextResponse.json({
					status: 400,
					success: false,
					message: "Invalid wishlist format",
					error: { code: "BAD_REQUEST", details: "Wishlist must be a valid JSON array." }
				}, { status: 400 });
			}
		}

		// Check if orders exists and is a string before parsing
		if (body.orders && typeof body.orders === 'string') {
			try {
				body.orders = JSON.parse(body.orders);
			} catch (error) {
				console.log(error);
				return NextResponse.json({
					status: 400,
					success: false,
					message: "Invalid orders format",
					error: { code: "BAD_REQUEST", details: "Orders must be a valid JSON array of strings." }
				}, { status: 400 });
			}
		}

		if (!Object.keys(body).length) {
			return NextResponse.json({
				status: 400, success: false, message: "Update data is required",
				error: { code: "BAD_REQUEST", details: "You must provide at least one field to update." }
			}, { status: 400 });
		}

		const existingUser = await User.findById(id);
		if (!existingUser) {
			return NextResponse.json({
				status: 404, success: false, message: "User not found",
				error: { code: "NOT_FOUND", details: `No user found with ID: ${id}` }
			}, { status: 404 });
		}

		const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
		return NextResponse.json({
			status: 200, success: true, message: "User updated successfully", data: updatedUser
		});

	} catch (error) {
		console.error("PATCH /users/[id] error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error",
			error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}
