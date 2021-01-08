import config from "dotenv";
import express from 'express';
import cors from 'cors';
import BookRoutes from './server/routes/BookRoutes';
import UserRoutes from "./server/routes/UserRoutes";
import CartRoutes from "./server/routes/CartRoutes";

config.config();

const app = express();

app.use('/static/uploads', express.static('static/uploads'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

app.use(cors())

const port = process.env.PORT || 8000;

app.use("/api/v1/books", BookRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/carts", CartRoutes);

app.get("*", (req, res) => {
    res.status(200).send({
        message: "Welcome asshole in this api!"
    })
});

app.listen(port, () => console.log(`Server is running on PORT ${port}`));

export default app;