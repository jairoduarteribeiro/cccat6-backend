export default interface Http {
  on(method: Method, url: string, callback: Function): Promise<void>;
  listen(port: number): Promise<void>;
}

export type Method = 'get' | 'post';
