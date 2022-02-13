/* eslint-disable */
import { ChakraProvider, theme } from '@chakra-ui/react';
import { render, RenderOptions } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
      cacheTime: 0,
    },
  },
});

const TestWrapper = ({ children }: { children?: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>{children}</BrowserRouter>
    </ChakraProvider>
  </QueryClientProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: TestWrapper, ...options });

export { customRender as render, TestWrapper };
