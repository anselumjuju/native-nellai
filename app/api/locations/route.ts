import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Location from "@/db/Location";

export async function GET() {
	await connectToDatabase();
	try {
		const locations = await Location.find();
		return NextResponse.json({ data: locations, message: "Locations fetched successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch locations", status: 500 });
	}
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	try {
		const body = await req.json();
		const newLocation = await Location.create(body);
		return NextResponse.json({ data: newLocation, message: "Location created successfully", status: 201 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to create location", status: 500 });
	}
}
