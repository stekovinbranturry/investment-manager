const convert = day => {
	return new Date(day);
};

export const sortGoodsArray = array =>
	array.sort((a, b) => convert(b.buyDate) - convert(a.buyDate));
