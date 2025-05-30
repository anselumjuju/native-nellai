'use server';

import { revalidatePath } from "next/cache";

export interface HandleRequestProps {
	endpoint: 'categories' | 'locations' | 'orders' | 'products' | 'reviews' | 'users';
	method?: 'GET' | 'POST' | 'DELETE' | 'PATCH';
	id?: string;
	data?: FormData | object;
}

export async function handleRequest({ endpoint, method = 'GET', id, data }: HandleRequestProps) {
	try {
		const url = `${process.env.BASE_URL}/api/${endpoint}${id && method !== 'POST' ? `/${id}` : ''}`;

		if ((method === 'PATCH' || method === 'DELETE') && !id) throw new Error("No ID provided");
		if ((method === 'POST' || method === 'PATCH') && !data) throw new Error("No data provided");

		let body: BodyInit | undefined = undefined;
		let headers: HeadersInit | undefined = undefined;
		if (method !== 'GET' && method !== 'DELETE') {
			if (data instanceof FormData) {
				const jsonObject: Record<string, string> = {};
				data.forEach((value, key) => {
					jsonObject[key] = value as string;
				});
				body = JSON.stringify(jsonObject);
				headers = undefined;
			} else {
				body = JSON.stringify(data);
				headers = { 'Content-Type': 'application/json' };
			}
		}

		const res = await fetch(url, {
			method,
			headers,
			body,
			cache: 'reload',
		});

		if (!res.ok) throw new Error(res.statusText);
		const resData = await res.json();

		if (method !== 'GET') revalidate(`/admin/${endpoint}`);

		return resData;

	} catch (e) {
		const errorMsg = e instanceof Error ? e.message : 'Something went wrong';
		return { status: 500, success: false, message: errorMsg, error: { code: "INTERNAL_SERVER_ERROR", details: errorMsg } };
	}
}

export async function revalidate(url: string) {
	revalidatePath(url);
}