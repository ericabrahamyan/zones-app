import { QueryClient, QueryClientProvider } from 'react-query';
import { Grid } from '@chakra-ui/react';

import Header from './components/Header';
import ZoneEditor from './components/ZoneEditor';
import ZoneList from './components/ZoneList';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Grid
        templateColumns={{ base: '1fr', md: '400px 1fr' }}
        height={`calc(100vh - 60px)`}
      >
        <ZoneEditor />
        <ZoneList />
      </Grid>
    </QueryClientProvider>
  );
};

export default App;
