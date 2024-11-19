import { MockApi } from "./MockApi";

export function getUserAccount() {
  const result = MockApi.map(({ account }) => ({
    accountId: account.accountId,
    balance: account.balance,
    currency: account.currency,
    status: account.status,
  }));
  return result;
}

export function getUserCards() {
  const result = MockApi.flatMap(({ account }) =>
    account.cards.map(
      ({
        name,
        cardId,
        securityCode,
        cardNumber,
        holder,
        expirationDate,
        brand,
        favorite,
        used,
      }) => ({
        name,
        cardId,
        securityCode,
        cardNumber,
        holder,
        expirationDate,
        brand,
        favorite,
        used,
      })
    )
  );
  return result;
}
