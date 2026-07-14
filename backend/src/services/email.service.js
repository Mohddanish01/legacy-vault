import { Resend } from "resend";
import { otpTemplate } from "../emails/otp.template.js";
import { EMAIL_SUBJECT } from "../constants/emailSubjects.js";

export async function sendOtpEmail(email, otp) {

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({

        from: process.env.EMAIL_FROM,

        to: email,

        subject: EMAIL_SUBJECT.LOGIN_OTP,

        html: otpTemplate(otp),

    });
}