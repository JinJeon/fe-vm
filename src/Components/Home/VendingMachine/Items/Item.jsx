import { useContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import CoinsContext from 'Components/Home/CoinsContext';
import { getPriceType } from 'Util/util';
import { ItemDiv, ItemNameDiv, ItmePriceDiv } from './Items.styled';

const Item = ({ item: { name, price } }) => {
	const { money, setShowedMoney, setMoney } = useContext(CoinsContext);
	const debounceTime = 2000;
	const difference = money - price;
	const isSelectable = difference >= 0;

	const handleClick = useCallback(() => {
		if (!isSelectable) return;
		setShowedMoney(difference);
		setMoney(difference);
	}, [difference, isSelectable, setMoney, setShowedMoney]);

	const debouncedHandleClick = useMemo(
		() => debounce(handleClick, debounceTime),
		[handleClick]
	);

	return (
		<ItemDiv onClick={debouncedHandleClick} isSelectable={isSelectable}>
			<ItemNameDiv>{name}</ItemNameDiv>
			<ItmePriceDiv>{getPriceType(price, true)}</ItmePriceDiv>
		</ItemDiv>
	);
};

Item.propTypes = {
	item: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	).isRequired,
};

export default Item;
