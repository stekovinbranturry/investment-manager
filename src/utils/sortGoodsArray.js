const convert = day => {
	return day[4] === '-' ? new Date(day.split('-').join('/')) : new Date(day);
};

export const sortGoodsArray = array =>
	array.sort((a, b) => convert(b.buyDate) - convert(a.buyDate));
