'use server';

import { revalidatePath } from "next/cache";


/* Categories */
export async function addCategory(formData: FormData) {
	const name = formData.get('name') as string;
	const description = formData.get('description') as string;

	if (!name || !description)
		throw new Error('All fields are required');

	await fetch(`${process.env.BASE_URL}/api/categories`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name,
			description,
		}),
	});
	revalidatePath('/admin/categories');
}

export async function deleteCategory(id: string) {
	await fetch(`${process.env.BASE_URL}/api/categories/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	console.log('Category deleted');
	revalidatePath('/admin/categories');
}

export async function updateCategory(id: string, formData: FormData) {
	const name = formData.get('name') as string;
	const description = formData.get('description') as string;

	if (!name || !description)
		throw new Error('All fields are required');

	await fetch(`${process.env.BASE_URL}/api/categories/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name,
			description,
		}),
	});
	revalidatePath('/admin/categories');
}

/* Locations */
export async function addLocation(formData: FormData) {
	const name = formData.get('name') as string;
	const image = formData.get('image') as string;

	if (!name || !image)
		throw new Error('All fields are required');

	await fetch(`${process.env.BASE_URL}/api/locations`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name,
			image,
		}),
	});
	revalidatePath('/admin/locations');
}

export async function deleteLocation(id: string) {
	await fetch(`${process.env.BASE_URL}/api/locations/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	revalidatePath('/admin/locations');
}

export async function updateLocation(id: string, formData: FormData) {
	const name = formData.get('name') as string;
	const image = formData.get('image') as string;

	if (!name || !image)
		throw new Error('All fields are required');

	await fetch(`${process.env.BASE_URL}/api/locations/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name,
			image,
		}),
	});
	revalidatePath('/admin/locations');
}