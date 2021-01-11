export const invertNumber = (min: number, max: number, num: number) =>
	max + min - num;

export const convertRange = (
	oldMin: number,
	oldMax: number,
	newMin: number,
	newMax: number,
	oldValue: number,
) => {
	const percent = (oldValue - oldMin) / (oldMax - oldMin);
	const result = percent * (newMax - newMin) + newMin;
	return result || 0;
};
