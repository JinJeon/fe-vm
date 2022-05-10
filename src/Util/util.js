const getPriceType = (price, isUnit = false) => {
	const unit = isUnit ? '원' : '';
	return price.toLocaleString('ko-KR') + unit;
};

export default getPriceType;
