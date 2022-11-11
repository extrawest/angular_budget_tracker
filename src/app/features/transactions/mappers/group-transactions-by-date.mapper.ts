import { Dictionary } from '@ngrx/entity';
import { DateTime } from 'luxon';

import { Transaction } from '../../../models/transaction.model';

export interface TransactionGroup {
  date: string;
  transactions: Transaction[];
}

export function groupTransactionsByDate(transactions: Transaction[]): TransactionGroup[] {
  const groupedTransactions: Dictionary<Transaction[]> = {};

  for (const transaction of transactions) {
    const date = DateTime.fromMillis(transaction.createdAt).toISODate();

    if (!groupedTransactions.hasOwnProperty(date)) {
      groupedTransactions[date] = [];
    }

    groupedTransactions[date].unshift(transaction);
  }

  return Object.keys(groupedTransactions)
    .reverse()
    .map((date) => {
      return {
        date: DateTime.fromISO(date).toRelativeCalendar(),
        transactions: groupedTransactions[date],
      };
    });
}
