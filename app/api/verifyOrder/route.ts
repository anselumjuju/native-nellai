import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { handleRequest } from "@/lib/serverActions";

const generatedSignature = (
	razorpayOrderId: string,
	razorpayPaymentId: string
) => {
	const keySecret = process.env.RAZORPAY_SECRET_ID as string;

	const sig = crypto
		.createHmac("sha256", keySecret)
		.update(razorpayOrderId + "|" + razorpayPaymentId)
		.digest("hex");
	return sig;
};

export async function POST(request: NextRequest) {
	const { orderId, razorpayPaymentId, razorpaySignature, orderDetails } =
		await request.json();
	console.log('\n\nOrder Details: ')
	console.log(orderDetails)
	const signature = generatedSignature(orderId, razorpayPaymentId);
	if (signature !== razorpaySignature) {
		console.log("payment verification failed from the route.ts file");
		return NextResponse.json(
			{ message: "payment verification failed", isOk: false },
			{ status: 400 }
		);
	}

	// Probably some database calls here to update order or add premium status to user
	const { success } = await handleRequest({ endpoint: 'orders', method: 'POST', id: orderDetails.orderId, data: orderDetails });

	if (!success) {
		return NextResponse.json(
			{ message: "payment verification failed", isOk: false },
			{ status: 400 }
		);
	}

	return NextResponse.json(
		{ message: "payment verified successfully", isOk: true },
		{ status: 200 }
	);
}  