import "dotenv/config";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const EMAIL_FROM = process.env.EMAIL_FROM!;

export const WelcomeSendEmail = async (email: string, username: string) => {
    if (!RESEND_API_KEY) {
        console.log(`Welcome ${username} to coinova, sent to ${email}`);
        return "preview";
    }

    try {
        const resend = new Resend(RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: EMAIL_FROM,
            to: email,
            subject: 'Welcome to Coinova — Your crypto journey starts here',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Welcome to Coinova</title>
                </head>

                <body style="margin:0; padding:0; background-color:#090b10; font-family:Arial,Helvetica,sans-serif; color:#ffffff;">

                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                    style="background-color:#090b10; padding:40px 16px;">
                    <tr>
                        <td align="center">

                        <table width="100%" cellpadding="0" cellspacing="0" border="0"
                            style="max-width:560px; background-color:#11141c; border:1px solid #252a36; border-radius:16px; overflow:hidden;">

                            <!-- Logo -->
                            <tr>
                            <td style="padding:32px 36px 20px;">
                                <span style="font-size:26px; font-weight:700; letter-spacing:-1px; color:#ffffff;">
                                coinova<span style="color:#b6f36b;">.</span>
                                </span>
                            </td>
                            </tr>

                            <!-- Hero -->
                            <tr>
                            <td style="padding:30px 36px 20px;">
                                <div style="display:inline-block; padding:7px 12px; border-radius:30px; background-color:#202b1b; color:#b6f36b; font-size:11px; font-weight:700; letter-spacing:1px;">
                                WELCOME ABOARD
                                </div>

                                <h1 style="margin:24px 0 14px; font-size:34px; line-height:1.2; letter-spacing:-1px; color:#ffffff;">
                                The future of finance starts with you.
                                </h1>

                                <p style="margin:0; font-size:15px; line-height:1.8; color:#a1a8b8;">
                                Welcome to Coinova, ${email}.
                                We're excited to have you with us. Your gateway to a smarter,
                                simpler crypto experience starts here.
                                </p>
                            </td>
                            </tr>

                            <!-- Divider -->
                            <tr>
                            <td style="padding:12px 36px;">
                                <div style="height:1px; background-color:#252a36;"></div>
                            </td>
                            </tr>

                            <!-- Features -->
                            <tr>
                            <td style="padding:20px 36px;">
                                <h2 style="margin:0 0 20px; font-size:18px; color:#ffffff;">
                                Explore what's possible
                                </h2>

                                <p style="margin:0 0 16px; font-size:14px; line-height:1.7; color:#a1a8b8;">
                                <span style="color:#b6f36b; font-weight:bold;">01.</span>
                                &nbsp; Discover global crypto markets and track assets in real time.
                                </p>

                                <p style="margin:0 0 16px; font-size:14px; line-height:1.7; color:#a1a8b8;">
                                <span style="color:#b6f36b; font-weight:bold;">02.</span>
                                &nbsp; Manage your digital portfolio from one place.
                                </p>

                                <p style="margin:0; font-size:14px; line-height:1.7; color:#a1a8b8;">
                                <span style="color:#b6f36b; font-weight:bold;">03.</span>
                                &nbsp; Experience a streamlined trading interface.
                                </p>
                            </td>
                            </tr>

                            <!-- CTA -->
                            <tr>
                            <td style="padding:24px 36px 36px;">
                                <a href="https://coinova.com/dashboard"
                                style="display:inline-block; padding:15px 26px; background-color:#b6f36b; color:#10140b; text-decoration:none; font-size:14px; font-weight:700; border-radius:8px;">
                                Explore Coinova →
                                </a>
                            </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                            <td style="padding:24px 36px; background-color:#0d1017; border-top:1px solid #252a36;">
                                <p style="margin:0 0 10px; font-size:13px; font-weight:700; color:#ffffff;">
                                coinova<span style="color:#b6f36b;">.</span>
                                </p>

                                <p style="margin:0 0 16px; font-size:12px; line-height:1.7; color:#727b8d;">
                                Making digital finance more accessible, one step at a time.
                                </p>

                                <p style="margin:0; font-size:11px; line-height:1.7; color:#596171;">
                                © ${new Date().getFullYear()} Coinova. All rights reserved.<br />
                                You received this email because an account was created using this address.
                                </p>
                            </td>
                            </tr>

                        </table>

                        </td>
                    </tr>
                    </table>

                </body>
                </html>
            `,
        });

        if (error) {
            return console.error({ error });
        }

        console.log({ data });
    } catch (error: unknown) {
        throw new Error("Failed to send email");
    }
}