import { useContext } from 'react';

import {
	autoWithdrawTime,
	MINUS,
	PLUS,
	UNIT,
} from 'Components/Common/constant';
import {
	CoinsContext,
	MoneyContext,
	ShowedMoneyContext,
	IsTakingOutContext,
	MessagesDispatchContext,
} from 'Components/Contexts';
import { getPriceType } from 'Util/util';
import useDebounce from 'Util/hooks';
import { spendMoney, withdrawMoney } from 'Components/Common/controlMoney';
import {
	InsertMoneyDiv,
	InsertMoneyValue,
	InsertBtnDiv,
	WithdrawBtnDiv,
	BtnsDiv,
} from './InsertMoney.styled';

const InsertMoney = () => {
	const { coins, coinsSum } = useContext(CoinsContext);
	const { showedMoney, setShowedMoney } = useContext(ShowedMoneyContext);
	const { money, setMoney } = useContext(MoneyContext);
	const { isTakingOut } = useContext(IsTakingOutContext);
	const messagesDispatch = useContext(MessagesDispatchContext);

	const getCalculatingOptions = (difference) => {
		const isSpending = difference >= 0;
		const calculatingOptions = {
			calculateMoney: isSpending ? spendMoney : withdrawMoney,
			calculatingType: isSpending ? MINUS : PLUS,
		};
		return calculatingOptions;
	};

	const checkShowedMoney = (isEmpty) => {
		const difference = isEmpty ? -money : showedMoney - money;
		const isMoneyInWallet = coinsSum >= difference; // when showedMoney is much larger
		const { calculateMoney, calculatingType } =
			getCalculatingOptions(difference);

		if (!isMoneyInWallet) {
			setShowedMoney(money);
			return;
		}

		const { calculatedMoney, changedCoins } = calculateMoney(coins, difference);
		const totalMoney = money + calculatedMoney;

		setMoney(totalMoney);
		setShowedMoney(totalMoney);
		messagesDispatch({
			type: calculatingType,
			contents: changedCoins,
		});
	};

	const handleInput = ({ target: { value } }) => {
		const numberFilter = /^[0-9]+$|^$/;
		const valueNumber = Number(value.replaceAll(',', ''));
		if (numberFilter.test(valueNumber)) setShowedMoney(valueNumber);
	};

	const handleClickBtns = (isEmpty) => {
		if (isTakingOut || !showedMoney) return;
		checkShowedMoney(isEmpty);
	};

	const handleKeyUp = ({ key }) => {
		const isEnterKey = key === 'Enter';
		if (isEnterKey) checkShowedMoney();
	};

	useDebounce(handleClickBtns, autoWithdrawTime);

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
			<BtnsDiv>
				<InsertBtnDiv onClick={() => handleClickBtns()}>
					{isTakingOut ? '❌' : '투입'}
				</InsertBtnDiv>
				<WithdrawBtnDiv
					onClick={() => handleClickBtns(true)}
					isTakingOut={isTakingOut}
				>
					{isTakingOut ? '❌' : '반납'}
				</WithdrawBtnDiv>
			</BtnsDiv>
		</>
	);
};

export default InsertMoney;
