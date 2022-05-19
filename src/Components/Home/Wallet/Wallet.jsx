import { useContext } from 'react';

import { getPriceType } from 'Util/util';
import { CoinsContext } from 'Components/Contexts';
import {
	WalletDiv,
	CoinsSumDiv,
	WalletInsertAllBtnDiv,
	WalletWithdrawAllBtnDiv,
} from './Wallet.styled';
import Coin from './Coin/Coin';
import WalletMessages from './WalletMessages/WalletMessages';

const Wallet = () => {
	const WITHDRAW_ALL = '전액 반납';
	const INSERT_ALL = '전액 투입';

	const { coins, coinsSum } = useContext(CoinsContext);

	const coinsList = coins.map((coin) => <Coin key={coin.id} coin={coin} />);

	return (
		<WalletDiv>
			<div>{coinsList}</div>
			<div>
				<CoinsSumDiv>{getPriceType(coinsSum, true)}</CoinsSumDiv>
				<WalletMessages />
				<WalletWithdrawAllBtnDiv>{WITHDRAW_ALL}</WalletWithdrawAllBtnDiv>
				<WalletInsertAllBtnDiv>{INSERT_ALL}</WalletInsertAllBtnDiv>
			</div>
		</WalletDiv>
	);
};

export default Wallet;
