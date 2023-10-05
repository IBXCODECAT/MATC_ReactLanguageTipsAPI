import express, { Request, Response, Express } from 'express';
import { config } from 'dotenv';

config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    
    

    // Send the response
    res.json({"message": "Hello World!"})
    
    res.send();
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});