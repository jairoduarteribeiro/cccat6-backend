import Cpf from './Cpf';

export default class Order {
  private readonly cpf: Cpf;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
  }
}
