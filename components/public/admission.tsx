"use client"

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Baby, BookOpen, Laptop, Calendar, CheckCircle2, Users, Clock, FileText, Mail, Phone, MapPin } from "lucide-react";

export default function PublicAdmissions() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Page Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative h-[50vh] min-h-100 w-full overflow-hidden">
        <Image
          src="/images/graduation.jpg" // ← welcoming image of smiling students/parents
          alt="Join Our School Family"
          fill
          className="object-cover brightness-[0.65]"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/10 to-transparent" />
        <div className="relative z-10 container h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 drop-shadow-lg">
            Admissions
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl drop-shadow-md">
            Start your child’s journey with us – simple, supportive, and exciting
          </p>
        </div>
      </motion.section>

      {/* Admission Pathways */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
            Choose Your Pathway
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                color: "bg-orange-50 text-orange-600",
                Title: "Nursery",
                Icon: Baby,
                Bullets: [
                  "Ages 2–5 (Playgroup to Nursery 2)",
                  "Play-based, nurturing environment",
                  "Focus on social skills, creativity & early learning",
                  "Small classes (5:1 ratio)",
                ],
              },
              {
                color: "bg-teal-50 text-teal-600",
                Title: "Primary",
                Icon: BookOpen,
                Bullets: [
                  "Primary 1–5",
                  "Strong academic foundation + character building",
                  "Core subjects + enrichment (arts, sports, STEM)",
                  "Balanced school hours with extracurriculars",
                ],
              },
              {
                color: "bg-indigo-50 text-indigo-600",
                Title: "Online Learning",
                Icon: Laptop,
                Bullets: [
                  "JSS3 & SSS3",
                  "Flexible blended/online format",
                  "Live classes + recorded sessions",
                  "WAEC/JAMB preparation support",
                ],
              },
            ].map((path) => {
              const Icon = path.Icon;
              return (
                <Card key={path.Title} className="border-2 hover:border-primary/50 transition-all">
                  <CardHeader className="text-center">
                    <div className={`mx-auto mb-4 p-4 rounded-full ${path.color} transition-colors`}>
                      <Icon className='h-10 w-10' />
                    </div>

                    <CardTitle className="text-2xl">{path.Title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {path.Bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-brand-primary hover:bg-blue-800" asChild>
                      <Link href="/admissions/apply" className='text-white'>Apply Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Admission Process Timeline (Physical School) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
            Admission Process Timeline – Physical School
          </h2>

          <div className="space-y-8 max-w-4xl mx-auto">
            {[
              {
                Step: 1,
                Title: "Enquiry & Form Collection",
                Desc: "Contact us or visit the school to get information and purchase the admission form.",
              },
              {
                Step: 2,
                Title: "Form Submission",
                Desc: "Submit completed form with required documents (birth certificate, passport photos, previous results if applicable).",
              },
              {
                Step: 3,
                Title: "Assessment / Entrance Test",
                Desc: "Child attends scheduled assessment (play-based for nursery, written for primary). Parents may have a short interview.",
              },
              {
                Step: 4,
                Title: "Offer & Acceptance",
                Desc: "Receive admission offer letter. Pay acceptance fee and complete registration within the given timeframe.",
              },
              {
                Step: 5,
                Title: "Orientation & Start",
                Desc: "Attend orientation day. Child begins classes on resumption date.",
              },
            ].map((item) => (
              <div key={item.Step} className="flex gap-6 items-start">
                <div className="shrink-0 w-16 h-16 rounded-full bg-teal-500 text-white flex items-center justify-center text-2xl font-bold">
                  {item.Step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.Title}</h3>
                  <p className="text-muted-foreground">{item.Desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section >

      {/* Fee Structure */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
            Fee Structure
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Physical School */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-center">Physical School</h3>
              <div className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-teal-50 p-4 font-semibold">Nursery</div>
                  <div className="p-4 space-y-2">
                    <p>Tuition: ₦80,000 – ₦120,000</p>
                    <p>Registration (one-time): ₦20,000</p>
                    <p>Uniform & Books: ₦40,000 – ₦60,000</p>
                    <p className="text-sm text-muted-foreground">Additional: Development Levy, PTA, etc.</p>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-teal-50 p-4 font-semibold">Primary</div>
                  <div className="p-4 space-y-2">
                    <p>Tuition: ₦100,000 – ₦150,000</p>
                    <p>Registration (one-time): ₦25,000</p>
                    <p>Uniform & Books: ₦50,000 – ₦80,000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Online Platform */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-center">Online Learning Platform</h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-teal-50 p-4 font-semibold">JSS3 & SSS</div>
                <div className="p-4 space-y-2">
                  <p>Monthly Plan:₦5,000</p>
                  <p>Quarterly Plan:₦13,000</p>
                  <p>Annual: ₦45,000</p>
                  <p className="text-sm text-muted-foreground">Includes unlimited access to all subjects, materials, live sessions, practice tests and progress tracking</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center mt-8 text-muted-foreground text-sm">
            Fees are subject to change. Contact admissions for current rates and payment plans.
          </p>
        </div>
      </motion.section>

      {/* Admission Requirements Checklists */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
            Admission Requirements
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                Title: "Nursery",
                Items: [
                  "Child's birth certificate",
                  "2 passport photographs",
                  "Immunization record",
                  "Parent/guardian ID",
                  "Medical report if any special needs",
                ],
              },
              {
                Title: "Primary",
                Items: [
                  "Previous school report card / transfer certificate",
                  "Birth certificate",
                  "Passport photographs (child & parents)",
                  "Immunization & medical records",
                  "Entrance assessment performance",
                ],
              },
              {
                Title: "Online Learning",
                Items: [
                  "Valid email address",
                  "Student full name and date of birth",
                  "Current class(JSS3 or SSS3)",
                  "Stable internet device & connection declaration",
                  "Parent consent & contact details",
                ],
              },
            ].map((req) => (
              <Card key={req.Title}>
                <CardHeader>
                  <CardTitle>{req.Title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {req.Items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>When can I apply?</AccordionTrigger>
              <AccordionContent>
                Admissions are open year-round subject to availability. Main intake is before each term begins.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is there an entrance exam?</AccordionTrigger>
              <AccordionContent>
                Nursery: Informal play-based assessment. Primary: Written test in basic subjects. Online: Review of previous results.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do you offer scholarships?</AccordionTrigger>
              <AccordionContent>
                Yes, limited merit and need-based scholarships are available. Contact admissions for details.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What is the uniform policy?</AccordionTrigger>
              <AccordionContent>
                Uniforms are compulsory and available for purchase from the school shop.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I pay fees in installments?</AccordionTrigger>
              <AccordionContent>
                Yes, flexible payment plans are available upon request after acceptance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </motion.section>

      {/* Contact Us */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
            Contact Admissions
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-indigo-500 mt-1" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-muted-foreground">No 17 Wisdom Estate Aafin-iyanu Eleyele, Ibadan, Oyo State</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-muted-foreground">+234 803 358 8330</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-rose-500" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href='mailto:onemissionschool2008@gmail.com' className="text-primary hover:underline">
                    onemissionschool2008@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Quick Enquiry</h3>
              <form className="space-y-4">
                <Input placeholder="Your Name" />
                <Input placeholder="Email Address" type="email" />
                <Input placeholder="Phone Number" />
                <Textarea placeholder="Your Message / Questions" rows={4} />
                <Button type="submit" className="w-full bg-brand-primary hover:bg-blue-800 transittion-colors">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section (similar to home) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative py-20 md:py-28 overflow-hidden bg-linear-to-br from-teal-100 via-indigo-100 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl space-y-5 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Ready to Join Our School Family?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Take the first step toward a bright future for your child. We’re here to guide you.
            </p>
            <Button size="lg" variant={"outline"} className="text-lg px-10 py-7  rounded-lg bg-brand-primary hover:bg-blue-800 transition-colors" asChild>
              <Link href="/admissions/apply" className="text-white">
                Start Application Now <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
