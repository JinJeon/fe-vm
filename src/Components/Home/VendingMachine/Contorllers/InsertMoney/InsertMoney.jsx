import { useState, useContext } from 'react';

import CoinsContext from 'Components/Home/CoinsContext';
import {
	getPriceType,
	useDebounce,
	spendMoney,
	withdrawMoney,
} from 'Util/util';
import {
	InsertMoneyDiv,
	InsertMoneyValue,
	WithdrawDiv,
} from './InsertMoney.styled';

const InsertMoney = () => {
	const unit = '원';
	const debounceTime = 2000;

	const { coins, coinsSum, setCoins, money, setMoney } =
		useContext(CoinsContext);
	const [showedMoney, setShowedMoney] = useState(0);

	const handleFocus = ({ target: { value } }) => {
		if (value === '0') setShowedMoney(0);
	};

	const handleInput = ({ target: { value } }) => {
		const rNumber = /^[0-9]+$|^$/;
		const valueNumber = Number(value.replaceAll(',', ''));

		if (rNumber.test(valueNumber)) setShowedMoney(valueNumber);
	};

	const handleClick = () => {
		setShowedMoney(0);
	};

	const checkShowedMoney = () => {
		const difference = showedMoney - money;
		const isMoneyInWallet = coinsSum >= difference;

		if (isMoneyInWallet) {
			const { calculatedMoney, coinsInWallet } =
				difference >= 0
					? spendMoney(coins, difference)
					: withdrawMoney(coins, difference);
			const totalMoney = money + calculatedMoney;

			setCoins(coinsInWallet);
			setMoney(totalMoney);
			setShowedMoney(totalMoney);
		} else {
			setShowedMoney(money);
		}
		console.log(coins);
	};

	useDebounce(checkShowedMoney, debounceTime);

	return (
		<>
			<InsertMoneyDiv>
				<InsertMoneyValue
					type="text"
					placeholder="0"
					maxLength="11"
					onInput={handleInput}
					onPaste={handleInput}
					onFocus={handleFocus}
					value={getPriceType(showedMoney)}
				/>
				{unit}
			</InsertMoneyDiv>
			<WithdrawDiv onClick={handleClick}>반납</WithdrawDiv>
		</>
	);
};

export default InsertMoney;
