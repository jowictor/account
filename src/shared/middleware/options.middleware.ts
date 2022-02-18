import { Request, Response, NextFunction } from 'express';

export function OptionsInterceptor(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin ? String(req.headers.origin) : '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT, PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Authorization, X-Requested-With, Content-Type, Accept, Charset, X-Auth-Token',
  );
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
}
