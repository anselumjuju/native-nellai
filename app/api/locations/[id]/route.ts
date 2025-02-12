import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Location from "@/db/Location";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectToDatabase();
		const id = (await params).id;
		if (!id) {
			return NextResponse.json({
				status: 400, success: false, message: "Location ID is required", error: { code: "BAD_REQUEST", details: "You must provide a location ID." }
			}, { status: 400 });
		}
		const location = await Location.findById(id);
		if (!location) {
			return NextResponse.json({
				status: 404, success: false, message: "Location not found", error: { code: "NOT_FOUND", details: `No location found with ID: ${id}` }
			}, { status: 404 });
		}
		return NextResponse.json({
			status: 200, success: true, message: "Location fetched successfully", data: location
		});
	} catch (error) {
		console.error("GET /locations/[id] error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error", error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectToDatabase();

		const id = (await params).id;
		if (!id) {
			return NextResponse.json({
				status: 400, success: false, message: "Location ID is required", error: { code: "BAD_REQUEST", details: "You must provide a location ID." }
			}, { status: 400 });
		}

		const deletedLocation = await Location.findByIdAndDelete(id);
		if (!deletedLocation) {
			return NextResponse.json({
				status: 404, success: false, message: "Location not found", error: { code: "NOT_FOUND", details: `No location found with ID: ${id}` }
			}, { status: 404 });
		}

		return NextResponse.json({
			status: 200, success: true, message: "Location deleted successfully", data: deletedLocation
		}, { status: 200 });

	} catch (error) {
		console.error("DELETE /locations/[id] error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error",
			error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		await connectToDatabase();

		const id = (await params).id;
		if (!id) {
			return NextResponse.json({
				status: 400, success: false, message: "Location ID is required",
				error: { code: "BAD_REQUEST", details: "You must provide a location ID." }
			}, { status: 400 });
		}

		const body = await req.json();
		if (!Object.keys(body).length) {
			return NextResponse.json({
				status: 400, success: false, message: "Update data is required",
				error: { code: "BAD_REQUEST", details: "You must provide at least one field to update." }
			}, { status: 400 });
		}

		const existingLocation = await Location.findById(id);
		if (!existingLocation) {
			return NextResponse.json({
				status: 404, success: false, message: "Location not found",
				error: { code: "NOT_FOUND", details: `No location found with ID: ${id}` }
			}, { status: 404 });
		}

		const updatedLocation = await Location.findByIdAndUpdate(id, body, { new: true });
		return NextResponse.json({
			status: 200, success: true, message: "Location updated successfully", data: updatedLocation
		});

	} catch (error) {
		console.error("PATCH /locations/[id] error:", error);
		return NextResponse.json({
			status: 500, success: false, message: "Internal server error",
			error: { code: "INTERNAL_SERVER_ERROR", details: error instanceof Error ? error.message : "Something went wrong" }
		}, { status: 500 });
	}
}