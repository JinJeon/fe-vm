import { useState } from 'react';
import styled from 'styled-components';
import getPriceType from 'Util/util';

const InputMoneyDiv = styled.div`
	padding: 20px;
	font-size: 20px;
	display: flex;
	align-items: center;
`;

const InputMoneyValue = styled.input`
	text-align: right;
	outline: none;
	border: none;
	font-size: 20px;
`;

const InputMoney = () => {
	const unit = '원';
	const [money, setMoney] = useState('');

	const handleFocus = ({ target: { value } }) => {
		if (value === '0') setMoney('');
	};

	const handleInput = ({ target: { value } }) => {
		const rNumber = /^[0-9]+$|^$/;
		const valueNumber = value.replaceAll(',', '');
		if (rNumber.test(valueNumber)) setMoney(Number(valueNumber));
	};

	return (
		<InputMoneyDiv>
			<InputMoneyValue
				type="text"
				placeholder="0"
				maxLength="11"
				onInput={handleInput}
				onPaste={handleInput}
				onFocus={handleFocus}
				value={getPriceType(money)}
			/>
			{unit}
		</InputMoneyDiv>
	);
};

export default InputMoney;
