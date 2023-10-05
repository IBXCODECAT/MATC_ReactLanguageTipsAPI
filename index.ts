import express, { Request, Response, Express } from 'express';
import ratelimiter from 'express-rate-limit';
import helmet from 'helmet';
import { config } from 'dotenv';
import { HTTP_HEADER_NAMES, HTTP_STATUS_CODES } from './resources/constants';

import tipsRouter from './routes/tips';

config();

const app: Express = express();
const port = process.env.PORT;

//Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Security middleware
app.use(helmet()); //Apply helmet middleware to secure the app

//Set global rate limit to 30 requests per minute per client
app.use(ratelimiter({ limit: 60, windowMs: 60 * 1000 }));

//Error Handling middleware
app.use((err: Error, req: Request, res: Response, next: Function): void => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//Routers
app.use('/tips', tipsRouter);


//Handle get requests to the root of the server to act as a health check - returns no content
app.get('/', (req: Request, res: Response) => {
    res.setHeader(HTTP_HEADER_NAMES.ALLOW, 'GET'); //Tell client valid request methods for this route
    res.setHeader(HTTP_HEADER_NAMES.CONTENT_TYPE, 'empty'); //Set the content type to empty
    res.setHeader(HTTP_HEADER_NAMES.CACHE_CONTROL, 'private, no-cache, no-store, must-revalidate'); //HTTP 1.1
    res.setHeader(HTTP_HEADER_NAMES.LAST_MODIFIED, new Date().toUTCString()); //last modified now

    res.status(HTTP_STATUS_CODES.NO_CONTENT); //Set the status code

    res.send();
});

//Handle all other requests to the root of the server
app.all('/', (req: Request, res: Response) => {
    res.setHeader(HTTP_HEADER_NAMES.ALLOW, 'GET'); //Tell client valid request methods for this route
    res.setHeader(HTTP_HEADER_NAMES.CONTENT_TYPE, 'empty'); //Set the content type to empty
    res.setHeader(HTTP_HEADER_NAMES.CACHE_CONTROL, 'private, no-cache, no-store, must-revalidate'); //HTTP 1.1
    res.setHeader(HTTP_HEADER_NAMES.LAST_MODIFIED, new Date().toUTCString()); //last modified now

    res.status(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED); //Set the status code

    res.send();
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});