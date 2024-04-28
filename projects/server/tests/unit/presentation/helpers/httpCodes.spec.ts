import {
  badRequest,
  created,
  forbidden,
  internalServerError,
  notFound,
  ok,
  unauthorized,
} from '@/presentation/helpers/httpCodes';
import { IHttpResponse } from '@/presentation/protocols/Http';

describe('HTTP Codes', () => {
  test('It should return 200 OK', () => {
    const response: IHttpResponse = ok();
    expect(response.status).toBe(200);
    expect(response.body).toBe('');
  });

  test('It should return 200 OK with data', () => {
    const responseData = { message: 'Data received' };
    const response: IHttpResponse = ok(responseData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(responseData);
  });

  test('It should return 201 Created', () => {
    const response: IHttpResponse = created();
    expect(response.status).toBe(201);
    expect(response.body).toBe('');
  });

  test('It should return 201 Created with data', () => {
    const responseData = { id: '123', message: 'Resource created' };
    const response: IHttpResponse = created(responseData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(responseData);
  });

  test('It should return 400 Bad Request', () => {
    const error = { message: 'Invalid request' };
    const response: IHttpResponse = badRequest(error);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(error);
  });

  test('It should return 401 Unauthorized', () => {
    const response: IHttpResponse = unauthorized();
    expect(response.status).toBe(401);
    expect(response.body).toBeUndefined();
  });

  test('It should return 403 Forbidden', () => {
    const response: IHttpResponse = forbidden();
    expect(response.status).toBe(403);
    expect(response.body).toBeUndefined();
  });

  test('It should return 404 Not Found', () => {
    const response: IHttpResponse = notFound();
    expect(response.status).toBe(404);
    expect(response.body).toBeUndefined();
  });

  test('It should return 500 Internal Server Error', () => {
    const response: IHttpResponse = internalServerError();
    expect(response.status).toBe(500);
    expect(response.body).toBeUndefined();
  });
});
