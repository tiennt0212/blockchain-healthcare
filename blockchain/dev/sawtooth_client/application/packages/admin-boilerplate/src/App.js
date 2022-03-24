import { GlobalStyles } from 'components/Styles';
import { HelmetProvider } from 'react-helmet-async';

import Routes from './Routes';
import './theme.mix.less';
import './theme.dark.less';
import './theme.light.less';
import './App.less';

function App() {
  return (
    <HelmetProvider>
      <Routes />
      <GlobalStyles />
    </HelmetProvider>
  );
}

export default App;
