import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {}

export const ScrollToTop: React.FC<Props> = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return null;
};
