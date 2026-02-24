import z from "zod";


// Zod schema for password step only
export const passwordSchema = z.object({
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Must contain at least one number')
        .regex(/[@$!#^%*?&]/, 'Must contain at least one special character (@$!%*?&)'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword'],
});

export const baseSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    middleName: z.string().optional(),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    terms: z.boolean().refine((v) => v === true, 'Terms and conditions must be accepted'),
})
export const studentSchema = baseSchema.extend({
    day: z.string().min(1, 'Day is required'),
    month: z.string().min(1, 'Month is required'),
    year: z.string().min(1, 'Year is required'),
    gender: z.enum(['male', 'female'], { message: 'Gender is required' }),
    classLevel: z.string().optional(),
    parentName: z.string().min(1, 'Parent/guardian name is required'),
    parentEmail: z.email('Invalid parent email'),
    parentPhone: z.string().min(10, 'Parent phone is required'),
});

export const parentSchema = baseSchema.extend({
    relationship: z.string().min(1, 'Relationship is required'),
    numChildren: z.enum(['1', '2+'], {
        message: 'Please select the number of children',
    }),
    children: z
        .array(
            z.object({
                schoolId: z.string().min(1, 'School ID is required for this child'),
            })
        )
        .min(1, 'At least one child is required'),
    weeklyReports: z.boolean().optional()
})

export const studentSchemaMinusPassword = studentSchema.extend({
    role: z.literal('student'),
    schoolId: z.string(),
    plan: z.enum(["prerecorded", "interactive", "bundle"],
        { message: "payment option is required" }),
    paymentRef: z.string()
})
export const parentSchemaMinusPassword = parentSchema.extend({
    role: z.literal('parent')
})
export const finalStudentSchema = studentSchemaMinusPassword.extend({
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Must contain at least one number')
        .regex(/[@$!#^%*?&]/, 'Must contain at least one special character (@$!%*?&)')
})
export const finalParentSchema = parentSchemaMinusPassword.extend({
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Must contain at least one number')
        .regex(/[@$!#^%*?&]/, 'Must contain at least one special character (@$!%*?&)')
})
export const userSignupSchemaMinusPassword = z.discriminatedUnion('role', [
    parentSchemaMinusPassword, studentSchemaMinusPassword
])

export const userSignupSchema = z.discriminatedUnion('role', [
    finalParentSchema, finalStudentSchema
])

export type PasswordForm = z.infer<typeof passwordSchema>;
export type studentType = z.infer<typeof studentSchema>;
export type parentType = z.infer<typeof parentSchema>
export type userSignupMinusPasswordType=z.infer<typeof userSignupSchemaMinusPassword>
export type userSignupType = z.infer<typeof userSignupSchema>