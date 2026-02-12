// app/faq/page.tsx
"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const faqItems = [
  {
    Question: "When does the school academic session begin?",
    Answer: "The academic year typically begins in early September. Exact resumption dates are communicated via email, WhatsApp groups, and the school website at least 4 weeks in advance.",
  },
  {
    Question: "What documents are required for admission?",
    Answer: "Requirements vary by level:\n\n• Nursery/Pre-Nursery: Birth certificate, 2 passport photos, immunization record\n• Primary: Transfer certificate/report card from previous school, birth certificate, photos\n• Online Learning: Recent report card, birth certificate/age proof, passport photo",
  },
  {
    Question: "Do you offer scholarships or financial aid?",
    Answer: "Yes, we offer limited merit-based and need-based scholarships each year. Application forms are usually available in June/July. Contact the admissions office for current criteria.",
  },
  {
    Question: "What is the school uniform policy?",
    Answer: "Uniforms are compulsory Monday–Friday. They can be purchased from the school shop or approved vendors. Friday is cultural/casual day (approved traditional attire or school house wear).",
  },
  {
    Question: "How do parents receive updates and reports?",
    Answer: "We use WhatsApp class groups, the school mobile app (for registered parents), email newsletters, and physical report cards. Mid-term and end-of-term reports are issued every term.",
  },
  {
    Question: "Can parents visit the school outside open days?",
    Answer: "Yes, but visits must be scheduled in advance through the school office (Monday–Friday, 8 AM – 3 PM) to avoid disrupting classes. Walk-ins are discouraged for security reasons."
  },
  {
    Question: "Do you have boarding facilities?",
    Answer: "Currently we are a day school only. Boarding facilities are planned for the future expansion phase.",
  },
  {
    Question: "How can I contact the school in an emergency?",
    Answer: "Emergency hotline: +234-803-358-8330 (available 24/7)\nMain line: +234-708-474-7462 (office hours)",
  },
];

export default function FAQComp() {
  return (
    <div>
      {/* Header */}
      <motion.section initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }} className="bg-linear-to-br from-teal-100 via-indigo-100 to-transparent py-16 md:py-24">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find quick answers to the most common questions from parents and students
          </p>
        </div>
      </motion.section>

      {/* FAQ Content */}
      <motion.section initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }} className="py-12 md:py-20">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b py-4">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                  {item.Question}
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground leading-relaxed whitespace-pre-line">
                  {item.Answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? We’re happy to help!
            </p>
            <Button size="lg" variant={'outline'} asChild className="bg-brand-primary text-white hover:bg-white hover:border-blue-500 hover:text-blue-500 transition-colors">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
