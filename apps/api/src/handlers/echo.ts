import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import type { ApiRequest, ApiResponse } from '@nx-hybrid-platform/data-models';

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  try {
    // Parse request body
    const requestBody: ApiRequest = JSON.parse(event.body || '{}');

    // Print to console (CloudWatch Logs)
    console.log('Received request:', JSON.stringify(requestBody, null, 2));

    // Echo back in response
    const response: ApiResponse = {
      success: true,
      data: requestBody,
      receivedAt: new Date().toISOString(),
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // CORS for web/desktop
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error('Error processing request:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
