import { useState, useContext } from 'react';

import CoinsContext from 'Components/Home/CoinsContext';
import {
	getPriceType,
	useDebounce,
	spendMoney,
	withdrawMoney,
} from 'Util/util';
import { InputMoneyDiv, InputMoneyValue } from './InputMoney.styled';

const InputMoney = () => {
	const unit = '원';
	const debounceTime = 2000;

	const { coins, coinsSum } = useContext(CoinsContext);
	const [showedMoney, setShowedMoney] = useState(0);
	const [money, setMoney] = useState(0);

	const handleFocus = ({ target: { value } }) => {
		if (value === '0') setShowedMoney(0);
	};

	const handleInput = ({ target: { value } }) => {
		const rNumber = /^[0-9]+$|^$/;
		const valueNumber = Number(value.replaceAll(',', ''));

		if (rNumber.test(valueNumber)) setShowedMoney(valueNumber);
	};

	const checkShowedMoney = () => {
		const difference = showedMoney - money;
		const isMoneyInWallet = coinsSum > difference;

		if (isMoneyInWallet) {
			const calculatedMoney =
				difference >= 0
					? spendMoney(coins, difference)
					: withdrawMoney(coins, difference);
			const totalMoney = money + calculatedMoney;

			setMoney(totalMoney);
			setShowedMoney(totalMoney);
		} else {
			setShowedMoney(money);
		}
	};

	useDebounce(checkShowedMoney, debounceTime);

	return (
		<InputMoneyDiv>
			<InputMoneyValue
				type="text"
				placeholder="0"
				maxLength="11"
				onInput={handleInput}
				onPaste={handleInput}
				onFocus={handleFocus}
				value={getPriceType(showedMoney)}
			/>
			{unit}
		</InputMoneyDiv>
	);
};

export default InputMoney;
