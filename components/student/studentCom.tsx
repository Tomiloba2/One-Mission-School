// app/dashboard/page.tsx (updated with hamburger, search, notifications, and profile dropdowns)
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageSquare, Search, User, BookOpen, Calendar, Trophy, Video, CheckCircle2, Clock, Play, Menu, LogOut, Settings, Palette, BarChart2, HelpCircle, Flame, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/lib/auth-client';


// Mock data - replace with Supabase
const user = {
    name: 'Chioma Adeyemi',
    class: 'Primary 5A',
    avatar: '/avatars/chioma.jpg',
    email: 'student@school.com',
};

const stats = [
    { icon: BookOpen, label: 'Courses', value: '6 enrolled', color: 'text-blue-500' },
    { icon: Trophy, label: 'Progress', value: '78% average', color: 'text-green-500' },
    { icon: Clock, label: 'Time Spent', value: '12h 34m this week', color: 'text-purple-500' },
    { icon: CheckCircle2, label: 'Badges', value: '8 earned', color: 'text-amber-500' },
];

const upcoming = [
    { type: 'live', title: 'Mathematics - Fractions and Decimals', teacher: 'Mrs. Johnson', time: '10:00 AM - 11:00 AM', urgent: true },
    { type: 'assignment', title: 'English - Reading Comprehension', due: 'Tomorrow, 11:59 PM', status: 'Not started' },
    { type: 'test', title: 'Science - States of Matter Quiz', details: '10 questions • 15 min • 2 attempts' },
];

const continueLearning = [
    { title: 'Fractions Intro', subject: 'Mathematics', progress: '12:45 / 18:30', type: 'video' },
    { title: 'Grammar: Tenses', subject: 'English', progress: 'Completed', type: 'video' },
    { title: 'Photosynthesis Notes', subject: 'Science', progress: 'Page 3 of 8', type: 'document' },
];

const courses = [
    { subject: 'Mathematics', progress: 75, next: 'Lesson 16 - Converting Fractions to Decimals' },
    { subject: 'English Language', progress: 60, next: 'Lesson 13 - Reading Comprehension Strategies' },
    { subject: 'Basic Science', progress: 90, next: 'Lesson 19 - Energy and Work' },
];

const shorts = [
    { title: 'Quick Math Trick for 9x Table', duration: '0:45', likes: 234 },
    { title: 'Grammar Tip: Their vs There', duration: '1:20', likes: 189 },
    { title: 'Science Experiment at Home', duration: '0:58', likes: 456 },
    { title: 'Ancient Egypt Fun Fact', duration: '1:10', likes: 321 },
];

const results = [
    { subject: 'Mathematics - Fractions Quiz', score: '85/100 (85%)', date: 'Jan 27, 2026', status: 'PASSED' },
    { subject: 'English - Comprehension Test', score: '72/100 (72%)', date: 'Jan 25, 2026', status: 'PASSED' },
    { subject: 'Science - Matter & Energy Quiz', score: '92/100 (92%)', date: 'Jan 23, 2026', status: 'PASSED' },
];

const achievements = [
    '🥇 Fast Learner', '⭐ Star Student', '🎯 Sharp Shooter', '📚 Book Worm',
    '🔥 5-Day Streak', '👑 Top Student', '💎 Perfect Score', '🚀 Perfect Attendance',
];

const streak = [true, true, true, true, true, false, false]; // Mon-Sun

const announcements = [
    { title: 'New Science Course Available!', desc: 'We\'ve added an exciting new course on "The Solar System". Check it out!', time: '2 hours ago' },
    { title: 'Mid-Term Break Reminder', desc: 'School will be closed from Feb 15-19. All online activities suspended.', time: 'Yesterday' },
];



