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

export const getUserCards = () => {
    return MockApi.flatMap(apiItem => 
      apiItem.account?.cards.map(card => ({
        cardId: card.cardId,
        name: card.name,
        securityCode: card.securityCode,
        cardNumber: card.cardNumber,
        holder: card.holder,
        expirationDate: card.expirationDate,
        brand: card.brand,
        favorite: card.favorite,
        used: card.used
      })) || []
    );
  };

export const getPaymentSimulationItems = () => {
  return MockApi.flatMap(
    (apiItem) =>
      apiItem.payment?.simulation.map((simulation) => ({
        amountToPay: simulation.amountToPay,
        installmentAmount: simulation.installmentAmount,
        installments: simulation.installments,
        fees: {
          fixedAmount: simulation.fees.fixed.amount,
          fixedPercentage: simulation.fees.fixed.percentage,
          installmentAmount: simulation.fees.installments.amount,
          installmentPercentage: simulation.fees.installments.percentage,
        },
      })) || []
  );
};
