import { useEffect, useState } from 'react';

export const useMarkdownFile = (filePath: string) => {
	const [source, setSource] = useState('');

	useEffect(() => {
		fetch(filePath)
			.then(res => res.text())
			.then(post => setSource(post))
			.catch(error => console.error(error));
	}, [filePath]);

	return source;
};
