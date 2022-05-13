import { useContext } from 'react';

import { getPriceType } from 'Util/util';
import { CoinsContext, MessagesContext } from 'Components/Contexts';
import {
	WalletDiv,
	CoinDiv,
	CoinCountDiv,
	CoinPriceDiv,
	CoinsSumDiv,
	WalletMessagesDiv,
	WalletMessageDiv,
} from './Wallet.styled';

const Wallet = () => {
	const { coins, coinsSum } = useContext(CoinsContext);
	const messages = useContext(MessagesContext);
	const handleClickCount = () => {
		console.log('CLICK TEST');
	};

	const WalletMessagesList = messages.map(({ id, time, totalPrice }) => {
		const priceSign = totalPrice > 0 ? '+' : '-';
		const totalPriceByType = getPriceType(Math.abs(totalPrice));
		return (
			totalPrice && (
				<WalletMessageDiv key={id}>
					{`[${time}] ${priceSign} ${totalPriceByType}`}
				</WalletMessageDiv>
			)
		);
	});

	const coinsList = coins.map((coin) => {
		const { id, price, count } = coin;
		return (
			<CoinDiv key={id}>
				<CoinPriceDiv>{getPriceType(price, true)}</CoinPriceDiv>
				<CoinCountDiv onClick={handleClickCount}>{count}개</CoinCountDiv>
			</CoinDiv>
		);
	});

	return (
		<WalletDiv>
			<div>{coinsList}</div>
			<div>
				<CoinsSumDiv>{getPriceType(coinsSum, true)}</CoinsSumDiv>
				<WalletMessagesDiv>{WalletMessagesList}</WalletMessagesDiv>
			</div>
		</WalletDiv>
	);
};

export default Wallet;
