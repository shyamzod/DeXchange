import React, { useEffect, useState } from "react";
import BuyorsellComponent from "./BuyorSellComponent";
import axios from "axios";

const MainComponent: React.FC = () => {
  const [btcBalance, UpdatebtcBalance] = useState<number>(0);
  const [usdtBalance, UpdateusdtBalance] = useState<number>(0);
  const [buyorsellenabled, SetEnabled] = useState<boolean>(false);
  const [buyorsell, SetBuyorSell] = useState<
    "Buy" | "Sell" | "AddMoney" | "Withdraw" | ""
  >("");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/dexchange/getwalletbalance",
          {
            params: {
              username: localStorage.getItem("UserName"),
            },
          }
        );
        const resdata = result.data;
        UpdateusdtBalance(resdata.WalletUsdt);
        UpdatebtcBalance(resdata.walletBTC);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div>
      <div>
        <div className="flex flex-row items-center justify-center space-x-20 mt-10">
          <div className="px-20 py-16 bg-gray-800 text-white rounded-2xl">
            <h3>BTC Balance : {btcBalance}</h3>
          </div>
          <div className="px-20 py-10 bg-gray-800 text-white rounded-2xl">
            <h3 className="text-center">USDT Balance : {usdtBalance}</h3>
            <div className="space-x-3">
              <button
                className="px-10 py-2 bg-blue-600 text-white rounded-md mt-2"
                onClick={() => {
                  SetEnabled(true);
                  SetBuyorSell("AddMoney");
                }}
              >
                Add Money
              </button>
              <button
                className="px-10 py-2 bg-yellow-400 text-black rounded-md mt-2"
                onClick={() => {
                  SetEnabled(true);
                  SetBuyorSell("Withdraw");
                }}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mt-10 space-x-10">
          <button
            className="px-20 py-2 bg-green-600 text-white rounded-md"
            onClick={() => {
              SetEnabled(true);
              SetBuyorSell("Buy");
            }}
          >
            Buy
          </button>
          <button
            className="px-20 py-2 bg-red-600 text-white rounded-md"
            onClick={() => {
              SetEnabled(true);
              SetBuyorSell("Sell");
            }}
          >
            Sell
          </button>
        </div>
      </div>
      <div className="mt-10">
        <BuyorsellComponent
          enabled={buyorsellenabled}
          mode={buyorsell}
          updateusdt={UpdateusdtBalance}
          divEnabled={SetEnabled}
          updatebtc={UpdatebtcBalance}
        />
      </div>
    </div>
  );
};

export default MainComponent;
