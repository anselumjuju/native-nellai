export const uploadImage = async (image: File) => {
	if (!image) return null;

	const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
	const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

	if (!upload_preset || !cloud_name) throw new Error("Cloudinary credentials are not set");

	const data = new FormData();
	data.append("file", image);
	data.append("upload_preset", `${upload_preset}`);

	try {
		const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
			method: "POST",
			body: data,
		});

		if (!res.ok) {
			const errorResponse = await res.json();
			throw new Error(`Cloudinary upload failed: ${errorResponse.error?.message || res.statusText}`);
		}

		const uploadedImage = await res.json();
		return uploadedImage.url;
	} catch (error) {
		console.error("Error uploading image:", error);
		return null;
	}
};
