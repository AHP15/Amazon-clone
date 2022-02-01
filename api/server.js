import APP from './app.js';
import dotenv from "dotenv";

dotenv.config();


const port = process.env.PORT ?? 8080;
APP.listen(port , () => {
    console.log("server listening on port ", port);
});