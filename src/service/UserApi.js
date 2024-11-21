import { MockApi } from "./MockApi";

//funcao auxiliar para validacao dos dados
const safeAccess = (object, path, defaultValue = null) =>
  path.reduce((acc, key) => (acc && acc[key] ? acc[key] : defaultValue), object);

//mapeador da conta do usuario
const mapAccountData = (account) => ({
  accountId: account?.accountId || null,
  balance: account?.balance || 0,
  currency: account?.currency || 'N/A',
  status: account?.status || 'Unknown',
});

//mapeador dos dados co cartao
const mapCardData = (card) => ({
  cardId: card?.cardId || null,
  name: card?.name || '',
  securityCode: card?.securityCode || '',
  cardNumber: card?.cardNumber || '',
  holder: card?.holder || '',
  expirationDate: card?.expirationDate || '',
  brand: card?.brand || '',
  favorite: card?.favorite || false,
  used: card?.used || false,
});

//mapeador dos dados de simulacao da trasnferencia
const mapSimulationData = (simulation) => ({
  amountToPay: simulation?.amountToPay || 0,
  installmentAmount: simulation?.installmentAmount || 0,
  installments: simulation?.installments || 0,
  fees: {
    fixedAmount: simulation?.fees?.fixed?.amount || 0,
    fixedPercentage: simulation?.fees?.fixed?.percentage || 0,
    installmentAmount: simulation?.fees?.installments?.amount || 0,
    installmentPercentage: simulation?.fees?.installments?.percentage || 0,
  },
});

//funcao para listar os dados da conta do usuario
export const getUserAccount = () => {
  return MockApi.map(({ account }) => mapAccountData(account));
};

//funcao para listar os dados dos cartoes de credito do usuario
export const getUserCards = () => {
  return MockApi.flatMap((apiItem) => apiItem.account?.cards.map(mapCardData) || []);
};

//funcao para listar os dados de simulacao das transferencias
export const getPaymentSimulationItems = () => {
  return MockApi.flatMap((apiItem) => apiItem.payment?.simulation.map(mapSimulationData) || []);
};

//funcao para listar os dados de pagamento 
export const getPaymentInfo = () => {
  return MockApi.map((apiItem) => ({
    transactionId: safeAccess(apiItem, ['payment', 'transactionId']),
    amount: safeAccess(apiItem, ['payment', 'amount']),
    currency: safeAccess(apiItem, ['payment', 'currency']),
    receiver: safeAccess(apiItem, ['payment', 'receiver'], {}),
    method: safeAccess(apiItem, ['payment', 'method']),
  }));
};

export const getPaymentInitialData = () => {
  const data = getPaymentInfo();
  return {
    amount: data[0]?.amount || null,
    name: data[0]?.receiver?.name || '',
  };
};