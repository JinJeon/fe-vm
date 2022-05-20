import { useContext } from 'react';

import { getPriceType } from 'Util/util';
import { CoinsContext, MoneyContext } from 'Components/Contexts';
import {
	WalletDiv,
	CoinsSumDiv,
	WalletInsertAllBtn,
	WalletWithdrawAllBtn,
} from './Wallet.styled';
import Coin from './Coin/Coin';
import WalletMessages from './WalletMessages/WalletMessages';

const Wallet = () => {
	const WITHDRAW_ALL = '전액 반납';
	const INSERT_ALL = '전액 투입';

	const { coins, coinsSum } = useContext(CoinsContext);
	const { checkInsertedMoney } = useContext(MoneyContext);

	const coinsList = coins.map((coin) => <Coin key={coin.id} coin={coin} />);

	return (
		<WalletDiv>
			<div>{coinsList}</div>
			<div>
				<CoinsSumDiv>{getPriceType(coinsSum, true)}</CoinsSumDiv>
				<WalletMessages />
				<WalletWithdrawAllBtn onClick={() => checkInsertedMoney(true)}>
					{WITHDRAW_ALL}
				</WalletWithdrawAllBtn>
				<WalletInsertAllBtn onClick={() => checkInsertedMoney(false, true)}>
					{INSERT_ALL}
				</WalletInsertAllBtn>
			</div>
		</WalletDiv>
	);
};

export default Wallet;
