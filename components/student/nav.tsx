"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { BarChart2, Bell, BookOpen, CheckCircle2, HelpCircle, LogOut, Menu, MessageSquare, Palette, Search, Settings, Trophy, User, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {}

const user = {
    name: 'Chioma Adeyemi',
    class: 'Primary 5A',
    avatar: '/avatars/chioma.jpg',
    email: 'student@school.com',
};

const profileMenu = [
    { icon: User, label: 'My Profile', to: "profile" },
    { icon: Settings, label: 'Settings', to: "settings" },
    { icon: Palette, label: 'Customize Theme', to: "customize-theme" },
    { icon: BarChart2, label: 'My Progress', to: "progress" },
    { icon: Trophy, label: 'My Achievements', to: "achievements" },
    { icon: HelpCircle, label: 'Help & Support', to: "help-support" },
    { icon: LogOut, label: 'Logout', to: "logout" },
];

const notifications = [
    { type: 'live', title: 'Live Class Starting Soon', desc: 'Mathematics class starts in 45 minutes', time: '5 minutes ago', action: 'JOIN NOW' },
    { type: 'assignment', title: 'Assignment Graded', desc: 'Your English assignment has been graded: 88/100', time: '2 hours ago', action: 'VIEW RESULTS' },
    { type: 'test', title: 'Test Available', desc: 'Science Quiz is now available', time: '5 hours ago', action: 'START TEST' },
    { type: 'message', title: 'New Message from Teacher', desc: 'Mrs. Johnson sent you a message', time: 'Yesterday', action: 'READ MESSAGE' },
    { type: 'badge', title: 'New Badge Earned!', desc: 'You earned "5-Day Streak" badge', time: '2 days ago', action: 'VIEW BADGES' },
];

const navLinks = [
{ name: 'Dashboard', to: "/student"},
{ name: 'My Courses', to: "/student/courses" },
{ name: 'Live Classes', to: "/student/live-classes" },
{ name: 'Shorts', to: "/student/shorts" },
{ name: 'Tests', to: "/student/tests" },
{ name: 'Results', to: "/student/results" },
];
export const StudentDashboardNav = (props: Props) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchResults, setSearchResults] = React.useState<any[]>([]);
    const router = useRouter();

    // Supabase search function
    const searchSupabase = async (q: string) => {
        if (!q) return [];
        /* const { data, error } = await supabase
            .from('courses') // Assume 'courses' table with tsvector column 'search_vector'
            .select('id, title, description, subject')
            .textSearch('search_vector', q, {
                type: 'websearch',
                config: 'english',
            })
            .limit(10);

        if (error) console.error(error);
        return data || []; */
    };

    // Handle search
    const { data: results } = useQuery<any>({
        queryKey: ['search', searchQuery],
        queryFn: () => searchSupabase(searchQuery),
        enabled: !!searchQuery,
    });
    return (
        <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                <div className="container flex h-14 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Image src="/images/OMSlogo.png" alt="School Logo" width={64} height={64} className="mx-auto p-2" />
                        </div>
                        <nav className="hidden lg:flex items-center gap-6 text-sm">
                            {navLinks.map((item) => (
                                <Button key={item.name} variant="ghost" className="px-3" asChild>
                                    <Link href={item.to}>{item.name}</Link>
                                </Button>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="relative w-64 hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search courses, videos..."
                                className="pl-10 pr-4"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {results?.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute z-50 w-full mt-2 bg-background border rounded-lg shadow-lg p-2"
                                >
                                    <ScrollArea className="h-64">
                                        {results?.map((result: any) => (
                                            <div key={result.id} className="p-2 hover:bg-muted rounded-md">
                                                <p className="font-medium">{result.title}</p>
                                                <p className="text-sm text-muted-foreground">{result.subject}</p>
                                            </div>
                                        ))}
                                    </ScrollArea>
                                </motion.div>
                            )}
                        </div>

                        {/* Notifications Dropdown */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-destructive text-[10px] text-white flex items-center justify-center">
                                        3
                                    </span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0" align="end">
                                <div className="flex items-center justify-between p-4 border-b">
                                    <h3 className="font-medium">Notifications</h3>
                                    <Button variant="ghost" size="icon">
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Tabs defaultValue="all" className="w-full">
                                    <TabsList className="grid w-full grid-cols-4">
                                        <TabsTrigger value="all">All</TabsTrigger>
                                        <TabsTrigger value="assignments">Assignments</TabsTrigger>
                                        <TabsTrigger value="tests">Tests</TabsTrigger>
                                        <TabsTrigger value="messages">Messages</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="all" className="p-2">
                                        <ScrollArea className="h-64">
                                            {notifications.map((notif, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="p-3 border-b last:border-0 hover:bg-muted/50 transition-colors"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <div className="p-1 rounded-full bg-primary/10">
                                                                {notif.type === 'live' && <Bell className="h-4 w-4 text-red-500" />}
                                                                {notif.type === 'assignment' && <BookOpen className="h-4 w-4 text-blue-500" />}
                                                                {notif.type === 'test' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                                                                {notif.type === 'message' && <MessageSquare className="h-4 w-4 text-purple-500" />}
                                                                {notif.type === 'badge' && <Trophy className="h-4 w-4 text-amber-500" />}
                                                            </div>
                                                            <h4 className="font-medium">{notif.title}</h4>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{notif.desc}</p>
                                                        <p className="text-xs text-muted-foreground">{notif.time}</p>
                                                        <Button variant="link" className="p-0 h-auto">
                                                            {notif.action}
                                                        </Button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </ScrollArea>
                                    </TabsContent>
                                    {/* Add other tabs content if needed */}
                                </Tabs>
                                <div className="p-3 border-t flex justify-between text-sm">
                                    <Button variant="link" className="p-0">Mark All as Read</Button>
                                    <Button variant="link" className="p-0">View All →</Button>
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* Messages Icon (similar to notifications, add popover if needed) */}
                        <Button variant="ghost" size="icon" className="relative">
                            <MessageSquare className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center">
                                5
                            </span>
                        </Button>

                        {/* Profile Dropdown */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative">
                                    <User className="h-5 w-5" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-0" align="end">
                                <div className="p-4 border-b">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-muted-foreground">{user.class}</p>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <ScrollArea className="h-64 p-2">
                                    {profileMenu.map((item, i) => (
                                        <motion.div
                                            key={item.label}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <Button onClick={()=>router.push(`/student/${item.to}`)} variant="ghost" className="w-full justify-start gap-3 py-6">
                                                <item.icon className="h-4 w-4" />
                                                {item.label}
                                            </Button>
                                        </motion.div>
                                    ))}
                                </ScrollArea>
                            </PopoverContent>
                        </Popover>

                        {/* Hamburger for mobile */}
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={{ x: mobileMenuOpen ? 0 : '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 right-0 z-50 w-64 bg-background border-l shadow-lg md:hidden"
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b">
                        <span className="font-semibold">Menu</span>
                        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                    <ScrollArea className="flex-1 bg-white">
                        <nav className="flex flex-col">
                            {navLinks.map((item) => (
                                <Button key={item.name} variant="ghost" className="justify-start py-6 px-4">
                                    <Link href={item.to}>{item.name}</Link>
                                </Button>
                            ))}
                        </nav>
                    </ScrollArea>
                </div>
            </motion.div>
        </div>
    )
}