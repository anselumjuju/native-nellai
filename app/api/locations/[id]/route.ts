import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Location from "@/db/Location";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	if (!id) return NextResponse.json({ error: "Location ID is required" });
	try {
		const location = await Location.findById(id);
		if (!location) return NextResponse.json({ error: "Location not found" });
		return NextResponse.json({ data: location, message: "Location fetched successfully" });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	if (!id) return NextResponse.json({ error: "Location ID is required" });
	try {
		const deletedLocation = await Location.findByIdAndDelete(id);
		if (!deletedLocation) return NextResponse.json({ error: "Location not found" });
		return NextResponse.json({ data: deletedLocation, message: "Location deleted successfully" });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	if (!id) return NextResponse.json({ error: "Location ID is required" });
	try {
		const body = await req.json();
		const updatedLocation = await Location.findByIdAndUpdate(id, body, { new: true });
		if (!updatedLocation) return NextResponse.json({ error: "Location not found" });
		return NextResponse.json({ data: updatedLocation, message: "Location updated successfully" });
	} catch (error) {
		return NextResponse.json({ error });
	}
}