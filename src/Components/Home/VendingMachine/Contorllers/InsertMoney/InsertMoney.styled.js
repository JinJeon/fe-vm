import styled, { css } from 'styled-components';

const InsertMoneyDiv = styled.div`
	${({ theme: { colors } }) => css`
		margin: 15px;
		border-radius: 20px;
		border: 2px solid ${colors.black};
		background-color: ${colors.yellow};
	`}

	padding: 20px;
	font-size: 20px;
	display: flex;
	align-items: center;
`;

const InsertMoneyValue = styled.input`
	width: 90%;
	text-align: right;
	outline: none;
	border: none;
	font-size: 20px;
	${({ theme: { colors } }) => css`
		background-color: ${colors.yellow};
	`}
`;

const BtnsDiv = styled.div`
	display: flex;
	justify-content: space-between;
	> div {
		flex-basis: 50%;
	}
`;

const InsertBtnDiv = styled.div`
	${({ theme: { colors }, isTakingOut }) => css`
		cursor: ${!isTakingOut ? 'pointer' : 'not-allowed'};
		margin: 15px;
		border-radius: 20px;
		border: 2px solid ${colors.black};
		background-color: ${colors.lightGreen};
		padding: 20px;
		font-size: 20px;
		:hover {
			background-color: ${colors.green};
		}
	`}
`;

const WithdrawBtnDiv = styled.div`
	${({ theme: { colors }, isTakingOut }) => css`
		cursor: ${!isTakingOut ? 'pointer' : 'not-allowed'};
		margin: 15px;
		border-radius: 20px;
		border: 2px solid ${colors.black};
		background-color: ${colors.lightRed};
		padding: 20px;
		font-size: 20px;
		:hover {
			background-color: ${colors.red};
		}
	`}
`;

export {
	InsertMoneyDiv,
	InsertMoneyValue,
	BtnsDiv,
	InsertBtnDiv,
	WithdrawBtnDiv,
};
