import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const app = express();
const PORT = 3000;

const dbclient = new PrismaClient();

app.use(express.json());
app.use(cors());

interface User {
  UserName: string;
  FullName: string;
  Email: string;
  PhoneNo: number;
  Password: string;
}
interface LoginUser {
  UserName: string;
  Password: string;
}
interface ChangePassword {
  UserName: string;
  OldPassword: string;
  NewPassword: string;
}
async function User(body: User) {
  try {
    const res = await dbclient.$transaction(async (dbclient) => {
      const result = await dbclient.user.create({
        data: {
          UserName: body.UserName,
          FullName: body.FullName,
          Email: body.Email,
          PhoneNo: body.PhoneNo,
          Password: body.Password,
        },
      });
      const statusresult = await dbclient.userStatus.create({
        data: {
          UserName: body.UserName,
        },
      });
      return result;
    });
    if (res != undefined && res != null) {
      return res;
    }
  } catch (e) {
    console.log(e);
  }
}

async function ChangePassword(body: ChangePassword) {
  try {
    const result = await dbclient.user.update({
      where: {
        UserName: body.UserName,
        Password: body.OldPassword,
      },
      data: {
        Password: body.NewPassword,
      },
      select: {
        UserName: true,
      },
    });
    if (result != undefined && result != null) {
      return result;
    }
  } catch (e) {}
}

async function SignInUser(body: LoginUser) {
  try {
    const res = await dbclient.$transaction(async (dbclient) => {
      const result = await dbclient.user.findFirst({
        where: {
          UserName: body.UserName,
          Password: body.Password,
        },
        select: {
          Id: true,
          UserName: true,
        },
      });
      const statusresult = await dbclient.userStatus.update({
        where: {
          UserName: body.UserName,
        },
        data: {
          Status: true,
        },
      });
      return result;
    });

    if (res != undefined && res != null) {
      return res;
    }
  } catch (e) {}
}

async function LogoutUser(UserName: string) {
  try {
    const result = await dbclient.userStatus.update({
      where: {
        UserName,
      },
      data: {
        Status: false,
      },
    });
    return result;
  } catch (e) {}
}
app.post("/Signup", async (req, res) => {
  const body = req.body;
  const result = await User(body);
  if (result != undefined && result != null) {
    res.status(200).json({ message: "User has successfully registered" });
  }
});

app.post("/SignIn", async (req, res) => {
  const body = req.body;
  const result = await SignInUser(body);
  if (result) {
    res
      .status(200)
      .json({
        message: "User SignIn Successfully",
        UserName: result.UserName,
        LoggedIn: true,
      });
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }
});

app.post("/ChangePassword", async (req, res) => {
  const body = req.body;
  const result = await ChangePassword(body);
  if (result != undefined && result != null) {
    res.status(200).json({
      message: "Password Changed Successfully",
      UserName: result.UserName,
    });
  } else {
    res
      .status(400)
      .json({ message: "Password not changed", UserName: body.UserName });
  }
});
app.get("/logout", async (req, res) => {
  const username = req.query.username as string | undefined;
  if (username) {
    const result = await LogoutUser(username);
    if (result) {
      res.status(200).json({ message: "User Logged Out Successfully!" });
    }
  }
});
app.listen(PORT, () => {
  console.log("App is listening at port " + PORT);
});
