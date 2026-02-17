// Algoritmo de Luhn para validação
function luhnCheck(cardNumber) {
    let sum = 0;
    let isEven = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}

// Identificar e validar bandeira do cartão
function validateCard(cardNumber) {
    // Remove espaços e caracteres especiais
    const cleanCard = cardNumber.replace(/\s+/g, '');

    // Verifica se contém apenas dígitos
    if (!/^\d+$/.test(cleanCard)) {
        return { valid: false, brand: 'Inválido', message: 'Cartão contém caracteres inválidos' };
    }

    // Valida Luhn
    if (!luhnCheck(cleanCard)) {
        return { valid: false, brand: 'Desconhecido', message: 'Falha na validação de Luhn' };
    }

    // VISA
    if (cleanCard[0] === '4' && [13, 16, 19].includes(cleanCard.length)) {
        return { valid: true, brand: 'VISA', message: 'Cartão válido' };
    }

    // MASTERCARD
    if (cleanCard.length === 16) {
        const prefix = cleanCard.substring(0, 2);
        const prefix4 = cleanCard.substring(0, 4);

        if ((prefix >= '51' && prefix <= '55') || (prefix4 >= '2221' && prefix4 <= '2720')) {
            return { valid: true, brand: 'MASTERCARD', message: 'Cartão válido' };
        }
    }

    // AMERICAN EXPRESS
    if (cleanCard.length === 15 && (cleanCard.substring(0, 2) === '34' || cleanCard.substring(0, 2) === '37')) {
        return { valid: true, brand: 'AMERICAN EXPRESS', message: 'Cartão válido' };
    }

    // HIPERCARD
    if (cleanCard.length === 16 && (cleanCard.substring(0, 4) === '6062' || cleanCard.substring(0, 4) === '3841')) {
        return { valid: true, brand: 'HIPERCARD', message: 'Cartão válido' };
    }

    // ELO
    const eloPrefixes = ['4011', '4312', '4389', '4514', '4576', '5041', '6277', '6362', '6363'];
    const eloRanges = [{ start: 5066, end: 5067 }, { start: 5090, end: 5090 }];
    const prefix4Elo = cleanCard.substring(0, 4);

    if ((eloPrefixes.includes(prefix4Elo) || eloRanges.some(r => parseInt(prefix4Elo) >= r.start && parseInt(prefix4Elo) <= r.end)) && [16, 17, 18, 19].includes(cleanCard.length)) {
        return { valid: true, brand: 'ELO', message: 'Cartão válido' };
    }

    return { valid: false, brand: 'Desconhecido', message: 'Bandeira não identificada ou dados inválidos' };
}


// Função para formatar resultado de forma legível
function formatarResultado(resultado) {
    console.log(`\nCartão: ${resultado.brand}`);
    console.log(`Status: ${resultado.valid ? '✓ Válido' : '✗ Inválido'}`);
    console.log(`Mensagem: ${resultado.message}\n`);
}

// Exemplos de uso
formatarResultado(validateCard('6062 8282 2691 6175'));
