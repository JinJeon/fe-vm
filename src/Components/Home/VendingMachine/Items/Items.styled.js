import styled, { css } from 'styled-components';

const ItemsWrapper = styled.div`
	position: relative;
	width: 50%;
`;

const ItemsDiv = styled.div`
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	padding: 10px;
	margin: 10px;
	flex: 1 1 0;
	${({ theme: { colors } }) => css`
		border-radius: 10px;
		border: 2px solid ${colors.black};
	`}
`;

const ItemDiv = styled.div`
	align-content: flex-start;
	flex-basis: 35%;
	margin: 10px;
	padding: 10px;

	${({ theme: { colors }, empty }) =>
		!empty &&
		css`
			border: 2px solid ${colors.black};
			border-radius: 10px;
		`};

	${({ theme: { colors }, isSelectable }) =>
		isSelectable &&
		css`
			border: 2px solid ${colors.green};
			color: ${colors.green};
			cursor: pointer;
			:hover {
				background-color: ${colors.green};
				color: ${colors.white};
			}
		`}

	${({ theme: { colors }, count }) =>
		count === 0 &&
		css`
			cursor: not-allowed;
			border: ${colors.red} 2px solid;
			color: ${colors.red};
			:hover {
				color: ${colors.white};
				background-color: ${colors.red};
			}
		`}
`;

const ItemNameDiv = styled.div`
	margin: 2px;
`;

const ItmePriceDiv = styled.div`
	padding: 2px;
`;

const TakingOutDiv = styled.div`
	${({ theme: { colors } }) => css`
		/* visibility: hidden; */
		box-sizing: border-box;
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 70%;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: ${colors.yellow};
		font-size: 25px;
		background-color: ${colors.black};}
	`}
`;

const Loading = styled.div`
	${({ theme: { colors } }) => css`
		position: relative;
		width: 100%;
		height: 100%;
		margin-top: 20px;

		div {
			margin: 0 auto;
			border: 10px solid orange;
			border-radius: 50%;
			border-color: ${colors.yellow} transparent transparent transparent;
			width: 50px;
			height: 50px;
			animation: spinning 1s infinite;
		}

		@keyframes spinning {
			from {
				transform: rotate(0);
			}
			to {
				transform: rotate(360deg);
			}
		}
	`}
`;

export {
	ItemsWrapper,
	ItemsDiv,
	ItemDiv,
	ItemNameDiv,
	ItmePriceDiv,
	TakingOutDiv,
	Loading,
};
