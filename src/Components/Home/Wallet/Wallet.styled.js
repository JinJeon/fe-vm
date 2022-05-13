import styled, { css } from 'styled-components';

const WalletDiv = styled.div`
	${({ theme: { colors } }) => css`
		font-size: 20px;
		margin: 0 auto;
		width: 60%;
		margin-top: 50px;
		padding: 20px;
		border: 2px solid ${colors.black};
		border-radius: 10px;
	`}
`;

const CoinDiv = styled.div`
	${({ theme: colors }) => css`
		display: flex;
		justify-content: center;
		:not(:last-child) {
			margin-bottom: 2px;
		}
		> div {
			width: 90px;
			height: 70px;
			line-height: 70px;
			border: 2px solid ${colors.black};
			border-radius: 10px;
			margin: 5px;
		}
	`}
`;

const CoinCountDiv = styled.div``;

export { WalletDiv, CoinDiv, CoinCountDiv };
