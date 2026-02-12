'use client'

import * as React from 'react';
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link';
import Image from 'next/image';
import { Baby, BookOpen, BookOpenCheck, CheckCircle2, GraduationCap, Handshake, Quote, ShieldCheck, Trophy, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { motion } from "framer-motion"
import { CarouselDots } from '../ui/carousel-dots';
export interface IHomeHeroProps {
}

export function PublicHome(props: IHomeHeroProps) {
    const heroSlides = [
        {
            image: "/images/classroom3.jpg",
            title: "One Mission School, Building the Total Child",
            subTitle: "From Nusery to Secondary school, we are dedicated to a single mission: empowering the next generation with the knowledge, character and skills to thrive in a digital world"
        }, {
            image: "/images/creche1.jpg",
            title: "Excellence in every lesson, Purpose in Every Child",
            subTitle: "Join One Mission School, where we combine rigorous traditional academics with modern digital tools to prepare your child for global leadership"
        }, {
            image: "/images/classroom1.jpg",
            title: "Master Yours Exams with our Smart Learning Hub",
            subTitle: "Access targeted 'Edu-Reels', expert-led video lessons and real time CBT-mock exams designed to help JSS3 and SSS3 students ace WAEC,NECO and JAMB"
        }
    ]
    /* lists of programs */
    const programsList = [
        { color: "bg-orange-50 text-orange-600", level: "Nursery", icon: Baby, age: "Ages 2-5", description: "Our nursery program focuses on early social skill,creativity,motor development and a love for learning through stories, songs, games and explorations." },
        { color: "bg-teal-50 text-teal-600", level: 'Primary', icon: BookOpen, age: "Grades 1-5", description: "A strong foundation in literacy, numeracy,science and life skills in a supportive environment that encourages curiosity, discipline and confidence." },
        { color: "bg-indigo-50 text-indigo-600", level: "Secondary", icon: GraduationCap, age: "JSS3 & SSS3", description: "Comprehensive preparation for WAEC, JAMB and NECO with our expert online tutors." }
    ]
    /* lmsFeatures */
    const lmsFeatures = [
        { id: "1", tite: "Live Classes" },
        { id: "2", tite: "Video Lessons" },
        { id: "3", tite: "Educational Shorts" },
        { id: "4", tite: "Practice Tests" },
        { id: "5", tite: "Study Materials" },
        { id: "6", tite: "Progress Tracking" },
        { id: "7", tite: "Expert Teachers" },
    ]
    /* WhyUSFeatures */
    const whyUs = [
        { color: 'text-emerald-600 bg-emerald-50', icon: GraduationCap, title: 'Academic Excellence', description: "Proven track record of outstanding results in both state and national examinations." },
        { color: "text-rose-600 text-rose-50", icon: BookOpenCheck, title: "Holistic and Balanced Curriculum", description: "Nigerian curriculum enriched with STEM,arts, sports,leadership and character education." },
        { color: 'text-blue-600 bg-blue-50', icon: Users, title: 'Caring and Experienced Teachers', description: "Dedicated educators who understand each child's unique needs and inspire a lifelong love for learning" },
        { color: 'text-amber-600 bg-amber-50', icon: ShieldCheck, title: 'Safe and Modern Facilities', description: "Secure environment with neat and conducive classrooms, playgrounds and ICT resources." },
        { color: 'text-cyan-600 bg-cyan-50', icon: Trophy, title: 'Strong Extra-curricular Programs', description: "Wide range of sports, board games, music, and competitions to dicover and build talents" },
        { color: 'text-purple-600 bg-purple-50', icon: Handshake, title: 'Parental Involvement', description: "Strong parent partnerships that ensure every child's progress is supported at home and at school." },
    ]
    /* testimonials */
    const testimonials = [
        {
            name: "Mrs Adebayo",
            role: "Parent of Primary 4 pupil",
            image: '/file.svg',
            quote: "The teachers really care about each child's progress. My daughter went from being shy toconfidently participating in class activities. We're so grateful!",
            rating: 5,
        }, {
            name: "Mr. & Mrs. Okeke",
            role: "Parent of Nusery 2 child",
            image: '/file.svg',
            quote: "The nursery environment is warm and stimulating. Our son loves goinign to school every day - the play-based learning has boosted his confidence tremendously.",
            rating: 5,
        }, {
            name: "Ife",
            role: "Alumnus",
            image: '/file.svg',
            quote: "My favorite part was the after-school clubs - I joined art and football. The teachers made learning fun and never made us feel bad about asking questions",
            rating: 5,
        }, {
            name: "Funmi",
            role: "Primary 5 pupil",
            image: '/file.svg',
            quote: "The teachers really care about each child's progress. My daughter went from being shy toconfidently participating in class activities. We're so grateful!",
            rating: 5,
        },

    ]
    const plugin = React.useRef(Autoplay({
        delay: 5000,
        stopOnInteraction: true,
        stopOnMouseEnter: true
    }))
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{once:true}}
                className='relative w-full h:150 md:h-100'>
                <Carousel
                    plugins={[plugin.current]}
                    className='w-full h-full'
                    opts={{
                        loop: true,
                        dragFree: false
                    }}>
                    <CarouselContent className='h-full'>
                        {heroSlides.map((slide, index) => {
                            return (
                                <CarouselItem key={index} className='h-full'>
                                    <div className="relative w-full h-full">
                                        {/* background image */}
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                            className='object-cover object-top'
                                            priority={index === 0}
                                            quality={85} />
                                        {/* gradient overlay */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/10 to-transparent z-10" />
                                        {/* content */}
                                        <div className='relative z-20 h-full flex flex-col items-center justify-center py-4 md:py-8 text-center text-white px-6 md:px-12 max-w-5xl mx-auto'>
                                            <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 drop-shadow-lg">
                                                {slide.title}
                                            </div>
                                            <p className="text-xl md:text-2xl mb-10 max-w-2xl drop-shadow-md">
                                                {slide.subTitle}
                                            </p>
                                            <div className="flex flex-col gap-4 sm:flex-row mb-6">
                                                <Button size={"lg"} className='text-lg px-10 bg-brand-primary hover:bg-blue-800 hover:border-sm hover:border-brand-primary' asChild>
                                                    <Link href='/login'>Get Started</Link>
                                                </Button>
                                                <Button size={"lg"} variant='outline'
                                                    className='text-lg px-10 border-brand-primary text-brand-primary hover:text-brand-primary hover:text-blue-800' asChild>
                                                    <Link href='/about'>Learn More</Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                    <CarouselDots className="absolute bottom-8 left-1/2 -translate-x-1/2" />
                </Carousel>
            </motion.div>
            <section>
                {/* About section */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{once:true}}
                    className='py-5 md:py-10 bg-muted/20'>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-7xl space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="relative overflow-hidden rounded-xl shadow-xl aspect-5/3">
                                <Image
                                    src="/images/playground3.jpg"
                                    alt='one mission school building image'
                                    fill
                                    className='object-cover'
                                    quality={100}
                                    priority />
                            </div>
                            <div className='space-y-6'>
                                <h2 className="text-xl font-bold tracking-tight">
                                    About One Mission School
                                </h2>
                                <p className="text-muted-foreground leading-relaxed text-md">
                                    At One Mission School, we have been nuturing young minds since <strong>2008</strong>.
                                    We are commited to providing quality education from nursery through primary levels, and
                                    now extending our reach through our innovative learning plaform for JSS3 and SSS3 students.
                                    We blend academic excellence with character development, preparing students not just for exams but for life.
                                </p>{/* 
                                <p className="text-muted-foreground leading-relaxed text-md">
                                    Our modern facilities,experienced teachers, comprehensive curriculum and a strong focus on values,
                                    creativity and critical thinking ensures that every child is adequately equipped with the resources to excel.
                                </p> */}
                                <div className="pt-1">
                                    <Button size={'lg'} className='bg-brand-primary hover:bg-blue-700' asChild>
                                        <Link href={'/about'} className='text-white'>
                                            Learn More About Us
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.article>
                {/* Our Programs */}
                <motion.article
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{once:true}}
                    className='py-5 md:py-10 bg-background'>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl space-y-5">
                        <div className="text-center-mb-12  py-3">
                            <h2 className="text-xl text-center font-bold tracking-tight">
                                Our Academic Programs
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {programsList.map((item) => {
                                const Icon = item.icon
                                return (
                                    <Card key={item.level} className='border-2 hover:border-brand-primary transition-all duration-300 hover:shadow-xl group'>
                                        <CardHeader className='text-center pb-2'>
                                            <div className={`mx-auto mb-4 p-4 rounded-full ${item.color} transition-colors`}>
                                                <Icon className='h-10 w-10' />
                                            </div>
                                            <CardTitle className='text-xl'>{item.level}</CardTitle>
                                            <CardDescription className='text-base'>{item.age}</CardDescription>
                                        </CardHeader>
                                        <CardContent className='text-center'>
                                            <p className="text-muted-foreground mb-3 min-h-20 text-md">
                                                {item.description}
                                            </p>
                                            <Button variant={`secondary`} className='w-50 md:w-30 lg:w-50 bg-brand-primary hover:bg-blue-800' asChild>
                                                <Link href={'/programs'} className='text-white'>Learn More</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </motion.article>
                {/* Introducing the LMS platform */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{once:true}}
                    className='py-5 md:py-10 bg-muted/20'>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl space-y-5">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className='space-y-6'>
                                <h2 className="text-xl font-bold tracking-tight">
                                    Introducing Our Online Learning Platform
                                </h2>
                                <Separator />
                                <ul className="space-y-2">
                                    {lmsFeatures.map((item) => {
                                        return (
                                            <li key={item.id} className='h-5 flex gap-2 items-center justify-center'>
                                                {/* green checklist */}
                                                <div className="mt-1 shrink-0">
                                                    <div className="rounded-full bg-green-100">
                                                        <CheckCircle2 className='h-6 w-6 text-green-600' strokeWidth={3} />
                                                    </div>
                                                </div>
                                                {/* text content */}
                                                <div className="flex-1">
                                                    <h3 className="text-md font-semibold mb-2 text-foreground">
                                                        {item.tite}
                                                    </h3>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <div className="pt-4">
                                    <Button size={'lg'} className='bg-brand-primary hover:bg-blue-800' asChild>
                                        <Link href={'/about'} className='text-white'>
                                            Start Learning Today
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative overflow-hidden rounded-xl shadow-xl aspect-5/3">
                                <Image
                                    src="/images/lms.png"
                                    alt='one mission school building image'
                                    fill
                                    className='object-cover'
                                    priority />
                            </div>
                        </div>
                    </div>
                </motion.article>
                {/* why choose us section */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{once:true}}
                    className='py-5 md:py-10 bg-background'>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl space-y-5">
                        <div className="text-center mb-4">
                            <h2 className="text-xl font-bold tracking-tight">
                                Why Choose One Mission School
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                                We create a nuturing environment where every child can thrive academically,socially and personally.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {whyUs.map((item) => {
                                const Icon = item.icon
                                return (
                                    <Card key={item.color}
                                        className="border-2 hover:border-brand-primary transition-all duration-300 hover:shadow-xl group">
                                        <CardHeader>
                                            <div className="flex flex-col items-center text-center">
                                                <div className={`mb-6 p-4 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${item.color}`}>
                                                    <Icon className='h-10 w-10 md:h-12 md:w-12' strokeWidth={1.8} />
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div>
                                                <h3 className="text-center text-xl md:text-2xl font-semibold mb-4">{item.title}</h3>
                                                <p className="text-center text muted foreground leading-relaxed">{item.description}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </motion.article>
                {/* Testimonials */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{once:true}}
                    className=' bg-background'>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl space-y-5">
                        <div className="text-center mb-4">
                            <h2 className="text-xl font-bold tracking-tight">
                                What Parents and Students Say
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                                Hear directly from our wonderful school community about their experiences
                            </p>
                        </div>
                        <Carousel
                            plugins={[plugin.current]}
                            opts={{ loop: true, align: "start" }}
                            className="w-full"
                        >
                            <CarouselContent
                                className='-ml-2 md:-ml-4'
                            >
                                {testimonials.map((item) => {
                                    return (
                                        <CarouselItem
                                            key={item.name}
                                            className='pl-4 basis-full md:basis-1/2 lg:basis-1/3'>
                                            <Card className='h-full border-2 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300'>
                                                <CardContent className='p-3 flex flex-col h-full'>
                                                    <div className="mb-4 text-indigo-500 rounded-full">
                                                        <Quote className='h-4 w-4 ' />
                                                    </div>
                                                    <blockquote className="flex-1 text-sm leading-relaxed text-forground mb-6">
                                                        "{item.quote}"
                                                    </blockquote>
                                                    <div className="flex items-center gap-4 mt-auto">
                                                        <Avatar className='h-12 w-12 border-2 border-background'>
                                                            <AvatarImage alt={item.name} src={item.image} />
                                                            <AvatarFallback>
                                                                {item.name.split("").map((n) => n[0]).join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-semibold">{item.name}</p>
                                                            <p className="text-sm text-muted-forground">{item.role}</p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    )
                                })}
                            </CarouselContent>
                            <CarouselDots className="absolute bottom-8 left-1/2 -translate-x-1/2" />
                        </Carousel>
                    </div>
                </motion.article>
                {/* call to action section */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{once:true}}
                    className='relative py-5 md:py-10 bg-background overflow-hidden'>
                    {/* colorful background gradient */}
                    <div className="absolute inset-0 bg-linear-to-br from-teal-100 via-indigo-100 to-transparent" />
                    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_20%,#fefcbf_0%,transparent_50%)]" />
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl space-y-5 relative z-10">
                        <div className="max-w-4xl mx-auto text-center space-y-3">
                            <h2 className="text-xl font-bold tracking-tight text-foreground">
                                Ready to Start Your Child's Bright Future At One Mission School?
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                Join our warm, nuturing community where every child is encouraged to learn, grow and shine
                            </p>
                            <div className="">
                                <Button size={'lg'} className='m-2 bg-brand-primary hover:bg-blue-800 rounded-xl text-lg px-10 py-7 shadow-lg hover-shadow-xl transition-all group'>
                                    <Link href={'/signup'} className='text-white'>
                                        Enroll Today
                                    </Link>
                                </Button>
                                <Button size={'lg'} variant={'outline'} className=' m-2 rounded-xl text-lg px-10 py-7 shadow-lg hover-shadow-xl transition-all group' >
                                    <Link href={'/about'} className='text-brand-primary'>
                                        Access Online Learning
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.article>
            </section>
        </>
    );
}
