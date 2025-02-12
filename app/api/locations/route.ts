import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Location from "@/db/Location";

export async function GET() {
	try {
		await connectToDatabase();
		const locations = await Location.find();
		return NextResponse.json({ status: 200, success: true, message: "Locations fetched successfully", data: locations });
	} catch (error) {
		console.error("GET /locations error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error", error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		await connectToDatabase();
		const body = await req.json();

		const existingLocation = await Location.findOne({ name: body.name.trim().toLowerCase() });
		if (existingLocation) {
			return NextResponse.json({
				status: 409, success: false, message: "Location already exists", error: { code: "CONFLICT", details: "A location with the same name already exists." }
			}, { status: 409 });
		}

		const newLocation = await Location.create(body);
		return NextResponse.json({
			status: 201, success: true, message: "Location created successfully", data: newLocation
		}, { status: 201 });
	} catch (error) {
		console.log("POST /locations error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error", error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}
