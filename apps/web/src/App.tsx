import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Button } from '@nx-hybrid-platform/ui-components';
import { ApiClient } from '@nx-hybrid-platform/api-client';

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5000,
    },
  },
});

// Create API client instance
const apiClient = new ApiClient(
  import.meta.env.VITE_API_URL || 'http://localhost:3000'
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
            Web Application
          </h1>
          <p className="text-center text-gray-600 mb-6">
            React + Vite + React Query
          </p>
          <Button apiClient={apiClient} source="web" />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
