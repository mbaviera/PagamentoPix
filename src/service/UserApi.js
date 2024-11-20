import { MockApi } from "./MockApi";

//funcao para listar os dados da conta do usuario do mock JSON
export function getUserAccount() {
  const result = MockApi.map(({ account }) => ({
    accountId: account.accountId,
    balance: account.balance,
    currency: account.currency,
    status: account.status,
  }));
  return result;
}

//funcao para listar os cartoes de credito do usuario do mock JSON
export const getUserCards = () => {
  return MockApi.flatMap(
    (apiItem) =>
      apiItem.account?.cards.map((card) => ({
        cardId: card.cardId,
        name: card.name,
        securityCode: card.securityCode,
        cardNumber: card.cardNumber,
        holder: card.holder,
        expirationDate: card.expirationDate,
        brand: card.brand,
        favorite: card.favorite,
        used: card.used,
      })) || []
  );
};

//funcao para listar as informacoes do pagamento do mock JSON
export const getPaymentInfo = () => {
  return MockApi.map((apiItem) => ({
    transactionId: apiItem.payment?.transactionId || null,
    amount: apiItem.payment?.amount || null,
    currency: apiItem.payment?.currency || null,
    receiver: apiItem.payment?.receiver
      ? {
          name: apiItem.payment.receiver.name,
          id: apiItem.payment.receiver.id,
        }
      : null,
    method: apiItem.payment?.method || null,
  }));
};

//funcao para listar as simulações do pagamento do mock JSON
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
