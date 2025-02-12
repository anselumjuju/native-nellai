import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Location from "@/db/Location";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	if (!id) return NextResponse.json({ error: "Location ID is required", status: 400 });
	try {
		const location = await Location.findById(id);
		if (!location) return NextResponse.json({ error: "Location not found", status: 404 });
		return NextResponse.json({ data: location, message: "Location fetched successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch location", status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	if (!id) return NextResponse.json({ error: "Location ID is required", status: 400 });
	try {
		const deletedLocation = await Location.findByIdAndDelete(id);
		if (!deletedLocation) return NextResponse.json({ error: "Location not found", status: 404 });
		return NextResponse.json({ data: deletedLocation, message: "Location deleted successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to delete location", status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	if (!id) return NextResponse.json({ error: "Location ID is required", status: 400 });
	try {
		const body = await req.json();
		const updatedLocation = await Location.findByIdAndUpdate(id, body, { new: true });
		if (!updatedLocation) return NextResponse.json({ error: "Location not found", status: 404 });
		return NextResponse.json({ data: updatedLocation, message: "Location updated successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to update location", status: 500 });
	}
}