import transaction from "@/src/constants/texts/inputs/Transaction";

export enum Category {
    "Super mercado" = 1,
    "Viagem" = 2,
    "Restaurante" = 3,
    "Transporte" = 4,
    "Educação" = 5,
    "Saúde" = 6,
    "Lazer" = 7,
    "Moradia" = 8,
    "Serviços" = 9,
    "Assinaturas" = 10,
    "Outros" = 11,
}

export const categoryDropdownData = Object.entries(Category)
    .filter(([key, value]) => typeof value === "number")
    .map(([label, value]) => ({
        label,
        value: value.toString(),
    }));
