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

		// Check if address exists and is a string before parsing
		if (body.address && typeof body.address === 'string') {
			try {
				body.address = JSON.parse(body.address);
			} catch (error) {
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
				return NextResponse.json({
					status: 400,
					success: false,
					message: "Invalid orders format",
					error: { code: "BAD_REQUEST", details: "Orders must be a valid JSON array of strings." }
				}, { status: 400 });
			}
		}

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
