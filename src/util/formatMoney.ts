const formatMoney = (value: string | number, withUnit = false): string => {
  const valueNumber = typeof value === 'string' ? parseFloat(value) : value;

  const money = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(valueNumber);

  return withUnit ? money : money.replace('R$', '');
};

export default formatMoney;
