import express from "express";
import cors from "cors";
import userRoutes from "./routes/userroutes";
import appRoutes from "./routes/approutes";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/dexchange", appRoutes);

app.listen(PORT, () => {
  console.log("App is listening at port " + PORT);
});
