import { useContext } from 'react';

import { MINUS, PLUS, UNIT } from 'Util/constant';
import {
	CoinsContext,
	MoneyContext,
	IsTakingOutContext,
	MessagesDispatchContext,
} from 'Components/Contexts';
import { getPriceType } from 'Util/util';
import useDebounce from 'Util/hooks';
import { spendMoney, withdrawMoney } from 'Util/controlMoney';
import { InsertMoneyDiv, InsertMoneyValue } from './InsertMoney.styled';
import ControllerBtns from './ControllerBtns';

const InsertMoney = () => {
	const AUTO_WITHDRAW_TIME = 5000;
	const ENTER = 'Enter';

	const { coins, coinsSum, setCoins } = useContext(CoinsContext);
	const { money, setMoneyStates, showedMoney, setShowedMoney } =
		useContext(MoneyContext);
	const { isTakingOut } = useContext(IsTakingOutContext);
	const messagesDispatch = useContext(MessagesDispatchContext);

	const getCalculatingOptions = (diffWithInsert) => {
		const isSpending = diffWithInsert >= 0;
		const calculatingOptions = {
			calculateMoney: isSpending ? spendMoney : withdrawMoney,
			calculatingType: isSpending ? MINUS : PLUS,
		};
		return calculatingOptions;
	};

	const changeMoney = (diffWithInsert) => {
		const { calculateMoney, calculatingType } =
			getCalculatingOptions(diffWithInsert);
		const { calculatedMoney, changedCoins, newCoins } = calculateMoney(
			coins,
			diffWithInsert
		);
		const totalMoney = money + calculatedMoney;

		setMoneyStates(totalMoney);
		setCoins(newCoins);
		messagesDispatch({
			type: calculatingType,
			contents: changedCoins,
		});
	};

	const checkInsertedMoney = (isZero) => {
		if (!money && !showedMoney) return; // already money is zero

		let diffWithInsert = showedMoney - money;
		if (isZero) diffWithInsert = -money;
		if (coinsSum < diffWithInsert) diffWithInsert = coinsSum;

		changeMoney(diffWithInsert);
	};

	const handleInput = ({ target: { value } }) => {
		const numberFilter = /^[0-9]+$|^$/;
		const valueNumber = Number(value.replaceAll(',', ''));
		if (numberFilter.test(valueNumber)) setShowedMoney(valueNumber);
	};

	const handleKeyUp = ({ key }) => {
		const isEnterKey = key === ENTER;
		if (isEnterKey) checkInsertedMoney();
	};

	useDebounce(() => checkInsertedMoney(true), AUTO_WITHDRAW_TIME);

	return (
		<>
			<InsertMoneyDiv isTakingOut={isTakingOut}>
				<InsertMoneyValue
					type="text"
					maxLength="11"
					onInput={handleInput}
					onPaste={handleInput}
					onKeyUp={handleKeyUp}
					value={getPriceType(showedMoney)}
					disabled={isTakingOut}
					isTakingOut={isTakingOut}
				/>
				{UNIT}
			</InsertMoneyDiv>
			<ControllerBtns
				isTakingOut={isTakingOut}
				checkInsertedMoney={checkInsertedMoney}
			/>
		</>
	);
};

export default InsertMoney;
