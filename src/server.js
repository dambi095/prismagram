
import "./env";

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

// import { sendSecretMail } from "./utils";

// passport.js 파일은 이렇게 import! server.js 에서 passport.js 파일에서 무언가를 받아서 사용할 필요가 없으며, 어떤 일이 벌어지는지 몰라도 되기 때문
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";


const PORT = process.env.PORT || 4000;

/*
   GraphQLServer 에는 express 서버가 내장되어 있다.
   context는 resolver 사이에서 정보를 공유할 때 사용한다 즉, context에 request가 담겨서 전달된다는 의미 
*/
const server = new GraphQLServer({
   schema,
   context: ({ request }) => ({ request, isAuthenticated }) 
});

// express 서버에 접근하여 logger 미들웨어 사용
server.express.use(logger("dev"));

// authenticateJwt 를 실행하도록 추가 
server.express.use(authenticateJwt);

server.start({ port: PORT }, () => console.log(`Server running on port http://localhost:${PORT}`));