import * as redis from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible"
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/erros/AppError";

const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    }
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 10,
  duration: 1,
});

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {

        await redisClient.connect();
        await limiter.consume(request.ip);

        return next();
    } catch (err) {
        throw new AppError("Too many request", 429);        
    }
};