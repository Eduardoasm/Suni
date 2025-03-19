const axios = require('axios');

/**
 * function to search wallet in the wallet services from WAU
 * @param {Object} transaction props transaction
 * @param {string} transaction.contract _id contract of transaction
 * @param {string} transaction.from user from of payment transaction
 * @param {string} transaction.to user to of payment transaction
 * @param {number} transaction.amount amount of payment transaction
 * @param {number} transaction.lenderFee lender fee of transaction
 * @param {number} transaction.borrowerFee borrower fee of transaction
 * @param {number} transaction.interest borrower interest of transaction
 * @param {string} transaction.type type of transaction
 * @returns new transaction
 */

async function createTransaction(transaction, borrowerId, lenderId) {
    
  const config = {
    method: 'post',
    baseURL: process.env.AVILA_TEK_SERVICE_URL,
    url: `/v2/transactions/${borrowerId}/${lenderId}`,
    headers: {},
    data: {
      transaction
    }
  };
  console.log('createTransaction: ', config.data);
  return axios(config);
  
}

module.exports = createTransaction;
