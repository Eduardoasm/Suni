const btcValueInSats = 100000000;

function convertFromUSDC(coin, btcPrice, amount) {
  if (coin === 'lnd') return Math.round((amount / btcPrice) * btcValueInSats);
  throw new Error('Currency must be lnd');
}

module.exports = convertFromUSDC;
