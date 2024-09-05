import MockAdapter from 'axios-mock-adapter';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

import api from './api';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

describe('API Service', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(api);
    mockAsyncStorage.clear();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should attach token to request headers if token is available', async () => {
    const token = 'test-token';
    await mockAsyncStorage.setItem('token', token);

    mockAxios.onGet('/test').reply(200, { data: 'test data' });

    const response = await api.get('/test');

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ data: 'test data' });

    const requestHeaders = mockAxios.history.get[0].headers;
    expect(requestHeaders?.Authorization).toBe(`Bearer ${token}`);
  });

  it('should not attach Authorization header if token is not available', async () => {
    mockAxios.onGet('/test').reply(200, { data: 'test data' });

    const response = await api.get('/test');

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ data: 'test data' });

    const requestHeaders = mockAxios.history.get[0].headers;
    expect(requestHeaders?.Authorization).toBeUndefined();
  });

  it('should handle request errors', async () => {
    mockAxios.onGet('/test').reply(500);

    await expect(api.get('/test')).rejects.toThrow('Request failed with status code 500');
  });
});
