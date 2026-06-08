const FALLBACK_DATA = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 78000,
    price_change_percentage_24h: -2.4,
    market_cap: 1000000000000,
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 2200,
    price_change_percentage_24h: 1.2,
    market_cap: 300000000000,
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image:
      "https://coin-images.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 180,
    price_change_percentage_24h: 5.7,
    market_cap: 80000000000,
  },
];

const BTC_ID = "1673723677362319866";
const ETH_ID = "1673723677362319867";
const SOL_ID = "1673723677362319875";

async function fetchSnapshot(currencyId: string) {
  const res = await fetch(
    `${process.env.SOSOVALUE_API_URL}/currencies/${currencyId}/market-snapshot`,
    {
      headers: {
        "x-soso-api-key": process.env.SOSOVALUE_API_KEY || "",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`SoSoValue request failed: ${res.status}`);
  }

  return await res.json();
}

export async function getMarketData() {
  try {
    const [btc, eth, sol] = await Promise.all([
      fetchSnapshot(BTC_ID),
      fetchSnapshot(ETH_ID),
      fetchSnapshot(SOL_ID),
    ]);

    return [
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        image:
          "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
        current_price: btc.data.price,
        price_change_percentage_24h: btc.data.change_pct_24h * 100,
        market_cap: btc.data.marketcap,
      },
      {
        id: "ethereum",
        symbol: "eth",
        name: "Ethereum",
        image:
          "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
        current_price: eth.data.price,
        price_change_percentage_24h: eth.data.change_pct_24h * 100,
        market_cap: eth.data.marketcap,
      },
      {
        id: "solana",
        symbol: "sol",
        name: "Solana",
        image:
          "https://coin-images.coingecko.com/coins/images/4128/large/solana.png",
        current_price: sol.data.price,
        price_change_percentage_24h: sol.data.change_pct_24h * 100,
        market_cap: sol.data.marketcap,
      },
    ];
  } catch (error) {
    console.error("USING SOSOVALUE FALLBACK", error);

    return FALLBACK_DATA;
  }
}
