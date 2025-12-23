import { useMutation } from '@tanstack/react-query';
import type { ApiClient } from '@nx-hybrid-platform/api-client';
import type { ApiRequest } from '@nx-hybrid-platform/data-models';

interface ButtonProps {
  apiClient: ApiClient;
  source: 'web' | 'desktop';
}

export function Button({ apiClient, source }: ButtonProps) {
  const mutation = useMutation({
    mutationFn: (data: ApiRequest) => apiClient.sendMessage(data),
    onSuccess: (response) => {
      console.log('API response:', response);
    },
    onError: (error) => {
      console.error('API error:', error);
    },
  });

  const handleClick = () => {
    const message = `Hello from ${source}!`;
    const timestamp = Date.now();

    mutation.mutate({
      message,
      timestamp,
      source,
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <button
        onClick={handleClick}
        disabled={mutation.isPending}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {mutation.isPending ? 'Sending...' : 'Send Message to API'}
      </button>

      {mutation.isSuccess && (
        <div className="p-4 bg-green-100 border border-green-400 rounded-lg">
          <p className="text-green-800 font-semibold">Success!</p>
          <p className="text-sm text-green-700 mt-1">
            Received at: {mutation.data.receivedAt}
          </p>
          <pre className="text-xs text-green-700 mt-2 overflow-auto">
            {JSON.stringify(mutation.data.data, null, 2)}
          </pre>
        </div>
      )}

      {mutation.isError && (
        <div className="p-4 bg-red-100 border border-red-400 rounded-lg">
          <p className="text-red-800 font-semibold">Error!</p>
          <p className="text-sm text-red-700 mt-1">
            {mutation.error instanceof Error ? mutation.error.message : 'Unknown error'}
          </p>
        </div>
      )}
    </div>
  );
}
