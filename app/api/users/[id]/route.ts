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
