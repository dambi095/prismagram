
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

// 비밀 값을 요청하기
export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`
}

// 비밀 값을 메일로 전송하기
export const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGIRD_PASSWORD
        }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};


export const sendSecretMail = (adress, secret) => {
    const email = {
        from: "nico@prismagram.com",
        to: adress,
        subject: "Login Secret for Prismagram !",
        html: `Hello! Your login secret is <strong>${secret}</strong>. <br/> Copy paste on the app/website to log in `
    }
    return sendMail(email);
}

// Token 생성 함수 
export const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET);