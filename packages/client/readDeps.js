const fs = require('fs');

const blocked = ['react-scripts'];
const dependencies = JSON.parse(fs.readFileSync('./package.json')).dependencies;

fs.writeFile(
	'./src/Pages/SiteMap/Dependencies/deps.ts',
	`export const deps = ${JSON.stringify(
		Object.keys(dependencies)
			.map(key =>
				!blocked.includes(key)
					? [key, dependencies[key].replace('^', '')]
					: undefined,
			)
			.filter(Boolean),
	)}`,
	err => {
		if (err) console.error(err);
	},
);

// const groupBy = require('lodash/groupBy');

// const formatDate = date => date.toISOString().split('T')[0];

// const fullUrl = './public/MyActivity.json';

// const res = JSON.parse(fs.readFileSync(fullUrl));

// const groups = groupBy(res, item => {
// 	const dateObj = new Date(item['time']);

// 	return formatDate(dateObj);
// });

// const data = Object.keys(groups).map(item => ({
// 	value: groups[item].length,
// 	day: item,
// }));

// fs.writeFile('./public/data.json', JSON.stringify(data), err => {
// 	if (err) console.error(err);
// });

// youtube-dl 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn6puJdseH2Rt9sMvt9E2M4i'  -o '%(title)s.%(ext)s'  -f 'best[height<=720]' -i
