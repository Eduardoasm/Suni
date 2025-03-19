export function minMaxAmountToAsset(
  minAmount: number,
  maxAmount: number,
  asset: string,
  priceAsset: number
) {
  if (asset.toLowerCase() === 'lnd') {
    const minAmountAsset = Math.trunc(minAmount / priceAsset) - 1;
    const maxAmountAsset = Math.trunc(maxAmount / priceAsset) + 1;

    return {
      minAmountAsset,
      maxAmountAsset,
    };
  }
}
