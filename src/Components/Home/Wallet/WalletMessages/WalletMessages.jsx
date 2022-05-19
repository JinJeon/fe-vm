import { useContext, useRef, useEffect } from 'react';

import { getPriceType } from 'Util/util';
import { MessagesContext } from 'Components/Contexts';
import { WalletMessagesDiv, WalletMessageDiv } from '../Wallet.styled';

const WalletMessages = () => {
	const messages = useContext(MessagesContext);
	const showBottomRef = useRef(null);

	const WalletMessagesList = messages.map(({ id, time, totalPrice }, index) => {
		const isLast = index === messages.length - 1;
		const ref = (isLast && showBottomRef) || null;
		const priceSign = totalPrice > 0 ? '+' : '-';
		const totalPriceByType = getPriceType(Math.abs(totalPrice));
		return (
			totalPrice && (
				<WalletMessageDiv key={id} ref={ref}>
					{`[${time}] ${priceSign} ${totalPriceByType}`}
				</WalletMessageDiv>
			)
		);
	});

	const showBottomAuto = () =>
		showBottomRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
		});

	useEffect(showBottomAuto, [WalletMessagesList]);

	return <WalletMessagesDiv>{WalletMessagesList}</WalletMessagesDiv>;
};

export default WalletMessages;
