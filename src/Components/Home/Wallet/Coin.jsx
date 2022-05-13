import PropTypes from 'prop-types';
import { useContext } from 'react';
import {
	CoinsContext,
	ShowedMoneyContext,
	MoneyContext,
} from 'Components/Contexts';

import { getPriceType } from 'Util/util';
import { CoinDiv, CoinCountDiv, CoinPriceDiv } from './Wallet.styled';

const Coin = ({ coin }) => {
	const { price, count, id } = coin;
	const { coins, setCoins } = useContext(CoinsContext);
	const { setShowedMoney } = useContext(ShowedMoneyContext);
	const { money } = useContext(MoneyContext);

	const handleClickCount = () => {
		const newCoins = [...coins];
		newCoins[id].count -= 1;

		setShowedMoney(money + price);
		setCoins(newCoins);
	};

	return (
		<CoinDiv>
			<CoinPriceDiv>{getPriceType(price, true)}</CoinPriceDiv>
			<CoinCountDiv onClick={handleClickCount}>{count}개</CoinCountDiv>
		</CoinDiv>
	);
};

Coin.propTypes = {
	coin: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
	).isRequired,
};

export default Coin;
