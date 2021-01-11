import { call, takeEvery } from 'redux-saga/effects';

type CallbackSideEffect = (args: {
	payload: any;
	requestPayload?: any;
	error?: string | { message: string };
}) => any;

interface ActionWithSideEffect {
	type: string;
	payload: any;
	requestPayload?: any;
	error?: string | { message: string };
	meta: {
		callback: CallbackSideEffect;
	};
}

/**
 * Callback Side Effects
 */
function* handleCallback({
	payload,
	requestPayload,
	error,
	meta: { callback },
}: ActionWithSideEffect) {
	yield call(callback, { payload, requestPayload, error });
}

export default function* callback() {
	yield takeEvery((action: any) => action.meta?.callback, handleCallback);
}
