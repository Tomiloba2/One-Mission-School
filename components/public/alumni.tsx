"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Users, Trophy, HeartHandshake, Calendar, Mail, Linkedin, Twitter } from "lucide-react";
import { color, motion } from "framer-motion";

export default function PublicAlumni() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative py-20 md:py-32 bg-linear-to-br from-teal-100 via-indigo-100 to-transparent overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Our Alumni Community
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Proud past students. Lifelong connections. Continuing the legacy.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" asChild className="bg-brand-primary hover:bg-blue-800">
                <Link href="/alumni/join">Join the Network</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-brand-primary text-brand-primary hover:text-brand-primary">
                <Link href="/alumni/update-profile">Update Your Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Alumni Stats */}
      <motion.section initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }} className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: "2,400+", label: "Registered Alumni", color: "text-teal-600" },
              { icon: GraduationCap, value: "38", label: "Graduating Classes", color: "text-amber-600" },
              { icon: Trophy, value: "120+", label: "Notable Achievements", color: "text-cyan-600" },
              { icon: HeartHandshake, value: "15", label: "Active Chapters", color: "text-indigo-600" },
            ].map((stat, i) => (
              <div key={i} className="space-y-3">
                <stat.icon className={`mx-auto h-12 w-12 ${stat.color}`} />
                <div className="text-4xl md:text-5xl font-bold">{stat.value}</div>
                <p className="text-muted-foreground text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Alumni */}
      <motion.section initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }} className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
            Meet Some of Our Distinguished Alumni
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Aisha Bello",
                year: "Class of 2008",
                role: "Cardiologist & Medical Researcher",
                image: "/file.svg",
                quote: "The foundation I received here shaped my passion for medicine and service.",
              },
              {
                name: "Engr. Tunde Adeyemi",
                year: "Class of 2012",
                role: "Software Engineer at Google",
                image: "/file.svg",
                quote: "Critical thinking and teamwork skills learned in school still guide my career.",
              },
              {
                name: "Barr. Fatima Okeke",
                year: "Class of 2005",
                role: "Human Rights Lawyer & Advocate",
                image: "/file.svg",
                quote: "Values of integrity and justice were instilled early – I carry them everywhere.",
              },
            ].map((alumnus) => (
              <Card key={alumnus.name} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="relative h-64">
                  <Image
                    src={alumnus.image}
                    alt={alumnus.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">{alumnus.name}</CardTitle>
                  <CardDescription>{alumnus.year} • {alumnus.role}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <blockquote className="italic text-muted-foreground">
                    “{alumnus.quote}”
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/alumni/directory">View Full Alumni Directory</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Carousel */}
      <motion.section initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
            Voices from Our Alumni
          </h2>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {[
                {
                  quote: "This school didn't just teach me subjects — it taught me how to think, lead, and serve.",
                  name: "Dr. Chinedu Eze",
                  role: "Neurosurgeon • Class of 2004",
                },
                {
                  quote: "The discipline and friendships I formed here remain some of the most valuable assets in my life.",
                  name: "Mrs. Zainab Ibrahim",
                  role: "Entrepreneur & Philanthropist • Class of 2010",
                },
                {
                  quote: "I still remember the teachers who believed in me when I didn't believe in myself.",
                  name: "Mr. Adewale Ojo",
                  role: "Tech Founder & CEO • Class of 2015",
                },
              ].map((testimonial, i) => (
                <CarouselItem key={i}>
                  <div className="p-6 md:p-12 bg-muted/40 rounded-2xl text-center max-w-3xl mx-auto">
                    <blockquote className="text-xl md:text-2xl italic mb-8">
                      “{testimonial.quote}”
                    </blockquote>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </motion.section>

      {/* Stay Connected */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4  py-6 max-w-7xl space-y-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Stay Connected with Your Alma Mater
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {[
              {
                color: "text-teal-600",
                bg: "bg-teal-50",
                icon: Calendar,
                title: "Events & Reunions",
                desc: "Homecoming, class reunions, career talks, networking nights",
              },
              {
                color: "text-amber-600",
                bg: "bg-amber-50",
                icon: HeartHandshake,
                title: "Give Back",
                desc: "Mentorship, guest lectures, scholarships, donations",
              },
              {
                color: "text-indigo-600",
                bg: "bg-indigo-50",
                icon: Mail,
                title: "Newsletter & Updates",
                desc: "Stay informed about school achievements and alumni news",
              },
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className={`mx-auto w-16 h-16 rounded-full ${item.bg} flex items-center justify-center`}>
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" variant="outline" asChild>
              <a href="https://linkedin.com/groups/school-alumni" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-blue-800">
                <Linkedin className="mr-2 h-5 w-5" /> LinkedIn Alumni Group
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://twitter.com/schoolalumni" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-blue-800">
                <Twitter className="mr-2 h-5 w-5" /> Follow on X
              </a>
            </Button>
            <Button size="lg" className="bg-brand-primary hover:bg-blue-800" asChild>
              <Link href="/alumni/register">Join the Alumni Network</Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}