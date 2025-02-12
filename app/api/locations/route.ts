import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Location from "@/db/Location";

export async function GET() {
	await connectToDatabase();
	try {
		const locations = await Location.find();
		return NextResponse.json({ data: locations, message: "Locations fetched successfully" });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	try {
		const body = await req.json();
		const newLocation = await Location.create(body);
		return NextResponse.json({ data: newLocation, message: "Location created successfully" });
	} catch (error) {
		return NextResponse.json({ error });
	}
}
