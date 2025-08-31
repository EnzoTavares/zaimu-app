// file: 'src/utils/format.ts'
export function formatNumberPTBR(value: number, digits: number = 2) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    }).format(value);
}

export function formatCurrencyBRL(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}
