import { createGlobalStyle, css } from 'styled-components';

const Normalize = createGlobalStyle`
  ${({ theme: { colors } }) =>
		css`
			color: ${colors.black};
		`}
  .App {
    font-family: 'IBM Plex Sans KR', sans-serif;
  }
`;

export default Normalize;
