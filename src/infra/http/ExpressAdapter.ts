import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import Http, { Method } from './Http';

export default class ExpressAdapter implements Http {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  async on(method: Method, url: string, callback: Function): Promise<void> {
    this.app[method](url, async (req: Request, res: Response) => {
      const output = await callback(req.params, req.body);
      res.send(output);
    });
  }

  async listen(port: number): Promise<void> {
    this.app.listen(port, () => console.log(`Server is running on port ${port}`));
  }
}
