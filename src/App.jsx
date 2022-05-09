import { ThemeProvider } from 'styled-components';
import theme from 'Styles/theme';
import Reset from 'Styles/Reset';
import Normalize from 'Styles/Normalize';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VendingMachine from 'Components/VendingMachine';
import NotFound from 'Components/NotFound';

const App = () => {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Reset />
				<Normalize />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<VendingMachine />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
};

export default App;
