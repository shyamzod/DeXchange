import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const dbclient = new PrismaClient();

interface user {
  Branch: string;
  username: string;
  BankBalance: number;
}
interface AddMoneyToBank {
  username: string;
  moneytoadd: number;
}
interface BuyorSellAsset {
  username: string;
  BTC: number;
}

async function InsertNewUser(userdata: user) {
  try {
    if (userdata != undefined || userdata != null) {
      const result = await dbclient.userBankBalance.create({
        data: {
          Branch: userdata.Branch,
          username: userdata.username,
          BankBalance: userdata.BankBalance,
        },
      });
      return result.Id;
    }
  } catch {}
}

async function UpdateBankBalane(user: AddMoneyToBank) {
  try {
    const existingBalance = await dbclient.userBankBalance.findFirst({
      where: { username: user.username },
      select: {
        BankBalance: true,
      },
    });
    const newBalance =
      existingBalance?.BankBalance === undefined ||
      existingBalance?.BankBalance == null
        ? user.moneytoadd
        : existingBalance.BankBalance + user.moneytoadd;
    const result = await dbclient.userBankBalance.update({
      where: {
        username: user.username,
      },
      data: { BankBalance: newBalance },
      select: {
        BankBalance: true,
      },
    });
    return result;
  } catch {}
}

async function GetUserBalance(username: any) {
  try {
    const result = await dbclient.userBankBalance.findFirst({
      where: {
        username,
      },
      select: {
        BankBalance: true,
      },
    });
    return result?.BankBalance;
  } catch {}
}
async function GetWalletBalance(username: any) {
  try {
    const result = await dbclient.userWallet.findFirst({
      where: {
        username,
      },
      select: {
        USDTBalance: true,
        BTCBalance: true,
      },
    });
    return result;
  } catch {}
}
// async function CreateWallet(username: string) {
//   try {
//     const result = await dbclient.userWallet.create({
//       data: { username: username, BTCBalance: 0, USDTBalance: 0.0 },
//     });
//   } catch {}
// }

async function BuyAsset(datatoupdate: BuyorSellAsset) {
  try {
    const existingvalues = await dbclient.userWallet.findFirst({
      where: {
        username: datatoupdate.username,
      },
      select: {
        BTCBalance: true,
        USDTBalance: true,
      },
    });
    const result = await dbclient.userWallet.update({
      where: {
        username: datatoupdate.username,
      },
      data: {
        BTCBalance:
          existingvalues?.BTCBalance === undefined
            ? datatoupdate.BTC
            : existingvalues?.BTCBalance + datatoupdate.BTC,
        USDTBalance:
          existingvalues?.USDTBalance === undefined
            ? existingvalues?.USDTBalance
            : existingvalues.USDTBalance - datatoupdate.BTC * 100,
      },
    });
    return result;
  } catch {}
}

async function SellAsset(datatoupdate: BuyorSellAsset) {
  try {
    const existingvalues = await dbclient.userWallet.findFirst({
      where: {
        username: datatoupdate.username,
      },
      select: {
        BTCBalance: true,
        USDTBalance: true,
      },
    });
    const result = await dbclient.userWallet.update({
      where: {
        username: datatoupdate.username,
      },
      data: {
        BTCBalance:
          existingvalues?.BTCBalance === undefined
            ? existingvalues?.BTCBalance
            : existingvalues?.BTCBalance - datatoupdate.BTC,
        USDTBalance:
          existingvalues?.USDTBalance === undefined
            ? existingvalues?.USDTBalance
            : existingvalues?.USDTBalance + datatoupdate.BTC * 100,
      },
    });
    return result;
  } catch {}
}

