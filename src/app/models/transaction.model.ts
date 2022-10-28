export interface Transaction {
  uid: string;
  title: string;
  description: string;
  amount: number;
  createdAt: Date;
  userId: string;
  category: string;
}
