export interface Transaction {
  uid: string;
  amount: number;
  currency: string;
  description: string;
  createdAt: number;
  accountId: number;
  categoryId: string;
  userId: string;
}
