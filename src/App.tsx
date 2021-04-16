import { CssBaseline } from '@material-ui/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import './App.css';
import { WeatherInfo } from 'pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <WeatherInfo />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
