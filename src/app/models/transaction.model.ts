import { Category } from './category.model';

export interface Transaction {
  uid: string;
  title: string;
  description: string;
  amount: number;
  createdAt: number;
  userId: string;
  category: Category;
}
