import type { ApiRequest } from './api-request';

export interface ApiResponse {
  success: boolean;
  data: ApiRequest;
  receivedAt: string;
}
