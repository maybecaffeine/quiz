import { ThemeProvider } from 'styled-components';

import Main from './components/Main';
import QuizProvider from './context/QuizProvider';
import { GlobalStyles } from './styles/Global';
import { themes } from './styles/Theme';

function App() {
  const theme = themes.light; // Always use the light theme

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QuizProvider>
        <Main />
      </QuizProvider>
    </ThemeProvider>
  );
}

export default App;
