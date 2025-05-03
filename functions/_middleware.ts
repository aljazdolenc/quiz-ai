import { corsMiddleware } from './middleware/cors.middleware';
import { optionsMiddleware } from './middleware/options.middleware';
import {errorMiddleware} from "./middleware/error.middleware";

export const onRequest = [
    errorMiddleware,
    corsMiddleware,
    optionsMiddleware,
];
