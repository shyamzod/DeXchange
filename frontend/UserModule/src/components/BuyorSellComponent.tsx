import React, { useState } from "react";
import axios from "axios";

interface BuyorSellComponentProps {
  enabled: boolean;
  mode: "" | "Buy" | "Sell" | "AddMoney" | "Withdraw";
  updateusdt: (amount: number) => void;
  divEnabled: (enabled: boolean) => void;
  updatebtc: (amount: number) => void;
}

const BuyorSellComponent: React.FC<BuyorSellComponentProps> = ({
  enabled,
  mode,
  updateusdt,
  divEnabled,
  updatebtc,
}) => {
  const [quantity, SetQuantity] = useState(0);

  async function AddMoneytoWallet() {
    const result = await axios.post("http://localhost:3000/AddMoneyToWallet", {
      username: "Ramdas",
      moneytoadd: quantity,
    });
    const resdata = result.data;
    updateusdt(resdata.WalletUSDT);
    divEnabled(false);
  }

  async function withdrawmoney() {
    const result = await axios.post(
      "http://localhost:3000/Withdrawmoneyfromwallet",
      {
        username: "Ramdas",
        moneytoadd: quantity,
      }
    );
    const data = result.data;
    updateusdt(data.walletbalance);
    divEnabled(false);
  }

  async function BuyAssetHandler() {
    const result = await axios.post("http://localhost:3000/BuyAsset", {
      username: "Ramdas",
      BTC: quantity,
    });
    const data = result.data;
    updateusdt(data.USDT);
    updatebtc(data.BTC);
    divEnabled(false);
  }

  async function sellAssetHandler() {
    const result = await axios.post("http://localhost:3000/SellAsset", {
      username: "Ramdas",
      BTC: quantity,
    });
    const data = result.data;
    updateusdt(data.USDT);
    updatebtc(data.BTC);
    divEnabled(false);
  }

  return (
    enabled && (
      <div>
        <div className="space-y-4 py-10">
          <div className="flex flex-row justify-center space-x-3">
            <label className="block mb-2 text-md font-medium mt-2 text-white">
              {mode === "Buy" || mode === "Sell" ? (
                <>Quantity to {mode}</>
              ) : (
                <>Add Money</>
              )}
            </label>
            <input
              type="number"
              placeholder="Enter Quantity"
              className="block p-2 text-black border rounded-lg border-black"
              onChange={(e) => {
                SetQuantity(parseInt(e.target.value, 10));
              }}
            ></input>
          </div>
          <div className="flex justify-center">
            {mode === "Sell" || mode === "Buy" ? (
              mode === "Sell" ? (
                <button
                  className="px-10 py-2 bg-red-600 text-white rounded-md"
                  onClick={sellAssetHandler}
                >
                  Sell
                </button>
              ) : (
                <button
                  className="px-10 py-2 bg-green-600 text-white rounded-md"
                  onClick={BuyAssetHandler}
                >
                  Buy
                </button>
              )
            ) : mode === "AddMoney" ? (
              <button
                className="px-10 py-2 bg-blue-600 text-white rounded-md"
                onClick={AddMoneytoWallet}
              >
                Add Money To Wallet
              </button>
            ) : (
              <button
                className="px-10 py-2 bg-blue-600 text-white rounded-md"
                onClick={withdrawmoney}
              >
                Withdraw Money From Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default BuyorSellComponent;
