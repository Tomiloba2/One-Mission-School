"use client"

import * as React from 'react';
import Link from "next/link";
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { usePathname } from "next/navigation"
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface INavBarProps {
}

export function Navbar(props: INavBarProps) {
    const [open, setOpen] = React.useState(false)
    const pathname = usePathname()
    const routes = [
        { href: "/", title: 'Home' },
        { href: "/about", title: 'About' },
        { href: "/programs", title: 'Programs' },
        { href: "/admissions", title: 'Admissions' },
        { href: "/alumni", title: 'Alumni' },
        { href: "/contact", title: 'Contact' },
        { href: "/gallery", title: 'Gallery' },
    ]
    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60'>
            <div>
                <section></section>
                <section className=' container flex h-16 items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl'>
                    <Link href={'/'} className='flex item-center space-x-2 font-bold rounded-full'>
                        <Image
                            src={'/images/OMSlogo.png'}
                            alt="One Mission School Logo"
                            width={60}
                            height={30}
                            priority
                            className='bg-transparent'
                        />
                    </Link>
                    {/* desktop nav */}
                    <nav className=" hidden md:flex md:gap-6 ">
                        {routes.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "text-sm font-medium  transition-colors hover:text-brand-dark",
                                        isActive ? " text-brand-primary font-semibold" : "text-muted-foreground"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            )
                        })}
                    </nav>
                    <div id="auth" className='hidden items-center gap-4 md:flex'>
                        <Button className='bg-brand-primary hover:bg-blue-700' size={'sm'}>
                            <Link href={'/login'} className='text-base p-4'>
                                            Get Started
                                        </Link>
                        </Button>
                    </div>
                    {/* mobile menu trigger */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild className='md:hidden'>
                            <Button variant={'ghost'} size={'icon-lg'}>
                                <Menu className='h-10 w-10 text-brand-primary' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side='left' className='w-75 sm:w-100'>
                            <div className='flex flex-col gap-6 py-8 px-5'>
                                <div className='flex flex-col gap-4'>
                                    {routes.map((item) => {
                                        const isActive = pathname === item.href
                                        return (
                                            <Link
                                                className={cn('text-md font-medium transition-colors hover:text-brand-dark ',
                                                    isActive ? " text-brand-primary font-semibold" : "text-muted-foreground")}
                                                key={item.href}
                                                href={item.href}>
                                                {item.title}
                                            </Link>
                                        )
                                    })}
                                </div>
                                <div id="mobile-auth" className='flex flex-col gap-3 pt-4 border-t'>
                                    <Button asChild className='bg-blue-500 hover:bg-blue-700' size={'sm'} onClick={() => setOpen(false)}>
                                        <Link href={'/login'} className='text-white'>
                                            Get Started
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </section>
            </div>
        </header>
    );
}
