
export interface IFinanceRecord {
    id: string;
    label: string;
    type: 'Entrada' | 'Saída' | '';
    incomeType?: string;
    outcomeType?: string;
    date: string;
    value: string;
}