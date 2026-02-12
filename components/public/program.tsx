"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  Baby,
  BookOpen,
  GraduationCap,
  Clock,
  Users,
  Book,
  Pencil,
  Calculator,
  Globe,
  Beaker,
  Palette,
  Music,
  Heart,
  Dumbbell,
  Download,
  FileText,
  ArrowRight,
  Laptop,
  Video,
  Calendar,
  ShieldCheck,
} from "lucide-react";

export default function PublicProgram() {
  const [activeTab, setActiveTab] = useState("nursery");

  return (
    <div className="">
      {/* Page Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative h-[50vh] min-h-100 w-full overflow-hidden">
        <Image
          src="/images/career4.jpg" // ← wide image of students in different programs
          alt="Our Academic Programs"
          fill
          className="object-cover brightness-[0.65]"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/10 to-transparent" />
        <div className="relative z-10 container h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 drop-shadow-lg">
            Our Academic Programs
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl drop-shadow-md">
            From playful beginnings to confident futures – tailored learning at every stage
          </p>
        </div>
      </motion.section>

      {/* Programs Tabs */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl space-y-5">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 rounded-lg border bg-muted p-1">
              <TabsTrigger value="nursery" className="text-base md:text-lg">Nursery</TabsTrigger>
              <TabsTrigger value="primary" className="text-base md:text-lg">Primary</TabsTrigger>
              <TabsTrigger value="online" className="text-base md:text-lg">LMS</TabsTrigger>
            </TabsList>

            {/* Nursery Tab */}
            <TabsContent value="nursery" className="space-y-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image on right */}
                <div className="order-2 lg:order-2 relative aspect-4/3 rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/creche (2).jpg"
                    alt="Happy nursery children learning"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text on left */}
                <div className="order-1 lg:order-1 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Nursery Program</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Ages 2-5 | Play-based, nurturing environment that builds confidence, curiosity, social skills, and early literacy/numeracy foundations.
                  </p>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div className="p-6 bg-muted/50 rounded-lg">
                      <Users className="mx-auto h-8 w-8 text-amber-500 mb-2" />
                      <p className="font-semibold">Small Classes</p>
                      <p className="text-sm text-muted-foreground">Max 15–18 children</p>
                    </div>
                    <div className=" p-6 bg-muted/50 rounded-lg">
                      <Users className="mx-auto h-8 w-8 text-teal-500 mb-2" />
                      <p className="font-semibold">Student:Teacher Ratio</p>
                      <p className="text-sm text-muted-foreground">5:1</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Classes Offered */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-center">Classes Offered</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {["Playgroup (Ages 2–3)", "Nursery 1 (Ages 3–4)", "Nursery 2 (Ages 4–5)"].map((cls) => (
                    <Card key={cls}>
                      <CardHeader>
                        <CardTitle className="text-center">{cls}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Daily Schedule & Curriculum Highlights */}
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Daily Schedule</h3>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-teal-500" /> 07:30 – Arrival & Free Play</li>
                    <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-teal-500" /> 08:00 – Morning Circle & Songs</li>
                    <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-teal-500" /> 09:00 – Focused Activities</li>
                    <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-teal-500" /> 11:00 – Outdoor Play & Snack</li>
                    <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-teal-500" /> 13:00 – Story Time & Departure</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-6">Curriculum Highlights</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3"><BookOpen className="h-5 w-5 text-indigo-500 mt-1" /> Early Literacy & Phonics</li>
                    <li className="flex items-start gap-3"><Calculator className="h-5 w-5 text-amber-500 mt-1" /> Number Sense & Counting</li>
                    <li className="flex items-start gap-3"><Palette className="h-5 w-5 text-orange-500 mt-1" /> Creative Arts & Crafts</li>
                    <li className="flex items-start gap-3"><Dumbbell className="h-5 w-5 text-teal-500 mt-1" /> Gross & Fine Motor Skills</li>
                    <li className="flex items-start gap-3"><Heart className="h-5 w-5 text-rose-500 mt-1" /> Social-Emotional Learning</li>
                  </ul>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Button size="lg" variant="outline" className="border-brand primary text-brand-primary hover:text-white hover:bg-blue-800 transition-colors" asChild>
                  <a href="/curriculum/nursery.pdf" download>
                    <Download className="mr-2 h-5 w-5" /> Download Curriculum PDF
                  </a>
                </Button>
                <Button size="lg" asChild className="bg-brand-primary hover:bg-white hover:border-brand-primary hover:text-brand-primary transition-colors">
                  <Link href="/admissions/apply">
                    Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            {/* Primary Tab */}
            <TabsContent value="primary" className="space-y-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image on right */}
                <div className="order-2 lg:order-2 relative aspect-4/3 rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/classroom3.jpg"
                    alt="Primary school children in class"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text on left */}
                <div className="order-1 lg:order-1 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Primary Program</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Grades 1–6 | Strong academic foundation with emphasis on critical thinking, creativity, discipline, and character development.
                  </p>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <Clock className="mx-auto h-8 w-8 text-amber-500 mb-2" />
                      <p className="font-semibold">School Hours</p>
                      <p className="text-sm text-muted-foreground">07:30 – 14:30 (Mon–Fri)</p>
                    </div>
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <Users className="mx-auto h-8 w-8 text-indigo-500 mb-2" />
                      <p className="font-semibold">Student:Teacher Ratio</p>
                      <p className="text-sm text-muted-foreground">1:12 – 1:18</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Subjects Grid */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-center">Core Subjects</h3>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[
                    { color: 'text-emerald-600', icon: Book, label: "English Studies", },
                    { color: 'text-cyan-600', icon: Calculator, label: "Mathematics" },
                    { color: 'text-rose-600', icon: Globe, label: "Nigerian Language" },
                    { color: 'text-teal-600', icon: Beaker, label: "Basic Science & Tech" },
                    { color: 'text-indigo-600', icon: Palette, label: "Cultural & Creative Arts" },
                    { color: 'text-amber-600', icon: Heart, label: "Religion & National Values" },
                    { color: 'text-purple-600', icon: Dumbbell, label: "Physical & Health Education" },
                  ].map((sub) => {
                    const Icon = sub.icon;
                    return (
                      <Card key={sub.label} className="text-center">
                        <CardContent className="pt-6">
                          <Icon className={`mx-auto h-10 w-10 mb-4 ${sub.color}`} />
                          <p className="font-medium">{sub.label}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Additional Features List */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Additional Features</h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3"><BookOpen className="h-5 w-5 text-emerald-600 mt-1" /> French / Coding Basics (from Grade 4)</li>
                  <li className="flex items-start gap-3"><Music className="h-5 w-5 text-rose-600 mt-1" /> Music, Art, Drama & Clubs</li>
                  <li className="flex items-start gap-3"><ShieldCheck className="h-5 w-5 text-amber-600 mt-1" /> Character Education & Leadership</li>
                  <li className="flex items-start gap-3"><Pencil className="h-5 w-5 text-cyan-600 mt-1" /> Project-Based Learning</li>
                </ul>
              </div>

              {/* Assessment */}
              <div>
                <h3 className="text-2xl font-semibold mb-4">Assessment & Reporting</h3>
                <p className="text-muted-foreground">
                  Continuous assessment, mid-term & end-of-term exams, detailed report cards with teacher comments, parent-teacher meetings twice per term.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 flex-wrap">
                <Button variant="outline" size="lg" asChild className="border-brand-primary text-brand-primary hover:text-blue-800">
                  <a href="/reports/sample-report-card.pdf" download>
                    <FileText className="mr-2 h-5 w-5" /> View Sample Report Card
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild className="boder-brand-primary text-brand-primary hover:text-blue-800">
                  <a href="/curriculum/primary-overview.pdf" download>
                    <Download className="mr-2 h-5 w-5" /> Download Curriculum Overview
                  </a>
                </Button>
                <Button size="lg" asChild className="bg-brand-primary text-base hover:bg-blue-800">
                  <Link href="/admissions/apply">
                    Apply for Admission <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            {/* Online Learning Tab */}
            <TabsContent value="online" className="space-y-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Text on right */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Online Learning Program</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Blended / fully online for JSS3 & SSS1–3 | Flexible, high-quality education with live classes, recorded sessions, and personalized support.
                  </p>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div className="bg-muted/50 p-6 roun'ed-lg">
                      <Users className="mx-auto h-8 w-8 text-cyan-600 mb-2" />
                      <p className="font-semibold">Targeted Students</p>
                      <p className="text-sm text-muted-foreground">JSS3 & SSS1–SSS3</p>
                    </div>
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <Laptop className="mx-auto h-8 w-8 text-indigo-600 mb-2" />
                      <p className="font-semibold">Access</p>
                      <p className="text-sm text-muted-foreground">24/7 platform + scheduled live sessions</p>
                    </div>
                  </div>
                </div>
                {/* Image on left this time */}
                <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/lms.png"
                    alt="Student using online platform"
                    fill
                    className='object-cover'
                  />
                </div>
              </div>

              {/* Platform Features */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-center">Platform Features</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: Video, label: "Live & Recorded Classes", color: 'text-emerald-600' },
                    { icon: Calendar, label: "Interactive Timetable", color: 'text-cyan-600' },
                    { icon: BookOpen, label: "Digital Notes & Assignments", color: 'text-indigo-600' },
                    { icon: Users, label: "Small Virtual Classes", color: 'text-amber-600' },
                    { icon: GraduationCap, label: "Exam Prep (WAEC/JAMB)", color: 'text-rose-600' },
                    { icon: ShieldCheck, label: "Progress Tracking & Reports", color: 'text-teal-600' },
                  ].map((feat) => {
                    const Icon = feat.icon;
                    return (
                      <Card key={feat.label}>
                        <CardContent className="pt-6 text-center">
                          <Icon className={`mx-auto h-10 w-10 ${feat.color} mb-4`} />
                          <p className="font-medium">{feat.label}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Subjects Covered */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Subjects Covered</h3>
                <p className="text-muted-foreground">
                  Full WAEC/JAMB-aligned curriculum: English, Mathematics, Sciences (Biology, Chemistry, Physics), Civic Education, Literature, Economics, Government, CRS/IRS, Data Processing, and electives.
                </p>
              </div>

              {/* Subscription Plans (simple cards) */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-center">Subscription Plans</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { title: "Basic", price: "₦15,000/term", features: ["Core subjects", "Recorded lessons", "Assignments"] },
                    { title: "Standard", price: "₦25,000/term", features: ["Live classes", "Full subjects", "Weekly tests"] },
                    { title: "Premium", price: "₦40,000/term", features: ["All features + 1-on-1 tutoring", "Exam coaching", "Priority support"] },
                  ].map((plan) => (
                    <Card key={plan.title} className="text-center">
                      <CardHeader>
                        <CardTitle>{plan.title}</CardTitle>
                        <p className="text-2xl font-bold text-primary mt-2">{plan.price}</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {plan.features.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>
    </div>
  );
}
