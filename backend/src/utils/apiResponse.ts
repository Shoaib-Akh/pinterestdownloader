import { Response } from 'express';

export function successResponse(
  res: Response,
  data: any,
  messageOrStatusCode?: string | number,
  statusCode = 200
) {
  let message: string | undefined;
  let code = statusCode;

  if (typeof messageOrStatusCode === 'number') {
    code = messageOrStatusCode;
  } else if (typeof messageOrStatusCode === 'string') {
    message = messageOrStatusCode;
  }

  const payload: Record<string, any> = {
    success: true,
  };

  if (message) {
    payload.message = message;
  }

  if (data !== null && data !== undefined) {
    if (typeof data === 'object' && !Array.isArray(data)) {
      Object.assign(payload, data);
    } else {
      payload.data = data;
    }
  }

  return res.status(code).json(payload);
}

export function errorResponse(res: Response, message: string, statusCode = 400) {
  return res.status(statusCode).json({
    success: false,
    error: message,
  });
}
