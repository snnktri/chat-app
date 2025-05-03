import { Request, Response, NextFunction } from 'express';

type RequestHandlerType = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

export const asyncHandler = (requestHandler: RequestHandlerType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err: any) => next(err));
    }
}