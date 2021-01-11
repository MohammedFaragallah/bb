const {
	REACT_APP_CLOUDINARY_CLOUD_NAME,
	REACT_APP_CLOUDINARY_API_KEY,
} = process.env;

//? types source https://cloudinary.com/documentation/media_library_widget
export interface CloudinaryAsset {
	bytes: number;
	context: object[];
	created_at: string;
	derived: object[];
	format: string;
	height: number;
	metadata: [];
	public_id: string;
	resource_type: string;
	secure_url: string;
	tags: string[];
	type: string;
	url: string;
	version: number;
	width: number;
}

export interface CloudinaryConfig {
	cloud_name: string;
	api_key: string;
}

export interface CloudinaryHandlers {
	insertHandler: (response: { assets: CloudinaryAsset[] }) => void;
}

export interface CloudinaryMediaLibrary {
	show: () => void;
}

declare global {
	interface Window {
		cloudinary?: {
			createMediaLibrary: (
				config: CloudinaryConfig,
				handlers?: CloudinaryHandlers,
				button?: HTMLElement | null,
			) => CloudinaryMediaLibrary;
		};
	}
}

export const mediaLibraryWidget = window.cloudinary?.createMediaLibrary?.({
	cloud_name: REACT_APP_CLOUDINARY_CLOUD_NAME as string,
	api_key: REACT_APP_CLOUDINARY_API_KEY as string,
});
