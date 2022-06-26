import Connection from './Connection';
import pgp from 'pg-promise';

export default class PgPromiseConnectionAdapter implements Connection {
  private pgp: any;
  private static instance = new PgPromiseConnectionAdapter();

  private constructor() {
    this.pgp = pgp()({
      host: 'localhost',
      port: 5432,
      database: 'cccat6_test',
      user: 'postgres',
      password: '123456',
      allowExitOnIdle: true,
    });
  }

  static getInstance(): Connection {
    return this.instance;
  }

  query(statement: string, params: any[]): Promise<any> {
    return this.pgp.query(statement, params);
  }
}
