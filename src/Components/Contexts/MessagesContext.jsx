import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const MessagesContext = createContext({});

const MessagesProvider = ({ inner }) => {
	const [messages, setMessages] = useState([]);

	const value = useMemo(() => {
		return { messages, setMessages };
	}, [messages, setMessages]);

	return (
		<MessagesContext.Provider value={value}>{inner}</MessagesContext.Provider>
	);
};

MessagesProvider.propTypes = {
	inner: PropTypes.node.isRequired,
};

export { MessagesContext, MessagesProvider };
