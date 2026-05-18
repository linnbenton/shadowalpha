export const connectBinanceWS = (onMessage: (data: any) => void) => {
  const ws = new WebSocket("wss://stream.binance.com:9443/ws/solusdt@kline_1m");

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    const k = message.k;

    onMessage({
      time: Math.floor(k.t / 1000),

      open: parseFloat(k.o),
      high: parseFloat(k.h),
      low: parseFloat(k.l),
      close: parseFloat(k.c),
    });
  };

  return ws;
};
