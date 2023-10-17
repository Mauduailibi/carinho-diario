export async function getZodiacSign(birthday: string) {
  // Divide a data em dia, mês e ano
  const dateSplit = birthday.split('-');
  const day = parseInt(dateSplit[0]);
  const month = parseInt(dateSplit[1]);

  // Determina o signo com base no dia e mês
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return 'aries';
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return 'taurus';
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return 'gemini';
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return 'cancer';
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return 'leo';
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return 'virgo';
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return 'libra';
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return 'scorpio';
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return 'sagittarius';
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return 'capricorn';
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return 'aquarius';
  } else {
    return 'pisces';
  }
}

export async function getPortugueseSign(enSign: string) {
  switch (enSign) {
    case 'aries':
      return 'Áries';
    case 'taurus':
      return 'Touro';
    case 'gemini':
      return 'Gêmeos';
    case 'cancer':
      return 'Câncer';
    case 'leo':
      return 'Leão';
    case 'virgo':
      return 'Virgem';
    case 'libra':
      return 'Libra';
    case 'scorpio':
      return 'Escorpião';
    case 'sagittarius':
      return 'Sagitário';
    case 'capricorn':
      return 'Capricórnio';
    case 'aquarius':
      return 'Aquário';
    case 'pisces':
      return 'Peixes';
    default:
      return 'Signo não encontrado';
  }
}
