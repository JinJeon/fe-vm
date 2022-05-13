import styled, { css } from 'styled-components';

const ControllersDiv = styled.div`
	width: 50%;
	padding: 10px;
	margin: 10px;
	width: 400px;
	flex: 1 1 0;
	display: flex;
	flex-direction: column;
	height: 100%;

	${({ theme: { colors } }) => css`
		border: 2px solid ${colors.black};
		border-radius: 10px;

		> div {
			margin: 15px;
			border-radius: 10px;
			background-color: ${colors.yellow};
		}
	`}
`;

export default ControllersDiv;
