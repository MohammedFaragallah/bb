import axios from 'axios';
import { MediaType } from 'braft-editor';

import { CloudinaryAsset } from 'Custom/Layout/CloudWidget';

const handleFileUpload = (file: File) => {
	const {
		REACT_APP_CLOUDINARY_UPLOAD_PRESET,
		REACT_APP_CLOUDINARY_API_KEY,
		REACT_APP_CLOUDINARY_CLOUD_NAME,
	} = process.env;

	const formData = new FormData();

	formData.append('file', file);
	formData.append(
		'upload_preset',
		REACT_APP_CLOUDINARY_UPLOAD_PRESET as string,
	);
	formData.append('api_key', REACT_APP_CLOUDINARY_API_KEY as string);

	return axios.post<CloudinaryAsset>(
		`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/upload` as string,
		formData,
		{
			headers: { 'X-Requested-With': 'XMLHttpRequest' },
		},
	);
};

export const handleBraftUploads: MediaType['uploadFn'] = async ({
	file,
	success,
}) => {
	const { data } = await handleFileUpload(file);

	return success({ url: data.secure_url } as any);
};

export const injectImages = async (item: any) => {
	for (const property in item) {
		if (item[property]?.rawFile) {
			try {
				const { data } = await handleFileUpload(item[property].rawFile);
				item[property] = data;
			} catch (error) {
				console.error(error);
			}
		}
	}

	return item;
};
