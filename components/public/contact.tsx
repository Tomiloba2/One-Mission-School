"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Phone,
    Mail,
    MessageCircle,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Linkedin,
    Clock,
} from "lucide-react";

export default function PublicContact() {
    return (
        <div>
            {/* Page Header */}
            <motion.section initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="bg-linear-to-br from-teal-100 via-indigo-100 to-transparent py-16 md:py-24">
                <div className="container px-4 md:px-6 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        We’d love to hear from you! Reach out with any questions, inquiries, or feedback.
                    </p>
                </div>
            </motion.section>

            {/* Quick Contact Options */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }} className="py-12 md:py-16 bg-background">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                Icon: Phone,
                                Title: "Call Us",
                                Detail: "+234-803-358-8330",
                                Action: "Call Now",
                                Href: "tel:+2348033588330",
                                color: "bg-blue-50 text-blue-400",
                                border: "hover:border-blue-100"
                            },
                            {
                                Icon: Mail,
                                Title: "Email Us",
                                Detail: "onemissionschool2008@gmail.com",
                                Action: "Email Us",
                                Href: "mailto:onemissionschool2008@gmail.com",
                                color: "bg-rose-50 text-rose-400",
                                border: "hover:border-rose-100"
                            },
                            {
                                Icon: MessageCircle,
                                Title: "WhatsApp",
                                Detail: "+234-803-358-8330",
                                Action: "Chat Now",
                                Href: "https://wa.me/2348033588330",
                                color: "bg-green-50 text-green-400",
                                border: "hover:border-green-100"
                            },
                            {
                                Icon: MapPin,
                                Title: "Visit Us",
                                Detail: "17 wisdom Estate Ibadan, Oyo State",
                                Action: "Get Directions",
                                Href: "https://maps.app.goo.gl/4WQJDQ6kTuNhMyNA6",
                                color: "bg-amber-50 text-amber-400",
                                border: "hover:border-amber-100"
                            },
                        ].map((option) => {
                            const Icon = option.Icon;
                            return (
                                <Card key={option.Title} className={`text-center border-2 ${option.border} transition-all`}>
                                    <CardContent className="pt-8 pb-6">
                                        <div className={`mx-auto mb-4 p-4  w-20 h-20 rounded-full ${option.color} transition-colors`}>
                                            <Icon className='h-10 w-10 mx-auto' />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{option.Title}</h3>
                                        <p className="text-muted-foreground mb-6">{option.Detail}</p>
                                        <Button variant="outline" asChild className={`${option.color}`}>
                                            <a href={option.Href} target={option.Title === "Visit Us" ? "_blank" : undefined} rel="noopener noreferrer">
                                                {option.Action}
                                            </a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* Contact Form + Info */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="py-16 md:py-24 bg-muted/30">
                <div className="container px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Form */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold tracking-tight">Send Us a Message</h2>

                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Your Name </Label>
                                        <Input id="name" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address </Label>
                                        <Input id="email" type="email" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number </Label>
                                    <Input id="phone" type="tel" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject </Label>
                                    <Input id="subject" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="inquiry">I am inquiring about:</Label>
                                    <Select required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Please Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="general">General Inquiry</SelectItem>
                                            <SelectItem value="admissions">Admissions</SelectItem>
                                            <SelectItem value="online">Online Learning</SelectItem>
                                            <SelectItem value="tour">School Tour Request</SelectItem>
                                            <SelectItem value="fees">Fee Information</SelectItem>
                                            <SelectItem value="tech">Technical Support</SelectItem>
                                            <SelectItem value="employment">Employment</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Your Message </Label>
                                    <Textarea id="message" rows={6} required />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox id="privacy" required />
                                    <Label htmlFor="privacy" className="text-sm">
                                        I agree to the{" "}
                                        <Link href="/privacy" className="text-primary hover:underline">
                                            Privacy policy
                                        </Link>
                                    </Label>
                                </div>

                                <Button size="lg" variant={"outline"} className="w-full md:w-auto bg-brand-primary text-white hover:bg-white hover:text-blue-500 transition-colors">
                                    Send Message
                                </Button>

                                <p className="text-sm text-muted-foreground">
                                    We typically respond within 24 hours.
                                </p>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-amber-500" /> School Address
                                        </h4>
                                        <p className="text-muted-foreground">
                                            17 Wisdom Estate Aafin-iyanu Eleyele<br />
                                            Ibadan, Oyo State<br />
                                            Nigeria
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">Phone Numbers</h4>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li>Main Office: +234-803-358-8330</li>
                                            <li>Admissions: +234-708-474-7462</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">Email Addresses</h4>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li>General: onemissionschool2008@gmail.com</li>
                                            <li>Admissions: bolanleomojola@yahoo.com</li>
                                            <li>Online Learning Support: support@schoolname.edu.ng</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <Clock className="h-5 w-5 text-blue-500" /> Office Hours
                                        </h4>
                                        <ul className="space-y-1 text-muted-foreground">
                                            <li>Monday – Friday: 7:30 AM – 6:00 PM</li>
                                            <li>Saturday: 9:00 AM – 2:00 PM</li>
                                            <li>Sunday: Closed</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-4">Social Media</h4>
                                        <div className="flex flex-wrap gap-6">
                                            <Button variant="outline" size="icon" asChild>
                                                <a href="https://instagram.com/schoolname" target="_blank" rel="noopener noreferrer">
                                                    <span>
                                                        <Facebook className='h-20 w-20 mx-auto border-blue-500 text-blue-500' />
                                                    </span>

                                                </a>
                                            </Button>
                                            <Button variant="outline" size="icon" asChild>
                                                <a href="https://instagram.com/schoolname" target="_blank" rel="noopener noreferrer">
                                                    <span>
                                                        <Instagram className='h-20 w-20 mx-auto border-rose-500 text-rose-500' />
                                                    </span>
                                                </a>
                                            </Button>
                                            <Button variant="outline" size="icon" asChild>
                                                <a href="https://instagram.com/schoolname" target="_blank" rel="noopener noreferrer">
                                                    <span>
                                                        <Linkedin className='h-20 w-20 mx-auto border-indigo-500 text-indigo-500' />
                                                    </span>

                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Embedded Map */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="py-16 md:py-24 bg-background">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
                        📍 Find Us on the Map
                    </h2>

                    <div className="relative overflow-hidden rounded-xl shadow-2xl" style={{ aspectRatio: "16/9" }}>
                        {/* Replace with your actual Google Maps embed iframe code */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.416955271111!2d3.8380190740696793!3d7.419021412111324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d50d2d8facb%3A0x5e5708860a02baed!2sOne%20Mission%20School!5e0!3m2!1sen!2sng!4v1770735354655!5m2!1sen!2sng"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="One Mission School Location Map"></iframe>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <Button asChild className="bg-brand-primary hover:bg-white hover:border-brand-primary hover:text-brand-primary transition-colors">
                            <a href="https://maps.app.goo.gl/4WQJDQ6kTuNhMyNA6" target="_blank" rel="noopener noreferrer">
                                Get Directions
                            </a>
                        </Button>
                        <Button variant="outline" asChild className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-colors">
                            <a href="https://maps.app.goo.gl/4WQJDQ6kTuNhMyNA6" target="_blank" rel="noopener noreferrer">
                                View Larger Map
                            </a>
                        </Button>
                    </div>
                </div>
            </motion.section>
            {/* FAQ Teaser */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }} className="py-16 md:py-24 bg-background text-center">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Can’t find what you’re looking for? Check out our FAQ section for quick answers to common questions.
                    </p>
                    <Button size="lg" variant="outline" className="bg-brand-primary text-white hover:bg-white hover:border-brand-primary hover:text-blue-500 transition-colors" asChild>
                        <Link href="/faq">View All FAQs →</Link>
                    </Button>
                </div>
            </motion.section>
        </div>
    );
}
