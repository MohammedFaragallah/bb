import { useEffect, useRef, useState } from 'react';

export const useSafeState = <T extends unknown = unknown>(initialValue: T) => {
	const _isMounted = useRef(false);
	const [state, setState] = useState<T>(initialValue);

	useEffect(() => {
		_isMounted.current = true;
		return () => {
			_isMounted.current = false;
		};
	});

	const safeSetState = (...args: Parameters<typeof setState>) => {
		if (_isMounted.current) {
			// do not call setState if the component already unmounted
			setState(...args);
		}
	};

	return [state, safeSetState] as const;
};
