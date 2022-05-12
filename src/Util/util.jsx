import { useCallback, useEffect } from 'react';

const getPriceType = (price, isUnit = false) => {
	const unit = isUnit ? '원' : '';
	return price.toLocaleString('ko-KR') + unit;
};

const useDebounce = (func, delay, deps) => {
	const callback = useCallback(func, [func, deps]);

	useEffect(() => {
		const timer = setTimeout(() => {
			callback();
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [callback, delay]);
};

export { getPriceType, useDebounce };
