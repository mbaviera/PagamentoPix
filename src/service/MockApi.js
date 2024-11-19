export const MockApi = [
{
  "account": {
      "accountId": "123456789",
      "balance": 2000.00,
      "currency": "BRL",
      "status": "active",
      "owner": {
          "name": "John Doe",
          "id": "987654321"
      },
      "cards": [
          {
              "cardId": "153455-15312313",
              "name": "Platinum",
              "securityCode": "***",
              "cardNumber": "**********181",
              "holder": "John Doer",
              "expirationDate": "12/2025",
              "brand": "Visa",
              "favorite": true,
              "used": true
          },
          {
              "cardId": "153455-15312313",
              "name": "NuCard",
              "securityCode": "***",
              "cardNumber": "**********222",
              "holder": "John Doe",
              "expirationDate": "08/2024",
              "brand": "Master",
              "favorite": false,
              "used": false
          }
      ]
  },
  "payment": {
      "transactionId": "abc123",
      "amount": 100.00,
      "currency": "BRL",
      "receiver": {
          "name": "Maria da Silca",
          "id": "45648941"
      },
      "method": "credit_card",
      "simulation": [
          {
              "amountToPay": 103.00,
              "installmentAmount": 103.00,
              "installments": 1,
              "fees": {
                  "fixed": {
                      "amount": 3.00,
                      "percentage": 0.03
                  },
                  "installments": {
                      "amount": 0.00,
                      "percentage": 0.01
                  }
              }
          },
          {
              "amountToPay": 106.00,
              "installmentAmount": 53.00,
              "installments": 2,
              "fees": {
                  "fixed": {
                      "amount": 3.00,
                      "percentage": 0.03
                  },
                  "installments": {
                      "amount": 3.00,
                      "percentage": 0.01
                  }
              }
          },
          {
              "amountToPay": 108.00,
              "installmentAmount": 36.00,
              "installments": 3,
              "fees": {
                  "fixed": {
                      "amount": 3.00,
                      "percentage": 0.03
                  },
                  "installments": {
                      "amount": 5.00,
                      "percentage": 0.01
                  }
              }
          },
          {
              "amountToPay": 110.00,
              "installmentAmount": 27.50,
              "installments": 4,
              "fees": {
                  "fixed": {
                      "amount": 3.00,
                      "percentage": 0.03
                  },
                  "installments": {
                      "amount": 7.00,
                      "percentage": 0.01
                  }
              }
          },
          {
              "amountToPay": 112.00,
              "installmentAmount": 22.40,
              "installments": 5,
              "fees": {
                  "fixed": {
                      "amount": 3.00,
                      "percentage": 0.03
                  },
                  "installments": {
                      "amount": 9.00,
                      "percentage": 0.01
                  }
              }
          },
          {
              "amountToPay": 114.00,
              "installmentAmount": 19.00,
              "installments": 6,
              "fees": {
                  "fixed": {
                      "amount": 3.00,
                      "percentage": 0.03
                  },
                  "installments": {
                      "amount": 11.00,
                      "percentage": 0.01
                  }
              }
          },
          {
              "amountToPay": 116.00,
              "installmentAmount": 16.57,
              "installments": 7,
              "fees": {
                  "fixed": {
                      "amount": 3.00,
                      "percentage": 0.03
                  },
                  "installments": {
                      "amount": 13.00,
                      "percentage": 0.01
                  }
              }
          },
          {
              "amountToPay": 118.00,
              "installmentAmount": 14.75,
              "installments": 8,
              "fees": {
                  "fixed": {
                      "amount": 3.00,
                      "percentage": 0.03
                  },
                  "installments": {
                      "amount": 15.00,
                      "percentage": 0.01
                  }
              }
          },
          {
              "amountToPay": 120.00,
              "installmentAmount": 13.33,
              "installments": 9,
              "fees": {
                  "fixed": {
                      "amount": 3.00,
                      "percentage": 0.03
                  },
                  "installments": {
                      "amount": 17.00,
                      "percentage": 0.01
                  }
              }
          },
          {
              "amountToPay": 122.00,
              "installmentAmount": 12.20,
              "installments": 10,
              "fees": {
                  "fixed": {
                      "amount": 3.00,
                      "percentage": 0.03
                  },
                  "installments": {
                      "amount": 19.00,
                      "percentage": 0.01
                  }
              }
          },
          {
              "amountToPay": 124.00,
              "installmentAmount": 11.27,
              "installments": 11,
              "fees": {
                  "fixed": {
                      "amount": 3.00,
                      "percentage": 0.03
                  },
                  "installments": {
                      "amount": 21.00,
                      "percentage": 0.01
                  }
              }
          },
          {
              "amountToPay": 126.00,
              "installmentAmount": 10.50,
              "installments": 12,
              "fees": {
                  "fixed": {
                      "amount": 3.00,
                      "percentage": 0.03
                  },
                  "installments": {
                      "amount": 23.00,
                      "percentage": 0.01
                  }
              }
          }
      ]
  }
}
]