async function AddMoneyToWallet(userdata: AddMoneyToBank) {
  try {
    const existingBalance = await dbclient.userBankBalance.findFirst({
      where: {
        username: userdata.username,
      },
      select: {
        BankBalance: true,
      },
    });
    if (
      existingBalance?.BankBalance != undefined &&
      existingBalance?.BankBalance >= userdata.moneytoadd
    ) {
      const existingwalletbalance = await dbclient.userWallet.findFirst({
        where: {
          username: userdata.username,
        },
        select: {
          USDTBalance: true,
        },
      });
      const walletupdate = await dbclient.userWallet.update({
        where: {
          username: userdata.username,
        },
        data: {
          USDTBalance:
            existingwalletbalance?.USDTBalance === undefined
              ? userdata.moneytoadd
              : existingwalletbalance.USDTBalance + userdata.moneytoadd,
        },
      });
      const bankbalanceupdate = await dbclient.userBankBalance.update({
        where: {
          username: userdata.username,
        },
        data: {
          BankBalance: existingBalance.BankBalance - userdata.moneytoadd,
        },
      });
      return walletupdate;
    } else {
      return false;
    }
  } catch {}
}
async function Withdrawmoneyfromwallet(userdata: AddMoneyToBank) {
  try {
    const existingvalues = await dbclient.userWallet.findFirst({
      where: {
        username: userdata.username,
      },
      select: {
        USDTBalance: true,
      },
    });

    const existinguserbankbalance = await dbclient.userBankBalance.findFirst({
      where: {
        username: userdata.username,
      },
      select: {
        BankBalance: true,
      },
    });

    if (
      existingvalues?.USDTBalance != undefined &&
      existinguserbankbalance?.BankBalance != undefined &&
      existingvalues.USDTBalance >= userdata.moneytoadd
    ) {
      const walletresult = await dbclient.userWallet.update({
        where: {
          username: userdata.username,
        },
        data: {
          USDTBalance: existingvalues.USDTBalance - userdata.moneytoadd,
        },
      });

      const bankbalanceresult = await dbclient.userBankBalance.update({
        where: {
          username: userdata.username,
        },
        data: {
          BankBalance:
            existinguserbankbalance.BankBalance + userdata.moneytoadd,
        },
      });
      return walletresult;
    }
  } catch {}
}

router.post("/AddMoneyToBank", async (req, res) => {
  const body = req.body;
  const result = await UpdateBankBalane(body);
  if (result) {
    res.status(200).json({
      message: "Money added to Bank Account",
      BankBalance: result.BankBalance,
    });
  } else {
    res.status(411).json({ message: "Adding Money Failed to Bank Account" });
  }
});

router.post("/AddMoneyToWallet", async (req, res) => {
  const body = req.body;
  const result = await AddMoneyToWallet(body);
  if (result) {
    res.status(200).json({
      message: "Added Money to Wallet from BankAccount",
      WalletUSDT: result.USDTBalance,
    });
  } else {
    res.status(200).json({ message: "Insufficient Balance" });
  }
});
router.post("/Withdrawmoneyfromwallet", async (req, res) => {
  const body = req.body;
  const result = await Withdrawmoneyfromwallet(body);
  if (result) {
    res.status(200).json({
      message: "Money withdrawn from balance",
      walletbalance: result.USDTBalance,
    });
  }
});

router.post("/CreateBankAccount", async (req, res) => {
  const body = req.body;
  await InsertNewUser(body);
  // await CreateWallet(body.username);
  res.status(200).json({ message: "New User Created" });
});

router.get("/getUserBalance", async (req, res) => {
  const username = req.query.username;
  const result = await GetUserBalance(username);
  res
    .status(200)
    .json({ message: "User Balance Fetched", BankBalance: result });
});

router.get("/getwalletbalance", async (req, res) => {
  const username = req.query.username;
  const result = await GetWalletBalance(username);
  res.status(200).json({
    message: "User Wallet Usdt Fetched",
    WalletUsdt: result?.USDTBalance,
    walletBTC: result?.BTCBalance,
  });
});

router.post("/BuyAsset", async (req, res) => {
  const body = req.body;
  const result = await BuyAsset(body);
  res.status(200).send({
    message: "Assets Updated in db",
    BTC: result?.BTCBalance,
    USDT: result?.USDTBalance,
  });
});

router.post("/SellAsset", async (req, res) => {
  const body = req.body;
  const result = await SellAsset(body);
  res.status(200).send({
    message: "Assets Sold are updated in db",
    BTC: result?.BTCBalance,
    USDT: result?.USDTBalance,
  });
});

export default router;
