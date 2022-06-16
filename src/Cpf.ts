export default class Cpf {
  readonly value: string;

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid Cpf');
    this.value = this.removeSymbols(value);
  }

  private validate(cpf: string) {
    if (!this.hasValidFormat(cpf)) return false;
    return true;
  }

  private hasValidFormat(cpf: string) {
    const cpfRegex = /^(\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/;
    return cpfRegex.exec(cpf) !== null;
  }

  private removeSymbols(cpf: string) {
    return cpf.replace(/[.-]/g, '');
  }
}
