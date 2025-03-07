import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.message === 'Unrecognized operation undefined') {
    return res.status(400).json({ error: 'Unrecognized operation' });
  }

  res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;
