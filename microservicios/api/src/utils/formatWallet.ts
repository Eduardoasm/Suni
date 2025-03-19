import { convertToUSDC } from './coinConversion/convertToUSDC';

export async function formatWallet(wallet, btcPrice) {
  const balanceInUSDC = convertToUSDC(
    wallet?.type?.toLowerCase(),
    btcPrice,
    wallet?.balance
  );
  const blockedBalanceInUSDC = convertToUSDC(
    wallet?.type?.toLowerCase(),
    btcPrice,
    wallet?.blocked_balance
  );
  const availableBalanceInUSDC = convertToUSDC(
    wallet?.type?.toLowerCase(),
    btcPrice,
    wallet?.available_balance
  );

  return {
    name: wallet?.name,
    wallet: wallet?.wallet,
    balance: wallet?.balance,
    balanceInUSDC,
    blockedBalance: wallet?.blocked_balance,
    blockedBalanceInUSDC,
    availableBalance: wallet?.available_balance,
    availableBalanceInUSDC,
    currency: wallet?.type?.toLowerCase(),
  };
}
