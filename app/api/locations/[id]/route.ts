import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Location from "@/models/Location";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const location = await Location.findById(id);
		return NextResponse.json({ data: location });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const deletedLocation = await Location.findByIdAndDelete(id);
		return NextResponse.json({ data: deletedLocation });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await connectToDatabase();
	try {
		const body = await req.json();
		const updatedLocation = await Location.findByIdAndUpdate(id, body, { new: true });
		return NextResponse.json({ data: updatedLocation });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}