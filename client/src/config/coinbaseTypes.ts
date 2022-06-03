export interface Account {
    id: string;
    name: string;
    primary: boolean;
    balance: Amount;
    native_balance: Amount;
}

interface Amount {
    amount: string,
    currency: string
}

// Interfaced shared between buys, sells, withdrawals and deposits
export interface Operation {
    id: string;
    status: "created" | "completed" | "cancelled";
    amount: Amount;
    created_at: string;
    updated_at: string;
    fee: Amount;
}

export interface Transaction {
    id: string;
    status: string;
    amount: Amount;
    native_amount: Amount;
    type: string;
    created_at: string;
    updated_at: string;
    details: { title: string, subtitle: string }
    fee: Amount;
}

export interface UserTransactions {
    buys: Operation[];
    sells: Operation[];
    withdrawals: Operation[];
    deposits: Operation[];
    transactions: Transaction[];
}
