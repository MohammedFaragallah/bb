import { CORE_REGISTER_RESOURCE } from '../types';

export interface ResourceDefinition {
	readonly name: string;
	readonly options?: any;
	readonly hasList?: boolean;
	readonly hasEdit?: boolean;
	readonly hasShow?: boolean;
	readonly hasCreate?: boolean;
	readonly icon?: any;
}

export interface RegisterResourceAction {
	readonly type: typeof CORE_REGISTER_RESOURCE;
	readonly payload: ResourceDefinition;
}

export const registerResource = (
	resource: ResourceDefinition,
): RegisterResourceAction => ({
	type: CORE_REGISTER_RESOURCE,
	payload: resource,
});
