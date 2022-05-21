import { useContext } from 'react';
import PropTypes from 'prop-types';

import { MoneyControlContext } from 'Components/Contexts';
import { ControllerBtn, ControllerBtnsDiv } from './ControllerBtns.styled';

const ControllerBtns = ({ isTakingOut }) => {
	const { checkInsertedMoney } = useContext(MoneyControlContext);
	const INSERT = '투입';
	const WITHDRAW = '반납';

	const btnsInfo = [
		{ id: 0, name: INSERT },
		{
			id: 1,
			isZero: true,
			name: WITHDRAW,
		},
	];

	const controllerBtns = btnsInfo.map((info) => {
		const { id, name, isZero } = info;

		return (
			<ControllerBtn
				key={id}
				onClick={() => checkInsertedMoney(isZero)}
				isTakingOut={isTakingOut}
				disabled={isTakingOut}
			>
				{!isTakingOut && name}
				<div />
			</ControllerBtn>
		);
	});

	return <ControllerBtnsDiv>{controllerBtns}</ControllerBtnsDiv>;
};

ControllerBtns.propTypes = {
	isTakingOut: PropTypes.bool.isRequired,
}.isRequired;

export default ControllerBtns;
