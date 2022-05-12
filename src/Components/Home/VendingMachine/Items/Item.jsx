import { useContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import {
	MoneyContext,
	ShowedMoneyContext,
	IsTakingOutContext,
} from 'Components/Contexts';
import { getPriceType } from 'Util/util';
import {
	ItemDiv,
	ItemNameDiv,
	ItmePriceDiv,
	ItemWrapper,
} from './Items.styled';

const Item = ({ item }) => {
	const targetItem = item;
	const { name, price, count } = targetItem;
	const { setIsTakingOut } = useContext(IsTakingOutContext);
	const { setShowedMoney } = useContext(ShowedMoneyContext);
	const { money, setMoney } = useContext(MoneyContext);
	const debounceTime = 2000;
	const difference = money - price;
	const isSelectable = difference >= 0 && count;

	const handleClick = useCallback(() => {
		if (!isSelectable) return;
		setMoney(difference);
		setShowedMoney(difference);
		setIsTakingOut(false);

		targetItem.count -= 1;
	}, [
		difference,
		isSelectable,
		targetItem,
		setMoney,
		setShowedMoney,
		setIsTakingOut,
	]);

	const debouncedHandleClick = useMemo(
		() => debounce(handleClick, debounceTime),
		[handleClick]
	);

	const handleClickTakingOut = () => {
		if (!isSelectable) return;
		setIsTakingOut(true);
	};

	return (
		<ItemDiv
			onClick={debouncedHandleClick}
			isSelectable={isSelectable}
			count={targetItem.count}
		>
			<ItemWrapper onClick={handleClickTakingOut}>
				<ItemNameDiv>{name}</ItemNameDiv>
				<ItmePriceDiv>{getPriceType(price, true)}</ItmePriceDiv>
			</ItemWrapper>
		</ItemDiv>
	);
};

Item.propTypes = {
	item: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	).isRequired,
};

export default Item;
