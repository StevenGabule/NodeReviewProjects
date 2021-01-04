import config from "dotenv";
import express from 'express';
import cors from 'cors';
import BookRoutes from './server/routes/BookRoutes';
import UserRoutes from "./server/routes/UserRoutes";

config.config();

const app = express();

app.use(express.json());
app.use(cors())
const port = process.env.PORT || 8000;

app.use("/api/v1/books", BookRoutes);
app.use("/api/v1/users", UserRoutes);

app.get("*", (req, res) => {
    res.status(200).send({
        message: "Welcome asshole in this api!"
    })
});

app.listen(port, () => console.log(`Server is running on PORT ${port}`));

export default app;