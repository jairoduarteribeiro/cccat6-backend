import Http from './Http';
import express, { Express, Request, Response } from 'express';

type Method = 'get' | 'post';

export default class ExpressAdapter implements Http {
  app: Express;

  constructor() {
    this.app = express();
  }

  on(method: Method, url: string, callback: Function) {
    this.app[method](url, async (req: Request, res: Response) => {
      const output = await callback(req.params, req.body);
      res.send(output);
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => console.log(`Listening on port ${port}...`));
  }
}
