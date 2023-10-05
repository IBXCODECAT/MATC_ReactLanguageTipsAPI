import express, { Request, Response, Express } from 'express';
import { config } from 'dotenv';
import { HTTP_HEADER_NAMES, HTTP_STATUS_CODES } from './resources/constants';

config();

const app: Express = express();
const port = process.env.PORT;

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