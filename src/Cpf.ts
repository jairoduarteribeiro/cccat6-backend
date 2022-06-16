export default class Cpf {
  readonly value: string;

  constructor(value: string) {
    this.value = this.removeSymbols(value);
  }

  private removeSymbols(cpf: string) {
    return cpf.replace(/[.-]/g, '');
  }
}
