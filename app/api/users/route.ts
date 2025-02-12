import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/db/User";

export async function GET() {
	try {
		await connectToDatabase();
		const users = await User.find();
		return NextResponse.json({ status: 200, success: true, message: "Users fetched successfully", data: users, })
	} catch (error) {
		console.error("GET /users error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error", error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		await connectToDatabase();
		const body = await req.json();

		const existingUser = await User.findOne({ name: body.name.trim().toLowerCase() });
		if (existingUser) {
			return NextResponse.json({
				status: 409, success: false, message: "User already exists", error: { code: "CONFLICT", details: "A user with the same name already exists." }
			}, { status: 409 });
		}

		const newUser = await User.create(body);
		return NextResponse.json({
			status: 201, success: true, message: "User created successfully", data: newUser
		}, { status: 201 });

	} catch (error) {
		console.error("POST /users error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error", error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}
