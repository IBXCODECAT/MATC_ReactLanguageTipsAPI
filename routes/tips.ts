import { Router, Request, Response } from "express";
import { HTTP_HEADER_NAMES, HTTP_STATUS_CODES } from "../resources/constants";
import * as tipsData from './../resources/tips.json';


const tipsRouter: Router = Router();

tipsRouter.get("/", (req: Request, res: Response) => {

    res.setHeader(HTTP_HEADER_NAMES.ALLOW, 'GET'); //Tell client valid request methods for this route
    res.setHeader(HTTP_HEADER_NAMES.CONTENT_TYPE, 'application/raw'); //Set the content type to json
    res.setHeader(HTTP_HEADER_NAMES.CACHE_CONTROL, 'public, maxAge=3600'); //HTTP 1.1
    res.setHeader(HTTP_HEADER_NAMES.LAST_MODIFIED, new Date(1696523590).toUTCString()); //last modified now

    res.status(HTTP_STATUS_CODES.OK); //Set the status code

    const tip = tipsData.tips[Math.floor(Math.random() * tipsData.tips.length)];

    res.json(tip);

    res.send();
});

tipsRouter.all("/", (req: Request, res: Response) => {
    res.setHeader(HTTP_HEADER_NAMES.ALLOW, 'GET'); //Tell client valid request methods for this route
    res.setHeader(HTTP_HEADER_NAMES.CONTENT_TYPE, 'empty'); //Set the content type to empty
    res.setHeader(HTTP_HEADER_NAMES.CACHE_CONTROL, 'private, no-cache, no-store, must-revalidate'); //HTTP 1.1
    res.setHeader(HTTP_HEADER_NAMES.LAST_MODIFIED, new Date().toUTCString()); //last modified now

    res.status(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED); //Set the status code

    res.send();
});

tipsRouter.get("/:id", (req: Request, res: Response): void => {
    res.setHeader(HTTP_HEADER_NAMES.ALLOW, 'GET'); //Tell client valid request methods for this route
    res.setHeader(HTTP_HEADER_NAMES.CONTENT_TYPE, 'application/raw'); //Set the content type to json
    res.setHeader(HTTP_HEADER_NAMES.LAST_MODIFIED, new Date(1696523590).toUTCString()); //last modified now

    res.status(HTTP_STATUS_CODES.OK); //Set the status code

    //Parse the id from the request into a base 10 integer
    const tip = tipsData.tips[parseInt(req.params.id, 10) - 1];

    if (tip == null) {
        res.setHeader(HTTP_HEADER_NAMES.CACHE_CONTROL, 'private, no-cache, no-store, must-revalidate'); //HTTP 1.1
        res.status(HTTP_STATUS_CODES.NOT_FOUND);
        res.send();
    }
    else {
        res.setHeader(HTTP_HEADER_NAMES.CACHE_CONTROL, 'public, maxAge=3600'); //HTTP 1.1
        res.json(tip);
        res.send();
    }
});

tipsRouter.all("/:id", (req: Request, res: Response) => {
    res.setHeader(HTTP_HEADER_NAMES.ALLOW, 'GET'); //Tell client valid request methods for this route
    res.setHeader(HTTP_HEADER_NAMES.CONTENT_TYPE, 'empty'); //Set the content type to empty
    res.setHeader(HTTP_HEADER_NAMES.CACHE_CONTROL, 'private, no-cache, no-store, must-revalidate'); //HTTP 1.1
    res.setHeader(HTTP_HEADER_NAMES.LAST_MODIFIED, new Date().toUTCString()); //last modified now

    res.status(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED); //Set the status code

    res.send();
});

export default tipsRouter;