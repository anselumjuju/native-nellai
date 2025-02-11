import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/db/User";

export async function GET() {
	await connectToDatabase();
	try {
		const users = await User.find();
		return NextResponse.json({ users });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

export async function POST(req: NextRequest) {
	await connectToDatabase();
	try {
		const body = await req.json();
		const newUser = await User.create(body);
		return NextResponse.json({ data: newUser });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}