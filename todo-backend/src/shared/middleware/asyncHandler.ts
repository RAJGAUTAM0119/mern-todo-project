import { NextFunction, Request, RequestHandler, Response } from "express"

/**
 * Wraps an async Express controller and forwards any rejected Promise
 * to Express's global error handler.
 *
 * This removes the need to write try/catch in every controller.
 *
 * @param controller Async Express request handler.
 * @returns Express middleware.
 */

export function asyncHandler(controller: RequestHandler): RequestHandler {

  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(controller(req, res, next)).catch(next)

  }
}
