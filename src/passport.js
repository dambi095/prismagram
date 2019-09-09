
import passport from "passport"; // 인증 관련한 모든 일을 수행 ex> jwt 토큰이나 쿠키에서 정보를 가져와서 사용자 정보에 저장
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더에서 jwt를 찾는 역할
    secretOrKey: process.env.JWT_SECRET // 토큰을 암호화 하기위한 문자열 
};

// jwt를 가져와서 해석하고 확인하는 작업 
const verifyUser = async (payload, done) => {
    // payload 는 토큰에서 해석된 id를 받아서, user를 찾아 return 
    try {
        const user = await prisma.user({ id: payload.id })
        if (user !== null) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch (error) {
        return done(error, false);
    }
}

/*
 미들웨어 함수로 이 미들웨어가 실행되면 passport.authenticate() 가 실행 된다
*/
export const authenticateJwt = (req, res, next ) => 
    passport.authenticate("jwt", {sessions:false}, (error, user) => {
        // verifyUser 에서 사용자를 받아온 후에, 사용자가 존재한다면 그 사용자 정보를 req 객체에 추가한다
        if(user){
            req.user = user;
        }
        next();
    })(req, res, next);

// Strategy 를 활용해서 jwt 토큰을 추출 후 결과물을 payload 에 전달
// verifyUser 는 callback 함수로 호출된다. 
passport.use(new Strategy(jwtOptions, verifyUser)) 

passport.initialize();

