import "reflect-metadata";
import express, { Request, Response } from "express"; 
import dotenv from "dotenv";
import db from "./db/connection"; 
import router from "./api/routes";
import path from "path";

const app = express();

dotenv.config();
const {PORT} = process.env;
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.redirect("/portal") 
});
app.use(router); 
const start = async (): Promise<void> => {
    try {
      await db.sync();
      app.listen(PORT || 9081, () => {
        console.log(`Server started on port ${PORT}`);
      });
    } catch (error) {
      console.error(error);
      // process.exit(1);
      start();
    }
  };
  
  void start();