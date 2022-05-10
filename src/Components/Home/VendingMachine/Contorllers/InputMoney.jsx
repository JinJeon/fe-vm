import { useState } from 'react';
import styled from 'styled-components';

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
	const [money, setMoney] = useState(0);

	const handleFocus = ({ target: { value } }) => {
		if (value === '0') setMoney('');
	};

	const handleInput = ({ target: { value } }) => {
		const rNumber = /[0-9]+$|^$/;
		if (rNumber.test(value)) setMoney(value);
	};

	return (
		<InputMoneyDiv>
			<InputMoneyValue
				type="text"
				placeholder="0"
				onInput={handleInput}
				onFocus={handleFocus}
				value={money}
			/>
			원
		</InputMoneyDiv>
	);
};

export default InputMoney;
