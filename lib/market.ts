const FALLBACK_DATA = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 78000,
    price_change_percentage_24h: -2.4,
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 2200,
    price_change_percentage_24h: 1.2,
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image:
      "https://coin-images.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 180,
    price_change_percentage_24h: 5.7,
  },
];

export async function getMarketData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana",
      {
        next: {
          revalidate: 30,
        },
      },
    );

    if (!response.ok) {
      throw new Error("CoinGecko failed");
    }

    return await response.json();
  } catch (error) {
    console.error("USING FALLBACK MARKET DATA");

    return FALLBACK_DATA;
  }
}
