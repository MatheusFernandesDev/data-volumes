export const convertRealCurrency = (valor: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

export const validateCpfOrCnpj = (input: string) => {
  const numbers = input.replace(/\D/g, '');

  const calculeDigit = (
    base: string | string[],
    pesoInicial: number,
    maxPeso: number,
  ) => {
    let soma = 0;
    for (let i = 0; i < base.length; i++) {
      soma += parseInt(base[i], 10) * pesoInicial--;
      if (pesoInicial < 2) {
        pesoInicial = maxPeso;
      }
    }
    const rest = soma % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  if (numbers.length === 11 && !/^(\d)\1+$/.test(numbers)) {
    const baseCpf = numbers.slice(0, 9);
    const digit1 = calculeDigit(baseCpf, 10, 10);
    const digit2 = calculeDigit(baseCpf + digit1, 11, 11);
    return numbers === baseCpf + digit1 + digit2;
  }

  if (numbers.length === 14 && !/^(\d)\1+$/.test(numbers)) {
    const baseCnpj = numbers.slice(0, 12);
    const digit1 = calculeDigit(baseCnpj, 5, 9);
    const digit2 = calculeDigit(baseCnpj + digit1, 6, 9);
    return numbers === baseCnpj + digit1 + digit2;
  }

  return false;
};

export const validateInstallments = (
  vlTotal: number,
  qtPrestacoes: number,
  vlPresta: number,
) => {
  const vlPrestaTotal = vlTotal / qtPrestacoes;
  return vlPrestaTotal === vlPresta;
};
