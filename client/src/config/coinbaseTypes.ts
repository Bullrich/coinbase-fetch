export interface Account {
    id: string;
    name: string;
    primary: boolean;
    balance: { amount: string, currency: string };
    native_balance: { amount: string, currency: string };
}
