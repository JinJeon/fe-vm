import styled, { css } from 'styled-components';

const NavigatorDiv = styled.div`
	text-align: center;
	padding-top: 20px;
	overflow: auto;
	border-radius: 10px;
	> div {
		${({ theme: { colors, padding } }) => css`
			display: inline-block;
			padding: ${padding.small};
			border: solid 2px ${colors.black};
			:first-child {
				border-radius: 10px 0 0 10px;
			}
			:last-child {
				border-radius: 0 10px 10px 0;
			}
			:not(:last-child) {
				border-right: 0;
			}
		`}
	}
`;

const VendingMachine = () => {
	return (
		<NavigatorDiv>
			<div>자판기</div>
			<div>지갑</div>
		</NavigatorDiv>
	);
};

export default VendingMachine;
