import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { fromEmail, resend } from "./email/resend";
import { AuthEmail } from "./email/authEmail";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    user: {
        additionalFields: {
            role: {
                type: "string", required: true
            },
            terms: { type: "boolean", required: true, defaultValue: false },
            phone: {
                type: "string", required: true
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url, token }, request) => {
            try {
                console.log(token);

                await resend.emails.send({
                    from: fromEmail,
                    to: " davidtomiloba@gmail.com",
                    subject: "Verify your email address",
                    react: AuthEmail({
                        name: user.name,
                        preview: "Password Reset",
                        title: "Reset Your Password",
                        description: "A request was made to reset your password. Click the button below to set a new one",
                        cta: "Reset Password",
                        footer: "If you did not request a password reset, you can safely ignore this email",
                        actionUrl: url,
                    }),
                })
            } catch (error) {
                console.log(error);
                throw error
            }
        }
    },
    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url, token }) => {
            try {
                console.log(token);

                await resend.emails.send({
                    from: fromEmail,
                    to: " davidtomiloba@gmail.com",
                    subject: "Verify your email address",
                    react: AuthEmail({
                        name: user.name,
                        preview: "Welcome Onboard",
                        title: "Account Verification",
                        description: "Your account has been successfully created . We're excited to have you on board. Please confirm your email address to activate your account and continue.",
                        cta: "Verify Email",
                        footer: "If you did not create an account with One Mission School, you can safely ignore this email",
                        actionUrl: url,
                    }),
                })
            } catch (error) {
                console.log(error);
                throw error
            }
        },
        redirectTo: '/login'
    },
    plugins: [nextCookies()]
});