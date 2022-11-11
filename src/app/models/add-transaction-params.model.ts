export interface AddTransactionParams {
  amount: number;
  income: boolean;
  currency: string;
  categoryId: string;
  accountId: string;
  userId?: string;
  description: string;
  createdAt: number;
}
