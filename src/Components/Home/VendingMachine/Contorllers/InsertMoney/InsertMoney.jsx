import { useContext } from 'react';

import { UNIT } from 'Util/constant';
import {
	MoneyContext,
	IsTakingOutContext,
	ShowedMoneyContext,
} from 'Components/Contexts';
import { getPriceType } from 'Util/util';
import { InsertMoneyDiv, InsertMoneyValue } from './InsertMoney.styled';
import ControllerBtns from './ControllerBtns';

const InsertMoney = () => {
	const ENTER = 'Enter';

	const { showedMoney, setShowedMoney } = useContext(ShowedMoneyContext);
	const { checkInsertedMoney } = useContext(MoneyContext);
	const { isTakingOut } = useContext(IsTakingOutContext);

	const handleInput = ({ target: { value } }) => {
		const numberFilter = /^[0-9]+$|^$/;
		const valueNumber = Number(value.replaceAll(',', ''));
		if (numberFilter.test(valueNumber)) setShowedMoney(valueNumber);
	};

	const handleKeyUp = ({ key }) => {
		const isEnterKey = key === ENTER;
		if (!isEnterKey) return;

		checkInsertedMoney();
	};

	return (
		<>
			<InsertMoneyDiv isTakingOut={isTakingOut}>
				<InsertMoneyValue
					type="text"
					pattern="[0-9]*"
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
			<ControllerBtns isTakingOut={isTakingOut} />
		</>
	);
};

export default InsertMoney;
