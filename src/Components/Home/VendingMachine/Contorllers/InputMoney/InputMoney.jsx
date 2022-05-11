import { useState, useContext } from 'react';

import CoinsContext from 'Components/Home/CoinsContext';
import { getPriceType, useDebounce } from 'Util/util';
import { InputMoneyDiv, InputMoneyValue } from './InputMoney.styled';

const InputMoney = () => {
	const unit = '원';
	const debounceTime = 500;

	const { coinsSum } = useContext(CoinsContext);
	const [showedMoney, setShowedMoney] = useState('');
	const [money, setMoney] = useState('');

	const handleFocus = ({ target: { value } }) => {
		if (value === '0') setShowedMoney('');
	};

	const handleInput = ({ target: { value } }) => {
		const rNumber = /^[0-9]+$|^$/;
		const valueNumber = Number(value.replaceAll(',', ''));

		if (rNumber.test(valueNumber)) setShowedMoney(valueNumber);
	};

	const checkShowedMoney = () => {
		const isMoneyInWallet = coinsSum < showedMoney - money;
		return isMoneyInWallet ? setShowedMoney(money) : setMoney(showedMoney);
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
