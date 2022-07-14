import Connection from './Connection';
import pgp from 'pg-promise';

export default class PgPromiseConnectionAdapter implements Connection {
  private pgp: any;
  private static instance?: Connection;

  private constructor() {
    const host = process.env.HOST;
    const port = process.env.PORT;
    const database = process.env.DBNAME;
    const user = process.env.USERNAME;
    const password = process.env.PASSWORD;
    this.pgp = pgp()({
      connectionString: `postgres://${user}:${password}@${host}:${port}/${database}`,
      allowExitOnIdle: true,
    });
  }

  static getInstance(): Connection {
    if (!this.instance) this.instance = new PgPromiseConnectionAdapter();
    return this.instance;
  }

  query(statement: string, params: any[]): Promise<any> {
    return this.pgp.query(statement, params);
  }
}
