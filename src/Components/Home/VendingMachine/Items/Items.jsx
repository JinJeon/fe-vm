import { useState, useEffect } from 'react';

import itemsApi from 'Service/itemsApi';
import Item from './Item';
import { ItemsWrapper, ItemsDiv, ItemDiv, TakingOutDiv } from './Items.styled';

const Items = () => {
	const [items, setItems] = useState([]);

	const fetchItems = async () => {
		const itemsData = await itemsApi.getItems();
		setItems(itemsData);
	};

	const getList = (array) => {
		const list = array.map((item) => <Item key={item.id} item={item} />);
		if (list.length % 2) list.push(<ItemDiv key={array.length} empty={true} />);
		return list;
	};

	const list = items.length ? getList(items) : null;

	useEffect(() => {
		fetchItems();
	}, []);

	return (
		<ItemsWrapper>
			<TakingOutDiv />
			<ItemsDiv>{list}</ItemsDiv>
		</ItemsWrapper>
	);
};

export default Items;
