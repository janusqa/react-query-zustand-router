import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routing/routes';

const queryClient = new QueryClient({
    // we can override default options here or per query
    // one of the popular ones to override per query is staleTime
    defaultOptions: {
        queries: {
            retry: 3,
            cacheTime: 1000 * 60 * 5, // default 5 mins
            staleTime: 1000 * 10, // 10 seconds
            refetchOnWindowFocus: true, //  default true
            refetchOnReconnect: true, // default true
            refetchOnMount: true, // default true
        },
    },
});

// Routing!!!!
// Instead of mounting the App component, we render the RouterProvider
// which will render all our routes inclusive of the app component
// the provider gets its router from route.tsx where the routes on
// which components to load are defined.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>
);
