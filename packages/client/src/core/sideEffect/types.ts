import { Identifier } from '../types';

export type CallbackSideEffect = (args: {
	payload: any;
	requestPayload?: any;
	error?: string | { message: string };
}) => any;

type RedirectToFunction = (
	basePath: string,
	id: Identifier,
	data: any,
) => string;

export type RedirectionSideEffect = string | boolean | RedirectToFunction;

export type RefreshSideEffect = boolean;
