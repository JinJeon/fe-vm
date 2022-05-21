import React, {
	useState,
	useMemo,
	createContext,
	useContext,
	useCallback,
} from 'react';
import PropTypes from 'prop-types';

import useDebounce from 'Util/hooks';
import calculateMoney from 'Util/controlMoney';
import { MINUS, PLUS } from 'Util/constant';
import { CoinsContext } from './CoinsContext';
import { MessagesDispatchContext } from './MessagesContext';

const MoneyContext = createContext({});
const ShowedMoneyContext = createContext({});
const MoneyControlContext = createContext({});

const MoneyProvider = ({ inner }) => {
	const AUTO_WITHDRAW_TIME = 5000;
	const [money, setMoney] = useState(0);
	const [showedMoney, setShowedMoney] = useState(0);
	const { coins, setCoins, coinsSum } = useContext(CoinsContext);
	const messagesDispatch = useContext(MessagesDispatchContext);

	const setMoneyStates = (price) => {
		setMoney(price);
		setShowedMoney(price);
	};

	const checkInsertedCoin = useCallback(
		(coin) => {
			const { id, price } = coin;
			const totalMoney = money + price;
			const newCoins = [...coins];
			newCoins[id].count -= 1;

			setMoney(totalMoney);
			setShowedMoney(totalMoney);
			setCoins(newCoins);
			messagesDispatch({
				type: MINUS,
				contents: { [price]: 1 },
			});
		},
		[coins, money, setCoins, messagesDispatch]
	);

	const checkInsertedMoney = useCallback(
		({ isZero, isFull } = false) => {
			const isAlreadyZero = !money && !showedMoney && !isFull;
			if (isAlreadyZero) return;

			let diffWithInsert = isFull ? coinsSum : showedMoney - money;
			if (isZero) diffWithInsert = -money;
			if (diffWithInsert >= coinsSum) diffWithInsert = coinsSum;

			const calculatingType = diffWithInsert >= 0 ? MINUS : PLUS;
			const { calculatedMoney, changedCoins, newCoins } = calculateMoney(
				calculatingType,
				coins,
				diffWithInsert
			);
			const totalMoney = money + calculatedMoney;

			setMoney(totalMoney);
			setShowedMoney(totalMoney);
			setCoins(newCoins);
			messagesDispatch({
				type: calculatingType,
				contents: changedCoins,
			});
		},
		[coins, money, setCoins, messagesDispatch, coinsSum, showedMoney]
	);

	const moneyValue = useMemo(() => {
		return { money, setMoneyStates };
	}, [money]);

	const showedMoneyValue = useMemo(() => {
		return { showedMoney, setShowedMoney };
	}, [showedMoney]);

	const moneyControlValue = useMemo(() => {
		return { checkInsertedMoney, checkInsertedCoin };
	}, [checkInsertedMoney, checkInsertedCoin]);

	useDebounce(() => checkInsertedMoney(true), AUTO_WITHDRAW_TIME);

	return (
		<MoneyContext.Provider value={moneyValue}>
			<ShowedMoneyContext.Provider value={showedMoneyValue}>
				<MoneyControlContext.Provider value={moneyControlValue}>
					{inner}
				</MoneyControlContext.Provider>
			</ShowedMoneyContext.Provider>
		</MoneyContext.Provider>
	);
};

MoneyProvider.propTypes = {
	inner: PropTypes.node.isRequired,
};

export { MoneyContext, MoneyProvider, ShowedMoneyContext, MoneyControlContext };
