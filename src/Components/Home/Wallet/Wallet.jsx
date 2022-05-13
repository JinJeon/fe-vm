import { useContext } from 'react';

import { CoinsContext } from 'Components/Contexts';
import { WalletDiv, CoinDiv, CoinCountDiv } from './Wallet.styled';

const Wallet = () => {
	const { coins } = useContext(CoinsContext);
	const handleClickCount = () => {
		console.log('hi');
	};
	const coinsList = coins.map((coin) => {
		const { id, price, count } = coin;
		return (
			<CoinDiv key={id}>
				<div>{price}원</div>
				<CoinCountDiv onClick={handleClickCount}>{count}개</CoinCountDiv>
			</CoinDiv>
		);
	});
	return <WalletDiv>{coinsList}</WalletDiv>;
};

export default Wallet;
