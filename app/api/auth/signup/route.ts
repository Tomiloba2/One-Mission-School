import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server";
import { validateBody } from "../../validate";
import { userSignupSchema } from "@/lib/schema/authSchema";

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const validate = await validateBody(request, userSignupSchema)
        if (!validate.success) {
            console.log(validate.response)
            return validate.response
        }
        const {
            email, password, role,
            firstName, middleName, lastName,
            terms, phone
        } = validate.data
        const name = `${firstName} ${middleName} ${lastName}`


        const results = await auth.api.signUpEmail({
            body: {
                name, email, password, role, terms, phone
            }
        })
        const userId = results.user.id;

        await prisma.$transaction(async (tx) => {
            if (role === 'student') {
                const {
                    year, month, day, gender, parentEmail,
                    parentName, parentPhone, plan, schoolId,
                    paymentRef, classLevel
                } = validate.data
                const dateOfBirth = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);

                await tx.student.create({
                    data: {
                        userId,
                        gender, dateOfBirth, firstName, lastName,
                        middleName, parentEmail, parentName, parentPhone,
                        plan, schoolId, paymentRef, classLevel
                    }
                })
            }
            if (role === 'parent') {
                const { firstName, lastName, middleName,
                    relationship, children, numChildren } = validate.data
                await tx.parent.create({
                    data: {
                        firstName, lastName, middleName,
                        userId,
                        relationship, numChildren,
                        children: {
                            create: children
                        }

                    }
                })
            }
        })

        return NextResponse.json({
            message: "signup successful",
            data: results.user.email
        }, { status: 201 })
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error }, { status: error.statusCode })
    }
}

