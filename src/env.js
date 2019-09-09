 // require("dotenv").config(): 같은 폴더에있는 .env 파일의 PORT 를 읽어올 수 있다.
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname,".env") }); 