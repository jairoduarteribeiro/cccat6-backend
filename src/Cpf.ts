export default class Cpf {
  readonly value: string;
  private readonly FACTOR_DIGIT_1 = 10;
  private readonly FACTOR_DIGIT_2 = 11;

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid Cpf');
    this.value = this.removeSymbols(value);
  }

  private validate(cpf: string) {
    if (!this.hasValidFormat(cpf)) return false;
    cpf = this.removeSymbols(cpf);
    if (this.isBlocked(cpf)) return false;
    const digit1 = this.calculateCheckDigit(cpf, this.FACTOR_DIGIT_1);
    const digit2 = this.calculateCheckDigit(cpf, this.FACTOR_DIGIT_2);
    const checkDigits = this.extractCheckDigits(cpf);
    return checkDigits === `${digit1}${digit2}`;
  }

  private hasValidFormat(cpf: string) {
    const cpfRegex = /^(\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/;
    return cpfRegex.exec(cpf) !== null;
  }

  private removeSymbols(cpf: string) {
    return cpf.replace(/[.-]/g, '');
  }

  private isBlocked(cpf: string) {
    const digits = [...cpf];
    const [firstDigit] = digits;
    return digits.every((digit) => digit === firstDigit);
  }

  private calculateCheckDigit(cpf: string, factor: number) {
    const digits = [...cpf].map((digit) => parseInt(digit));
    let total = 0;
    for (const digit of digits) {
      total += digit * factor--;
      if (factor < 2) break;
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  private extractCheckDigits(cpf: string) {
    return cpf.slice(-2);
  }
}
