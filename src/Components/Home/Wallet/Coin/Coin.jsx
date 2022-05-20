import PropTypes from 'prop-types';
import { useContext } from 'react';
import { MoneyContext } from 'Components/Contexts';

import { getPriceType } from 'Util/util';
import { CoinDiv, CoinCountBtn, CoinPriceDiv } from './Coin.styled';

const Coin = ({ coin }) => {
	const { price, count } = coin;
	const { checkInsertedCoin } = useContext(MoneyContext);

	return (
		<CoinDiv>
			<CoinPriceDiv>{getPriceType(price, true)}</CoinPriceDiv>
			<CoinCountBtn
				disabled={!count}
				onClick={() => checkInsertedCoin(coin)}
				count={count}
			>
				{count}개
			</CoinCountBtn>
		</CoinDiv>
	);
};

Coin.propTypes = {
	coin: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
	).isRequired,
};

export default Coin;
