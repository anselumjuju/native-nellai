import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/db/User";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	await connectToDatabase();
	const id = (await params).id;

	try {
		if (!id) return NextResponse.json({ error: "User ID is required" });
		const user = await User.findById(id);
		if (!user) return NextResponse.json({ error: "User not found" });
		return NextResponse.json({ data: user, message: "User fetched successfully" });
	} catch (error) {
		console.error("Error fetching user:", error);
		return NextResponse.json({ error });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	await connectToDatabase();
	const id = (await params).id;
	try {
		if (!id) return NextResponse.json({ error: "User ID is required" });
		const deletedUser = await User.findByIdAndDelete(id);
		if (!deletedUser) return NextResponse.json({ error: "User not found" });
		return NextResponse.json({ data: deletedUser, message: "User deleted successfully" });
	} catch (error) {
		console.error("Error deleting user:", error);
		return NextResponse.json({ error });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	await connectToDatabase();
	const id = (await params).id;
	try {
		if (!id) return NextResponse.json({ error: "User ID is required" });
		const body = await req.json();
		const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
		if (!updatedUser) return NextResponse.json({ error: "User not found" });
		return NextResponse.json({ data: updatedUser, message: "User updated successfully" });
	} catch (error) {
		console.error("Error updating user:", error);
		return NextResponse.json({ error });
	}
}
