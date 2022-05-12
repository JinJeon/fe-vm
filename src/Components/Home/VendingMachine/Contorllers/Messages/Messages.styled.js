import styled, { css } from 'styled-components';

const MessagesDiv = styled.div`
	padding: 20px;
	flex-grow: 1;
	text-align: left;
	${({ theme: { colors } }) => css`
		background-color: ${colors.yellow};
	`}
`;

export default MessagesDiv;
