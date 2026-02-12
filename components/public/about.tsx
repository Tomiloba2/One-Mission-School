"use client"

import * as React from 'react';
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Target,
  Eye,
  HeartHandshake
} from "lucide-react";
import { motion } from "framer-motion"

export interface IAboutPageProps {
}

export function PublicAbout(props: IAboutPageProps) {
  return (
    <div>
      {/* Page Header – Hero with overlay */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative h-[50vh] min-h-100 w-full overflow-hidden">
        <Image
          src={"/images/classroom2.jpg"} // ← your wide school photo
          alt="Our School Campus"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/10 to-transparent" />
        <div className="relative z-10 container h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 drop-shadow-lg">
            About One Mission School
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl drop-shadow-md">
            Nurturing minds, building character, shaping futures since 2008
          </p>
        </div>
      </motion.section>
      {/* Our Story */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-5 md:py-10 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl space-y-5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Vintage image */}
            <div
              className="relative aspect-5/3 rounded-xl overflow-hidden shadow-2xl border-8 border-white/80 sepia-[0.3] hover:sepia-0 transition-all duration-500">
              <Image
                src="/images/vintage.jpg"// ← old/black & white or vintage toned photo
                alt="Our school in its early days"
                fill
                className="object-cover"
              />
            </div>

            {/* Right: History */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Story</h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2008 by Mr and Mrs Omojola, One Mission School began as a small nursery with a vision to provide quality, value-based education in Ibadan.
                </p>
                <p>
                  Over the decades, we have grown steadily — adding primary in 2010, and most recently our innovative online learning platform — while remaining true to our core commitment to holistic child development.
                </p>
                <p>
                  Today we proudly serve hundreds of families, with modern facilities, dedicated educators, and a track record of excellence in academics, character, and leadership preparation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Mission, Vision, Values */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-5 md:py-10 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl space-y-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Guiding Principles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-card rounded-xl border shadow-sm p-8 text-center space-y-6 hover:shadow-md transition-shadow">
              <Target className="mx-auto h-14 w-14 text-teal-500" strokeWidth={1.5} />
              <h3 className="text-2xl font-semibold">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide a nurturing, inclusive, and stimulating environment that inspires lifelong learning, moral integrity, academic excellence, and responsible citizenship.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card rounded-xl border shadow-sm p-8 text-center space-y-6 hover:shadow-md transition-shadow">
              <Eye className="mx-auto h-14 w-14 text-blue-500" strokeWidth={1.5} />
              <h3 className="text-2xl font-semibold">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be a leading educational institution in Nigeria, recognized for producing confident, innovative, and value-driven global leaders.
              </p>
            </div>

            {/* Values */}
            <div className="bg-card rounded-xl border shadow-sm p-8 text-center space-y-6 hover:shadow-md transition-shadow">
              <HeartHandshake className="mx-auto h-14 w-14 text-rose-500" strokeWidth={1.5} />
              <h3 className="text-2xl font-semibold">Our Core Values</h3>
              <p className="text-muted-foreground leading-relaxed">
                Integrity • Excellence • Respect • Innovation • Service • Perseverance • Community
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Leadership */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-5 md:py-10 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
            Our Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {
              [
                {
                  Name: "Mrs. Omojola",
                  Title: "Proprietress / Founder",
                  Image: "/file.svg",
                  Desc: "Visionary leader with over 25 years in education…",
                },
                {
                  Name: "Mr. [Name]",
                  Title: "Head Teacher",
                  Image: "/file.svg",
                  Desc: "Dedicated administrator focused on academic standards…",
                },
                {
                  Name: "Ms. [Name]",
                  Title: "Head of Online School",
                  Image: "/file.svg",
                  Desc: "Expert in digital pedagogy and blended learning…",
                }
              ].map((leader) => (
                <div key={leader.Name} className="text-center space-y-4">
                  <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                    <Image
                      src={leader.Image}
                      alt={leader.Name}
                      fill
                      className="object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold">{leader.Name}</h3>
                  <p className="text-primary font-medium">{leader.Title}</p>
                  <p className="text-muted-foreground text-sm">{leader.Desc}</p>
                </div>
              )
              )
            }
          </div>
        </div>
      </motion.section>

      {/* Facilities Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-5 md:py-10 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl space-y-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Facilities</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Modern, safe, and inspiring spaces designed for learning and growth
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "/images/classroom1.jpg",
              "/images/creche2.jpg",
              "/images/playground3.jpg",
              "/images/arts (6).jpg",
              "/images/career1.jpg",
            ].map((src, i) => (
              <div key={i} className="relative aspect-4/3 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <Image src={src} alt={`Facility ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className='bg-brand-primary hover:bg-blue-800'>
              <Link href="/gallery">View Full Gallery →</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Accreditation & Affiliations */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-5 md:py-10 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
            Accreditation & Affiliations
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {[
              { src: "/images/oslogo.jpg", alt: "Oyo state ministry of education, science and technology" },
              { src: "/images/cac.jpg", alt: "Corporate Affairs Commision" },
              { src: "/images/trcn.jpg", alt: "Teachers Registration Council of Nigeria" }
            ].map((logo) => (
              <div key={logo.alt} className="grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={80}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
