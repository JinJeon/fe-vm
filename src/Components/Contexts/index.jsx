import React from 'react';

import { CoinsContext, CoinsProvider } from 'Components/Contexts/CoinsContext';
import {
	MessagesContext,
	MessagesDispatchContext,
	MessagesProvider,
} from 'Components/Contexts/MessagesContext';
import { ItemsContext, ItemsProvider } from './ItemsContext';
import { ShowedMoneyContext, ShowedMoneyProvider } from './ShowedMoneyContext';
import { MoneyContext, MoneyProvider } from './moneyContext';
import { IsTakingOutContext, IsTakingOutProvider } from './IsTakingOutContext';

const providersArr = [
	ItemsProvider,
	CoinsProvider,
	MessagesProvider,
	MoneyProvider,
	ShowedMoneyProvider,
	IsTakingOutProvider,
];

const getContextsProvider =
	(providers) =>
	({ inner }) =>
		providers.reduce(
			(prev, provider) => React.createElement(provider, { inner: prev }),
			inner
		);

const ContextsProvider = getContextsProvider(providersArr);

export {
	ItemsContext,
	CoinsContext,
	MessagesContext,
	MoneyContext,
	ShowedMoneyContext,
	IsTakingOutContext,
	MessagesDispatchContext,
	ContextsProvider,
};
