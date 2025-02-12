import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/db/User";

export async function GET() {
	await connectToDatabase();
	try {
		const users = await User.find();
		return NextResponse.json({ data: users, message: "Users fetched successfully", status: 200 });
	} catch (error) {
		console.error("Error fetching users:", error);
		return NextResponse.json({ error: "Failed to retrieve users", status: 500 });
	}
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	try {
		const body = await req.json();
		const newUser = await User.create(body);
		return NextResponse.json({ data: newUser, message: "User created successfully", status: 201 });
	} catch (error) {
		console.error("Error creating user:", error);
		return NextResponse.json({ error: "Failed to create user", status: 500 });
	}
}