export default function StudentDashboard() {
    const { data: session, isPending } = useSession()
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl space-y-5">
                {/* Welcome Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-xl bg-linear-to-r from-primary/10 to-primary/5 p-6 md:p-8"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">
                                Good Morning, {session?.user.name.split(' ')[0]}! 👋
                            </h1>
                            <p className="text-muted-foreground mt-1">Class: {user.class}</p>
                            <p className="mt-3 text-muted-foreground">
                                You have 2 live classes today and 1 assignment due soon.
                            </p>
                        </div>
                        <Button>View Today's Schedule →</Button>
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Card className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6 text-center">
                                    <div className={cn("mx-auto mb-2 rounded-full p-3 w-12 h-12 flex items-center justify-center bg-muted/50", stat.color)}>
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    <p className="text-xl font-bold mt-1">{stat.value}</p>
                                    <Button variant="link" className="mt-2 p-0 h-auto text-xs text-primary">
                                        View
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Upcoming */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" /> Coming Up
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {upcoming.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div className="space-y-2">
                                    <Badge variant={item.type === 'live' ? 'destructive' : 'secondary'}>
                                        {item.type.toUpperCase()}
                                    </Badge>
                                    <h3 className="font-medium">{item.title}</h3>
                                    {item.teacher && <p className="text-sm text-muted-foreground">Teacher: {item.teacher}</p>}
                                    {item.time && <p className="text-sm text-muted-foreground">{item.time}</p>}
                                    {item.due && <p className="text-sm text-muted-foreground">{item.due}</p>}
                                    {item.details && <p className="text-sm text-muted-foreground">{item.details}</p>}
                                    <Button variant="outline" size="sm" className="mt-2">
                                        {item.type === 'live' ? 'Join When Ready' : item.type === 'assignment' ? 'Start Assignment' : 'Start Test'}
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                        <Button variant="link" className="w-full mt-4">View Full Schedule →</Button>
                    </CardContent>
                </Card>

                {/* Continue Learning */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Play className="h-5 w-5" /> Continue Learning
                        </CardTitle>
                        <CardDescription>Pick up where you left off</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="w-full whitespace-nowrap pb-4">
                            <motion.div className="flex gap-4" initial="hidden" animate="visible">
                                {continueLearning.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                                        transition={{ delay: i * 0.1 }}
                                        className="min-w-50 max-w-50"
                                    >
                                        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                            <div className="h-32 bg-muted flex items-center justify-center">
                                                <BookOpen className="h-12 w-12 text-muted-foreground/50" />
                                            </div>
                                            <CardContent className="p-4">
                                                <h4 className="font-medium truncate">{item.title}</h4>
                                                <p className="text-sm text-muted-foreground">{item.subject}</p>
                                                <p className="text-xs mt-2">{item.progress}</p>
                                                <Button variant="secondary" className="mt-3 w-full text-sm">
                                                    Continue
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* My Courses */}
                <Card>
                    <CardHeader className="flex justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" /> My Courses
                        </CardTitle>
                        <Button variant="link">View All →</Button>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {courses.map((course, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <BookOpen className="h-5 w-5 text-primary" />
                                            </div>
                                            <CardTitle className="text-lg">{course.subject}</CardTitle>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>Progress</span>
                                                    <span>{course.progress}%</span>
                                                </div>
                                                <Progress value={course.progress} className="h-2" />
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2">Next: {course.next}</p>
                                            <Button variant="secondary" className="w-full">Continue Learning</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                        <Button variant="outline" className="border-dashed h-auto py-8 flex-col">
                            <Plus className="h-8 w-8 mb-2" />
                            View All 6 Courses
                        </Button>
                    </CardContent>
                </Card>

                {/* Educational Shorts Feed */}
                <Card>
                    <CardHeader className="flex justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Video className="h-5 w-5" /> Quick Learning Bites
                        </CardTitle>
                        <Button variant="link">Explore More →</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {shorts.map((short, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="cursor-pointer"
                                >
                                    <div className="aspect-9/16 bg-muted rounded-lg flex items-center justify-center">
                                        <Play className="h-12 w-12 text-muted-foreground/50" />
                                    </div>
                                    <div className="mt-2 space-y-1">
                                        <h4 className="font-medium line-clamp-1">{short.title}</h4>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span>{short.duration}</span>
                                            <span>❤️ {short.likes}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-center gap-2 text-sm">
                            <Button variant="ghost">&lt; Prev</Button>
                            <span>1 2 3 ... 23</span>
                            <Button variant="ghost">Next &gt;</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Results & Achievements */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5" /> Recent Results & Achievements
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            {results?.map((result: any, i: any) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-4 border rounded-lg"
                                >
                                    <h4 className="font-medium">{result.subject}</h4>
                                    <p className="text-sm">Score: {result.score} ✅ PASSED</p>
                                    <p className="text-sm text-muted-foreground">Completed: {result.date}</p>
                                    <Button variant="link" className="p-0">View Detailed Results</Button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-6 border-t">
                            <h4 className="font-medium mb-4">🏆 Recent Achievements</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {achievements.map((ach, i) => (
                                    <motion.div
                                        key={ach}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="text-center p-4 border rounded-lg"
                                    >
                                        <p className="text-3xl mb-2">{ach.split(' ')[0]}</p>
                                        <p className="text-sm">{ach.split(' ').slice(1).join(' ')}</p>
                                    </motion.div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-6">View All Badges (8/25 earned)</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Study Streak */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Flame className="h-5 w-5 text-orange-500" /> Study Streak
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <p className="text-4xl font-bold">5</p>
                            <p className="text-sm text-muted-foreground">You're on a 5-day streak! 🎉</p>
                            <p className="text-sm mt-2">Keep it going for "Week Warrior" badge</p>
                        </div>

                        <div className="grid grid-cols-7 gap-2 text-center">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                <div key={day}>
                                    <div className={cn(
                                        "mx-auto h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold",
                                        streak[i] ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                                    )}>
                                        {streak[i] ? '✓' : '?'}
                                    </div>
                                    <p className="text-xs mt-1">{day}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Daily Goal: 30 minutes</span>
                                <span>77%</span>
                            </div>
                            <Progress value={77} className="h-2" />
                        </div>

                        <Button className="w-full">Start Studying Now</Button>
                    </CardContent>
                </Card>

                {/* Announcements */}
                <Card>
                    <CardHeader className="flex justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" /> Announcements
                        </CardTitle>
                        <Button variant="link">View All →</Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {announcements.map((ann, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <h4 className="font-medium mb-2">{ann.title}</h4>
                                <p className="text-sm text-muted-foreground mb-2">{ann.desc}</p>
                                <p className="text-xs text-muted-foreground">{ann.time}</p>
                            </motion.div>
                        ))}
                    </CardContent>
                </Card>
            </main>

        </div>
    );
}