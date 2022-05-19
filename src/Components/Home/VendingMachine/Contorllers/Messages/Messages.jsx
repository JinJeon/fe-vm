import { useContext, useRef, useEffect } from 'react';
import { MessagesContext } from 'Components/Contexts';
import { MessagesDiv, MessageDiv } from './Messages.styled';

const Messages = () => {
	const messages = useContext(MessagesContext);

	const showBottomRef = useRef(null);

	const showBottomAuto = () =>
		showBottomRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
		});

	const messagesList = messages.map(({ message, id, time }, index) => {
		const isLast = index === messages.length - 1;
		const ref = (isLast && showBottomRef) || null;
		const content = `[${time}] ${message}`;
		return (
			<MessageDiv key={id} ref={ref}>
				{content}
			</MessageDiv>
		);
	});

	useEffect(showBottomAuto, [messagesList]);

	return <MessagesDiv>{messagesList}</MessagesDiv>;
};

export default Messages;
