import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/db/User";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	await connectToDatabase();
	const id = (await params).id;

	try {
		if (!id) return NextResponse.json({ error: "User ID is required", status: 400 });
		const user = await User.findById(id);
		if (!user) return NextResponse.json({ error: "User not found", status: 404 });
		return NextResponse.json({ data: user, message: "User fetched successfully", status: 200 });
	} catch (error) {
		console.error("Error fetching user:", error);
		return NextResponse.json({ error: "Failed to retrieve user", status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	await connectToDatabase();
	const id = (await params).id;
	try {
		if (!id) return NextResponse.json({ error: "User ID is required", status: 400 });
		const deletedUser = await User.findByIdAndDelete(id);
		if (!deletedUser) return NextResponse.json({ error: "User not found", status: 404 });
		return NextResponse.json({ data: deletedUser, message: "User deleted successfully", status: 200 });
	} catch (error) {
		console.error("Error deleting user:", error);
		return NextResponse.json({ error: "Failed to delete user", status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	await connectToDatabase();
	const id = (await params).id;
	try {
		if (!id) return NextResponse.json({ error: "User ID is required", status: 400 });
		const body = await req.json();
		const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
		if (!updatedUser) return NextResponse.json({ error: "User not found", status: 404 });
		return NextResponse.json({ data: updatedUser, message: "User updated successfully", status: 200 });
	} catch (error) {
		console.error("Error updating user:", error);
		return NextResponse.json({ error: "Failed to update user", status: 500 });
	}
}
