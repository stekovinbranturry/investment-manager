const dateFormat = date => {
	const newDate = new Date(date);
	const [y, m, d] = [
		newDate.getFullYear(),
		newDate.getMonth() + 1,
		newDate.getDate()
	];
	return `${y}-${m}-${d}`;
};

export const getSellDate = (before, days) => {
	const date = new Date(before);
	const after = date.setDate(date.getDate() + days);
	return dateFormat(after);
};
