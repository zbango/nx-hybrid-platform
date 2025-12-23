export interface ApiRequest {
  message: string;
  timestamp: number;
  source: 'web' | 'desktop';
}
