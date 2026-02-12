"use client"

import { Facebook, Instagram, Linkedin, Mail, Phone, School, MapPin } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export interface IPublicFooterProps {
}

export function PublicFooter(props: IPublicFooterProps) {
    const formSchema = z.object({
        email: z.email("Invalid email")
    })
    type formSchemaTye = z.infer<typeof formSchema>
    const form = useForm<formSchemaTye>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        }
    })
    const [loading, setLoading] = React.useState(false)
    const onSubmit = async (values: formSchemaTye) => {
        try {
            setLoading(true)

        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false)
        }
    }
    const routes = [
        { href: "/", title: 'Home' },
        { href: "/about", title: 'About' },
        { href: "/programs", title: 'Programs' },
        { href: "/admissions", title: 'Admissions' },
        { href: "/Contact", title: 'Contact' },
        { href: "/gallery", title: 'Gallery' },
    ]
    const contactInfo = {
        address: "17 Wisdom Estate Aafin-iyanu Eleyele Ibadan Oyo State Nigeria",
        phone: "+234 335 883 330",
        email: 'onemissionschool2008@gmail.com'
    }
    const currentYear = new Date().getFullYear();
    return (
        <footer className='relative bg-linear-to-br  text-foreground bg-muted'>
            <div className="absolute inset-0" />
            <div className="container mx-auto  max-w-7xl relative z-10 px-4 py-12">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    {/* column 1logo and tagline */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight text-center">
                                One Mission School
                            </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-center text-sm">
                            Nuturing young minds with excellence, values and joy since 2008
                        </p>
                        <div className="flex gap-3 justify-center">
                            <Button variant="outline" size="icon" asChild>
                                <a href="https://instagram.com/schoolname" target="_blank" rel="noopener noreferrer">
                                    <span>
                                        <Facebook className='h-20 w-20 mx-auto border-indigo-500 text-indigo-500' />
                                    </span>

                                </a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <a href="https://instagram.com/schoolname" target="_blank" rel="noopener noreferrer">
                                    <span>
                                        <Instagram className='h-20 w-20 mx-auto border-blue-500 text-blue-500' />
                                    </span>

                                </a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <a href="https://instagram.com/schoolname" target="_blank" rel="noopener noreferrer">
                                    <span>
                                        <Linkedin className='h-20 w-20 mx-auto border-rose-500 text-rose-500' />
                                    </span>

                                </a>
                            </Button>
                        </div>
                    </div>
                    {/* column 2: quick links */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-semibold text-center">Quick Links</h4>
                        <ul className='space-y-3'>
                            {routes.map((item) => {
                                return (
                                    <li key={item.title} className='text-center'>
                                        <Link href={item.href}
                                            className='text-muted-foreground text-sm hover:text-primary transition-colors'>{item.title}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    {/* column 3: contact info */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-semibold text-center">Contact Us</h4>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex items-start gap-3">
                                <Button variant="outline" size="icon" asChild>
                                    <span>
                                        <MapPin className='h-20 w-20 mx-auto border-blue-500 text-blue-500' />
                                    </span>
                                </Button>
                                <span className='text-sm'>{contactInfo.address}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Button variant="outline" size="icon" asChild>
                                    <span>
                                        <Phone className='h-20 w-20 mx-auto border-green-500 text-green-500 ' />
                                        </span>
                                </Button>                             
                                <span className='text-sm'>{contactInfo.phone}</span>
                            </li>
                        </ul>
                    </div>
                    {/* column 4:newsletter */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-semibold text-center">Stay Connected</h4>
                        <p className="text-muted-foreground text-center text-sm">
                            Subscribe to our newsletter for updates, events and admission news
                        </p>
                        <Form {...form}>
                            <form
                                action=""
                                method="post"
                                className='flex flex-col gap-3 mx-10 md:mx-1 '
                                onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder='enter your email'
                                                        {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )
                                    }} />
                                <Button type='submit' className='cursor-pointer w-full bg-brand-primary hover:bg-blue-800 transition-colors text-white'>Subscribe</Button>
                            </form>
                        </Form>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
                    <p>
                        &copy; {currentYear} One Mission School. All rights reserved.
                        <span className="mx-2">|</span>
                        <Link href={'/privacy-policy'} className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <span className="mx-2">|</span>
                        <Link href={'/terms'} className="hover:text-primary transition-colors">Terms of Use</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
