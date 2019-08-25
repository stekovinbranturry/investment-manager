export const dateFormat = date => {
	const newDate =
		date[4] === '-' ? new Date(date.split('-').join('/')) : new Date(date);
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

export const getYesterday = () => {
	const today = new Date();
	const yesterday = new Date(today);
	return yesterday.setDate(today.getDate() - 1);
};
