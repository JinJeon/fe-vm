import { ThemeProvider } from 'styled-components';
import theme from 'Styles/theme';
import Reset from 'Styles/Reset';
import Normalize from 'Styles/Normalize';
import VendingMachine from 'Components/VendingMachine';

const App = () => {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Reset />
				<Normalize />
				<VendingMachine />
			</ThemeProvider>
		</div>
	);
};

export default App;
