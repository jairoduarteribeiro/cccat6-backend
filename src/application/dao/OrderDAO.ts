export default interface OrderDAO {
  getByCode(code: string): Promise<OrderData>;
  getAll(): Promise<OrderData[]>;
}

export type OrderData = {
  orderCode: string;
  total: number;
};
