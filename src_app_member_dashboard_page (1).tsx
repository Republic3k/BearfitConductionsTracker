"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Header, DesktopHeader } from "@/components/bearfit/header"
import { ProfileCard } from "@/components/bearfit/profile-card"
import { SessionCard } from "@/components/bearfit/session-card"
import { ActivityLog } from "@/components/bearfit/activity-log"
import { PromoBanner } from "@/components/bearfit/promo-banner"
import { SchedulePage } from "@/components/bearfit/schedule-page"
import { PaymentPage } from "@/components/bearfit/payment-page"
import { ProfilePage } from "@/components/bearfit/profile-page"
import { DraggableChatButton } from "@/components/bearfit/draggable-chat-button"
import { createClient } from "@supabase/supabase-js"
import { Home, Calendar, CreditCard, User, MoreHorizontal, MessageCircle, X, Send, Bell, ChevronRight, QrCode, CalendarPlus, Users, ClipboardList, DollarSign, BarChart3, Settings, Package, UserCog, Clock, CheckCircle, AlertCircle, TrendingUp, FileText, Dumbbell, Star, ChevronDown, ArrowLeft, Phone, Mail, MapPin, Target, Zap, Plus, Search, Filter, ChevronLeft, LogIn, LogOut, CalendarDays, Info, Gift, HelpCircle, Shield, Globe, Lock, Smartphone, CarIcon as CardIcon } from "lucide-react"
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
// Member navigation
const memberNavItems = [
  { icon: Home, label: "Home", id: "home" },
  { icon: Calendar, label: "Schedule", id: "schedule" },
  { icon: CreditCard, label: "Payment", id: "payment" },
  { icon: User, label: "Profile", id: "profile" },
  { icon: MoreHorizontal, label: "More", id: "more" },
]

// Staff navigation
const staffNavItems = [
  { icon: Home, label: "Home", id: "home" },
  { icon: Calendar, label: "Schedule", id: "schedule" },
  { icon: Users, label: "Clients", id: "clients" },
  { icon: TrendingUp, label: "Stats", id: "stats" },
  { icon: MoreHorizontal, label: "More", id: "more" },
]

// Leads navigation
const leadsNavItems = [
  { icon: Home, label: "Dashboard", id: "dashboard" },
  { icon: Users, label: "Leads", id: "leads" },
  { icon: ClipboardList, label: "Follow-ups", id: "followups" },
  { icon: TrendingUp, label: "Pipeline", id: "pipeline" },
  { icon: MoreHorizontal, label: "More", id: "more" },
]

// Peso icon component
const PesoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <text x="6" y="18" fontSize="16" fontWeight="bold" fill="currentColor" stroke="none">â‚±</text>
  </svg>
)

// Admin navigation
const adminNavItems = [
  { icon: Home, label: "Dashboard", id: "dashboard" },
  { icon: Users, label: "Members", id: "members" },
  { icon: PesoIcon, label: "Payments", id: "payments" },
  { icon: UserCog, label: "Staff", id: "staff" },
  { icon: Settings, label: "Settings", id: "settings" },
]

const chatMessages = [
  { id: 1, sender: "coach", name: "Coach Joaquin", message: "Great job on your workout today!", time: "2:30 PM" },
  { id: 2, sender: "user", message: "Thanks coach! Feeling stronger.", time: "2:32 PM" },
  { id: 3, sender: "coach", name: "Coach Joaquin", message: "Keep it up! See you tomorrow at 6 PM.", time: "2:33 PM" },
]

const notifications = [
  { id: 1, type: "session", title: "Session Reminder", message: "Weights Session starts in 30 minutes", time: "Just now", unread: true },
  { id: 2, type: "promo", title: "New Year Promo!", message: "Get 20% off on all packages this February", time: "1h ago", unread: true },
  { id: 3, type: "points", title: "Points Earned", message: "You earned 50 Bearforce Points!", time: "2h ago", unread: true },
  { id: 4, type: "payment", title: "Payment Received", message: "Your payment of P2,500 has been confirmed", time: "Yesterday", unread: false },
]

// Client data for staff with package types
const clientsData = [
  { id: 1, name: "Alex Cruz", avatar: "AC", package: "Full 48 Package+", packageType: "full48", sessionsLeft: 19, totalSessions: 48, status: "paid", phone: "0917-123-4567", email: "alex@email.com", joinDate: "Jan 2025", lastVisit: "Today", coach: "Coach Joaquin" },
  { id: 2, name: "John Reyes", avatar: "JR", package: "Staggered 24", packageType: "staggered24", sessionsLeft: 8, totalSessions: 24, status: "paid", phone: "0918-234-5678", email: "john@email.com", joinDate: "Feb 2025", lastVisit: "Yesterday", coach: "Coach Joaquin" },
  { id: 3, name: "Maria Santos", avatar: "MS", package: "Personal Training", packageType: "pt", sessionsLeft: 12, totalSessions: 24, status: "paid", phone: "0919-345-6789", email: "maria@email.com", joinDate: "Dec 2024", lastVisit: "Today", coach: "Coach Joaquin" },
  { id: 4, name: "Sofia Garcia", avatar: "SG", package: "Full 24", packageType: "full24", sessionsLeft: 3, totalSessions: 24, status: "expiring", phone: "0920-456-7890", email: "sofia@email.com", joinDate: "Aug 2024", lastVisit: "3 days ago", coach: "Coach Maria" },
  { id: 5, name: "Carlos Mendoza", avatar: "CM", package: "Staggered 48", packageType: "staggered48", sessionsLeft: 0, totalSessions: 48, status: "unpaid", phone: "0921-567-8901", email: "carlos@email.com", joinDate: "Jun 2024", lastVisit: "2 weeks ago", coach: "Coach Carlos" },
  { id: 6, name: "Anna Lim", avatar: "AL", package: "Pilates", packageType: "pilates", sessionsLeft: 6, totalSessions: 12, status: "paid", phone: "0922-678-9012", email: "anna@email.com", joinDate: "Jan 2026", lastVisit: "Today", coach: "Coach Maria" },
  { id: 7, name: "Miguel Torres", avatar: "MT", package: "Full 24", packageType: "full24", sessionsLeft: 20, totalSessions: 24, status: "paid", phone: "0923-789-0123", email: "miguel@email.com", joinDate: "Nov 2025", lastVisit: "Today", coach: "Coach Joaquin" },
  { id: 8, name: "Isabella Fernandez", avatar: "IF", package: "Full 48 Package+", packageType: "full48", sessionsLeft: 35, totalSessions: 48, status: "paid", phone: "0924-890-1234", email: "isabella@email.com", joinDate: "Jan 2026", lastVisit: "Today", coach: "Coach Maria" },
  { id: 9, name: "David Ramos", avatar: "DR", package: "Staggered 24", packageType: "staggered24", sessionsLeft: 15, totalSessions: 24, status: "paid", phone: "0925-901-2345", email: "david@email.com", joinDate: "Dec 2025", lastVisit: "Yesterday", coach: "Coach Carlos" },
  { id: 10, name: "Patricia Villanueva", avatar: "PV", package: "Personal Training", packageType: "pt", sessionsLeft: 8, totalSessions: 12, status: "paid", phone: "0926-012-3456", email: "patricia@email.com", joinDate: "Feb 2026", lastVisit: "Today", coach: "Coach Joaquin" },
  { id: 11, name: "Roberto Aquino", avatar: "RA", package: "Pilates", packageType: "pilates", sessionsLeft: 10, totalSessions: 12, status: "paid", phone: "0927-123-4567", email: "roberto@email.com", joinDate: "Jan 2026", lastVisit: "2 days ago", coach: "Coach Maria" },
  { id: 12, name: "Christine Dela Cruz", avatar: "CD", package: "Full 24", packageType: "full24", sessionsLeft: 5, totalSessions: 24, status: "expiring", phone: "0928-234-5678", email: "christine@email.com", joinDate: "Sep 2025", lastVisit: "3 days ago", coach: "Coach Carlos" },
  { id: 13, name: "Mark Gonzales", avatar: "MG", package: "Staggered 48", packageType: "staggered48", sessionsLeft: 30, totalSessions: 48, status: "paid", phone: "0929-345-6789", email: "mark@email.com", joinDate: "Oct 2025", lastVisit: "Today", coach: "Coach Joaquin" },
  { id: 14, name: "Angela Reyes", avatar: "AR", package: "Full 48 Package+", packageType: "full48", sessionsLeft: 42, totalSessions: 48, status: "paid", phone: "0930-456-7890", email: "angela@email.com", joinDate: "Jan 2026", lastVisit: "Yesterday", coach: "Coach Maria" },
  { id: 15, name: "James Pascual", avatar: "JP", package: "Personal Training", packageType: "pt", sessionsLeft: 2, totalSessions: 10, status: "expiring", phone: "0931-567-8901", email: "james@email.com", joinDate: "Nov 2025", lastVisit: "1 week ago", coach: "Coach Carlos" },
  { id: 16, name: "Nicole Bautista", avatar: "NB", package: "Full 24", packageType: "full24", sessionsLeft: 18, totalSessions: 24, status: "paid", phone: "0932-678-9012", email: "nicole@email.com", joinDate: "Dec 2025", lastVisit: "Today", coach: "Coach Joaquin" },
  { id: 17, name: "Ryan Santos", avatar: "RS", package: "Pilates", packageType: "pilates", sessionsLeft: 0, totalSessions: 12, status: "unpaid", phone: "0933-789-0123", email: "ryan@email.com", joinDate: "Jul 2025", lastVisit: "1 month ago", coach: "Coach Maria" },
  { id: 18, name: "Jennifer Lopez", avatar: "JL", package: "Staggered 24", packageType: "staggered24", sessionsLeft: 22, totalSessions: 24, status: "paid", phone: "0934-890-1234", email: "jennifer@email.com", joinDate: "Feb 2026", lastVisit: "Today", coach: "Coach Carlos" },
  { id: 19, name: "Kevin Tan", avatar: "KT", package: "Full 48 Package+", packageType: "full48", sessionsLeft: 25, totalSessions: 48, status: "paid", phone: "0935-901-2345", email: "kevin@email.com", joinDate: "Nov 2025", lastVisit: "Yesterday", coach: "Coach Joaquin" },
  { id: 20, name: "Michelle Ong", avatar: "MO", package: "Personal Training", packageType: "pt", sessionsLeft: 6, totalSessions: 8, status: "paid", phone: "0936-012-3456", email: "michelle@email.com", joinDate: "Jan 2026", lastVisit: "Today", coach: "Coach Maria" },
  { id: 21, name: "Dennis Cruz", avatar: "DC", package: "Full 24", packageType: "full24", sessionsLeft: 12, totalSessions: 24, status: "paid", phone: "0937-123-4567", email: "dennis@email.com", joinDate: "Dec 2025", lastVisit: "2 days ago", coach: "Coach Carlos" },
  { id: 22, name: "Grace Lim", avatar: "GL", package: "Staggered 48", packageType: "staggered48", sessionsLeft: 38, totalSessions: 48, status: "paid", phone: "0938-234-5678", email: "grace@email.com", joinDate: "Jan 2026", lastVisit: "Today", coach: "Coach Joaquin" },
  { id: 23, name: "Eric Mendoza", avatar: "EM", package: "Pilates", packageType: "pilates", sessionsLeft: 4, totalSessions: 12, status: "paid", phone: "0939-345-6789", email: "eric@email.com", joinDate: "Nov 2025", lastVisit: "Yesterday", coach: "Coach Maria" },
  { id: 24, name: "Diana Castro", avatar: "DCa", package: "Full 48 Package+", packageType: "full48", sessionsLeft: 0, totalSessions: 48, status: "unpaid", phone: "0940-456-7890", email: "diana@email.com", joinDate: "May 2025", lastVisit: "2 weeks ago", coach: "Coach Carlos" },
  { id: 25, name: "Paul Villanueva", avatar: "PVi", package: "Personal Training", packageType: "pt", sessionsLeft: 15, totalSessions: 20, status: "paid", phone: "0941-567-8901", email: "paul@email.com", joinDate: "Feb 2026", lastVisit: "Today", coach: "Coach Joaquin" },
  { id: 26, name: "Linda Rodriguez", avatar: "LR", package: "Staggered 24", packageType: "staggered24", sessionsLeft: 10, totalSessions: 24, status: "paid", phone: "0942-678-9012", email: "linda@email.com", joinDate: "Jan 2026", lastVisit: "Today", coach: "Coach Maria" },
]

// Members data for admin (with more details)
const membersData = [
  { id: 1, name: "Alex Cruz", avatar: "AC", email: "alex@email.com", phone: "0917-123-4567", package: "Full 48 Package+", status: "active", sessionsLeft: 19, totalPaid: "P47,500", lastPayment: "Jan 15, 2026", nextDue: "Apr 15, 2026", joinDate: "Jan 2025", paymentReminder: false },
  { id: 2, name: "Maria Santos", avatar: "MS", email: "maria@email.com", phone: "0919-345-6789", package: "Personal Training", status: "active", sessionsLeft: 12, totalPaid: "P24,000", lastPayment: "Jan 20, 2026", nextDue: "Feb 20, 2026", joinDate: "Dec 2024", paymentReminder: false },
  { id: 3, name: "John Reyes", avatar: "JR", email: "john@email.com", phone: "0918-234-5678", package: "Staggered 24", status: "active", sessionsLeft: 8, totalPaid: "P9,200", lastPayment: "Feb 1, 2026", nextDue: "Mar 1, 2026", joinDate: "Feb 2025", paymentReminder: false },
  { id: 4, name: "Sofia Garcia", avatar: "SG", email: "sofia@email.com", phone: "0920-456-7890", package: "Full 24", status: "expiring", sessionsLeft: 3, totalPaid: "P25,200", lastPayment: "Nov 15, 2025", nextDue: "Feb 15, 2026", joinDate: "Aug 2024", paymentReminder: true },
  { id: 5, name: "Carlos Mendoza", avatar: "CM", email: "carlos@email.com", phone: "0921-567-8901", package: "Staggered 48", status: "expired", sessionsLeft: 0, totalPaid: "P22,500", lastPayment: "Dec 1, 2025", nextDue: "Jan 1, 2026", joinDate: "Jun 2024", paymentReminder: true },
  { id: 6, name: "Anna Lim", avatar: "AL", email: "anna@email.com", phone: "0922-678-9012", package: "Pilates", status: "active", sessionsLeft: 6, totalPaid: "P12,000", lastPayment: "Jan 25, 2026", nextDue: "Feb 25, 2026", joinDate: "Jan 2026", paymentReminder: false },
  { id: 7, name: "Miguel Torres", avatar: "MT", email: "miguel@email.com", phone: "0923-789-0123", package: "Full 24", status: "active", sessionsLeft: 20, totalPaid: "P25,200", lastPayment: "Feb 1, 2026", nextDue: "May 1, 2026", joinDate: "Nov 2025", paymentReminder: false },
]

// Staff schedule data
const staffScheduleData = [
  { id: 1, time: "6:00 AM", client: "Maria Santos", session: "Personal Training", status: "done", notes: "Completed leg day workout", phone: "0919-345-6789" },
  { id: 2, time: "8:00 AM", client: "John Reyes", session: "Weights Session", status: "done", notes: "Upper body focus", phone: "0918-234-5678" },
  { id: 3, time: "10:00 AM", client: "Alex Cruz", session: "Cardio Blast", status: "now", notes: "HIIT session in progress", phone: "0917-123-4567" },
  { id: 4, time: "2:00 PM", client: "Sofia Garcia", session: "Personal Training", status: "soon", notes: "Core and flexibility", phone: "0920-456-7890" },
  { id: 5, time: "4:00 PM", client: "Group Class", session: "HIIT Session", status: "soon", notes: "8 members registered", phone: "" },
]

// Next week schedule
const nextWeekSchedule = [
  { day: "Mon", date: 10, sessions: 5, clients: ["Maria S.", "John R.", "Alex C.", "Sofia G.", "Group"] },
  { day: "Tue", date: 11, sessions: 4, clients: ["Alex C.", "Carlos M.", "Anna L.", "Miguel T."] },
  { day: "Wed", date: 12, sessions: 6, clients: ["Maria S.", "John R.", "Sofia G.", "Group", "Anna L.", "Miguel T."] },
  { day: "Thu", date: 13, sessions: 4, clients: ["Alex C.", "Carlos M.", "Maria S.", "John R."] },
  { day: "Fri", date: 14, sessions: 5, clients: ["Sofia G.", "Group", "Anna L.", "Miguel T.", "Alex C."] },
  { day: "Sat", date: 15, sessions: 3, clients: ["Maria S.", "John R.", "Group"] },
  { day: "Sun", date: 16, sessions: 0, clients: [] },
]

// Monthly calendar data (simplified)
const monthlyActivities: Record<number, { sessions: number; color: string }> = {
  3: { sessions: 5, color: "bg-primary" },
  4: { sessions: 4, color: "bg-primary/80" },
  5: { sessions: 6, color: "bg-primary" },
  6: { sessions: 4, color: "bg-primary/80" },
  7: { sessions: 5, color: "bg-primary" },
  8: { sessions: 3, color: "bg-primary/60" },
  10: { sessions: 5, color: "bg-primary" },
  11: { sessions: 4, color: "bg-primary/80" },
  12: { sessions: 6, color: "bg-primary" },
  13: { sessions: 4, color: "bg-primary/80" },
  14: { sessions: 5, color: "bg-primary" },
  15: { sessions: 3, color: "bg-primary/60" },
  17: { sessions: 5, color: "bg-primary" },
  18: { sessions: 4, color: "bg-primary/80" },
  19: { sessions: 6, color: "bg-primary" },
  20: { sessions: 4, color: "bg-primary/80" },
  21: { sessions: 5, color: "bg-primary" },
  22: { sessions: 3, color: "bg-primary/60" },
  24: { sessions: 5, color: "bg-primary" },
  25: { sessions: 4, color: "bg-primary/80" },
  26: { sessions: 6, color: "bg-primary" },
  27: { sessions: 4, color: "bg-primary/80" },
  28: { sessions: 5, color: "bg-primary" },
}

// Staff/Coaches data for admin
const staffData = [
  { 
    id: 1, 
    name: "Coach Joaquin", 
    avatar: "J",
    role: "Personal Trainer", 
    status: "online",
    schedule: [
      { day: "Mon", sessions: 5, hours: "6AM-2PM" },
      { day: "Tue", sessions: 4, hours: "6AM-12PM" },
      { day: "Wed", sessions: 6, hours: "6AM-3PM" },
      { day: "Thu", sessions: 4, hours: "6AM-12PM" },
      { day: "Fri", sessions: 5, hours: "6AM-2PM" },
      { day: "Sat", sessions: 3, hours: "8AM-12PM" },
      { day: "Sun", sessions: 0, hours: "Off" },
    ],
    stats: { day: { sessions: 5, hours: 8 }, week: { sessions: 24, hours: 42 }, month: { sessions: 96, hours: 168 } },
    clients: 18,
    rating: 4.9,
    totalSessions: 24,
    phone: "0917-111-2222",
    email: "joaquin@bearfit.com"
  },
  { 
    id: 2, 
    name: "Coach Maria", 
    avatar: "M",
    role: "Yoga Instructor", 
    status: "online",
    schedule: [
      { day: "Mon", sessions: 4, hours: "8AM-1PM" },
      { day: "Tue", sessions: 5, hours: "8AM-2PM" },
      { day: "Wed", sessions: 4, hours: "8AM-1PM" },
      { day: "Thu", sessions: 5, hours: "8AM-2PM" },
      { day: "Fri", sessions: 2, hours: "8AM-11AM" },
      { day: "Sat", sessions: 4, hours: "9AM-1PM" },
      { day: "Sun", sessions: 0, hours: "Off" },
    ],
    stats: { day: { sessions: 4, hours: 5 }, week: { sessions: 20, hours: 35 }, month: { sessions: 80, hours: 140 } },
    clients: 15,
    rating: 4.8,
    totalSessions: 20,
    phone: "0918-222-3333",
    email: "maria@bearfit.com"
  },
  { 
    id: 3, 
    name: "Coach Carlos", 
    avatar: "C",
    role: "Strength Coach", 
    status: "offline",
    schedule: [
      { day: "Mon", sessions: 3, hours: "2PM-6PM" },
      { day: "Tue", sessions: 4, hours: "2PM-7PM" },
      { day: "Wed", sessions: 3, hours: "2PM-6PM" },
      { day: "Thu", sessions: 4, hours: "2PM-7PM" },
      { day: "Fri", sessions: 4, hours: "2PM-7PM" },
      { day: "Sat", sessions: 2, hours: "1PM-4PM" },
      { day: "Sun", sessions: 0, hours: "Off" },
    ],
    stats: { day: { sessions: 3, hours: 4 }, week: { sessions: 18, hours: 28 }, month: { sessions: 72, hours: 112 } },
    clients: 12,
    rating: 4.7,
    totalSessions: 18,
    phone: "0919-333-4444",
    email: "carlos@bearfit.com"
  },
  { 
    id: 4, 
    name: "Coach Ana", 
    avatar: "A",
    role: "Cardio Specialist", 
    status: "online",
    schedule: [
      { day: "Mon", sessions: 4, hours: "5AM-10AM" },
      { day: "Tue", sessions: 3, hours: "5AM-9AM" },
      { day: "Wed", sessions: 4, hours: "5AM-10AM" },
      { day: "Thu", sessions: 3, hours: "5AM-9AM" },
      { day: "Fri", sessions: 4, hours: "5AM-10AM" },
      { day: "Sat", sessions: 0, hours: "Off" },
      { day: "Sun", sessions: 0, hours: "Off" },
    ],
    stats: { day: { sessions: 4, hours: 5 }, week: { sessions: 15, hours: 25 }, month: { sessions: 60, hours: 100 } },
    clients: 10,
    rating: 4.6,
    totalSessions: 15,
    phone: "0920-444-5555",
    email: "ana@bearfit.com"
  },
]

// Admin transactions data
const adminTransactions = [
  { id: 1, name: "Alex Cruz", avatar: "AC", amount: "P2,500", type: "Package Renewal", status: "completed", date: "Feb 3, 2026", time: "10:30 AM" },
  { id: 2, name: "Maria Santos", avatar: "MS", amount: "P1,500", type: "PT Session", status: "completed", date: "Feb 3, 2026", time: "9:15 AM" },
  { id: 3, name: "John Reyes", avatar: "JR", amount: "P48,600", type: "Full Package", status: "pending", date: "Feb 2, 2026", time: "4:30 PM" },
  { id: 4, name: "Sofia Garcia", avatar: "SG", amount: "P3,000", type: "Monthly Basic", status: "completed", date: "Feb 2, 2026", time: "2:00 PM" },
  { id: 5, name: "Anna Lim", avatar: "AL", amount: "P47,500", type: "Full Package", status: "completed", date: "Feb 1, 2026", time: "11:00 AM" },
  { id: 6, name: "Miguel Torres", avatar: "MT", amount: "P25,200", type: "Full 24", status: "completed", date: "Feb 1, 2026", time: "9:00 AM" },
]

// Updated Package data with correct details
const packagesData = [
  { 
    id: 1, 
    name: "Full 24", 
    price: "P25,200", 
    sessions: 24, 
    duration: "90 days", 
    active: 45, 
    description: "24 sessions + 1 free session + 1 hour recovery massage",
    bonuses: ["+1 free session", "1 hour recovery massage"]
  },
  { 
    id: 2, 
    name: "Staggered 24", 
    price: "Staggered", 
    sessions: 24, 
    duration: "90 days", 
    active: 32, 
    description: "24 sessions with staggered payments",
    paymentSchedule: [
      { alert: "19th session remaining", amount: "P9,200" },
      { alert: "13th session remaining", amount: "P8,500" },
      { alert: "1 session remaining", amount: "P7,500" }
    ]
  },
  { 
    id: 3, 
    name: "Full 48", 
    price: "P47,500", 
    sessions: 48, 
    duration: "180 days", 
    active: 35, 
    description: "48 sessions + 2 free sessions + 3 1-hour recovery massage",
    bonuses: ["+2 free sessions", "3x 1-hour recovery massage"]
  },
  { 
    id: 4, 
    name: "Staggered 48", 
    price: "Staggered", 
    sessions: 48, 
    duration: "180 days", 
    active: 28, 
    description: "48 sessions with staggered payments",
    paymentSchedule: [
      { alert: "1st payment", amount: "P22,500" },
      { alert: "9th session", amount: "P25,000" }
    ]
  },
  { 
    id: 5, 
    name: "Personal Training", 
    price: "P1,500/session", 
    sessions: 1, 
    duration: "Per session", 
    active: 20, 
    description: "1-on-1 with certified trainer"
  },
  { 
    id: 6, 
    name: "Pilates", 
    price: "P2,000/session", 
    sessions: 1, 
    duration: "Per session", 
    active: 15, 
    description: "Reformer pilates sessions"
  },
]

// Reports data
const reportsData = {
  revenue: { daily: "P26,500", weekly: "P185,000", monthly: "P485,000" },
  attendance: { daily: 42, weekly: 294, monthly: 1176 },
  newMembers: { daily: 2, weekly: 12, monthly: 45 },
  renewals: { daily: 3, weekly: 18, monthly: 72 },
}

// Analytics data
const analyticsData = {
  topPackages: [
    { name: "Full 24", sales: 45, percentage: 35 },
    { name: "Full 48", sales: 35, percentage: 27 },
    { name: "Staggered 24", sales: 32, percentage: 25 },
    { name: "Personal Training", sales: 20, percentage: 16 },
  ],
  peakHours: [
    { time: "6-8 AM", attendance: 35 },
    { time: "8-10 AM", attendance: 28 },
    { time: "10-12 PM", attendance: 15 },
    { time: "4-6 PM", attendance: 42 },
    { time: "6-8 PM", attendance: 38 },
  ],
  memberRetention: 87,
  avgSessionsPerMember: 8.5,
}

// More menu items for Member
const memberMoreItems = [
  { icon: Gift, label: "Referral Program", description: "Earn points by referring friends", id: "referral" },
  { icon: HelpCircle, label: "Help & Support", description: "FAQs and contact support", id: "help" },
  { icon: Shield, label: "Privacy & Security", description: "Manage your data", id: "privacy" },
  { icon: Globe, label: "Language", description: "English", id: "language" },
  { icon: Bell, label: "Notifications", description: "Manage alerts", id: "notifications" },
  { icon: Info, label: "About BearFit", description: "Version 2.0.1", id: "about" },
]

// More menu items for Staff
const staffMoreItems = [
  { icon: ClipboardList, label: "Session History", description: "View past sessions", id: "sessionHistory" },
  { icon: BarChart3, label: "Monthly Report", description: "Download performance report", id: "monthlyReport" },
  { icon: Calendar, label: "Time Off Request", description: "Request leave", id: "timeOff" },
  { icon: HelpCircle, label: "Help & Support", description: "FAQs and contact", id: "help" },
  { icon: Settings, label: "Preferences", description: "App settings", id: "preferences" },
  { icon: Info, label: "About BearFit", description: "Version 2.0.1", id: "about" },
]

// Session history data for staff
const sessionHistoryData = [
  { id: 1, client: "Alex Cruz", session: "Weight Training", date: "Feb 2, 2026", time: "10:00 AM", duration: "60 min", rating: 5 },
  { id: 2, client: "Maria Santos", session: "Personal Training", date: "Feb 2, 2026", time: "6:00 AM", duration: "90 min", rating: 5 },
  { id: 3, client: "John Reyes", session: "HIIT Cardio", date: "Feb 1, 2026", time: "8:00 AM", duration: "45 min", rating: 4 },
  { id: 4, client: "Sofia Garcia", session: "Weight Training", date: "Feb 1, 2026", time: "2:00 PM", duration: "60 min", rating: 5 },
  { id: 5, client: "Group Class", session: "Morning Yoga", date: "Jan 31, 2026", time: "6:00 AM", duration: "60 min", rating: 4 },
]

// Monthly report data
const monthlyReportData = {
  month: "January 2026",
  totalSessions: 96,
  totalHours: 144,
  avgRating: 4.8,
  topClient: "Alex Cruz",
  mostPopularSession: "Weight Training",
  earnings: "P28,800"
}

// Package filter options
const packageFilters = ["All", "Full 48", "Full 24", "Staggered 48", "Staggered 24", "Pilates", "PT"]

// Leads data for recruitment
const leadsData = [
  { id: 1, name: "Marco Dela Rosa", phone: "0917-111-2222", email: "marco@email.com", source: "Referral", status: "hot", interest: "Full 48 Package", lastContact: "Today", nextFollowUp: "Feb 4, 2026", notes: "Very interested, asked about pricing", assignedTo: "Coach Joaquin" },
  { id: 2, name: "Sarah Chen", phone: "0918-222-3333", email: "sarah@email.com", source: "Walk-in", status: "warm", interest: "Personal Training", lastContact: "Yesterday", nextFollowUp: "Feb 5, 2026", notes: "Visited gym, wants to try a session", assignedTo: "Coach Maria" },
  { id: 3, name: "Jerome Tan", phone: "0919-333-4444", email: "jerome@email.com", source: "Social Media", status: "hot", interest: "Pilates", lastContact: "Feb 1, 2026", nextFollowUp: "Feb 3, 2026", notes: "DM inquiry, ready to sign up", assignedTo: "Coach Maria" },
  { id: 4, name: "Andrea Lim", phone: "0920-444-5555", email: "andrea@email.com", source: "Website", status: "cold", interest: "Full 24 Package", lastContact: "Jan 28, 2026", nextFollowUp: "Feb 7, 2026", notes: "Form submission, no response yet", assignedTo: "Coach Carlos" },
  { id: 5, name: "Benjamin Cruz", phone: "0921-555-6666", email: "benjamin@email.com", source: "Referral", status: "warm", interest: "Staggered 48", lastContact: "Jan 30, 2026", nextFollowUp: "Feb 4, 2026", notes: "Referred by Alex Cruz, interested in flex payments", assignedTo: "Coach Joaquin" },
  { id: 6, name: "Christina Reyes", phone: "0922-666-7777", email: "christina@email.com", source: "Event", status: "hot", interest: "Personal Training", lastContact: "Today", nextFollowUp: "Feb 3, 2026", notes: "Met at health fair, wants to start ASAP", assignedTo: "Coach Carlos" },
  { id: 7, name: "Daniel Santos", phone: "0923-777-8888", email: "daniel@email.com", source: "Walk-in", status: "warm", interest: "Full 24 Package", lastContact: "Feb 2, 2026", nextFollowUp: "Feb 5, 2026", notes: "Toured facility, comparing with other gyms", assignedTo: "Coach Joaquin" },
  { id: 8, name: "Emily Pascual", phone: "0924-888-9999", email: "emily@email.com", source: "Social Media", status: "cold", interest: "Pilates", lastContact: "Jan 25, 2026", nextFollowUp: "Feb 6, 2026", notes: "Instagram inquiry, went silent", assignedTo: "Coach Maria" },
  { id: 9, name: "Francis Aquino", phone: "0925-999-0000", email: "francis@email.com", source: "Referral", status: "hot", interest: "Full 48 Package", lastContact: "Today", nextFollowUp: "Feb 4, 2026", notes: "Maria Santos referral, scheduled visit", assignedTo: "Coach Joaquin" },
  { id: 10, name: "Grace Villanueva", phone: "0926-000-1111", email: "grace@email.com", source: "Website", status: "warm", interest: "Staggered 24", lastContact: "Feb 1, 2026", nextFollowUp: "Feb 5, 2026", notes: "Price inquiry, sent brochure", assignedTo: "Coach Carlos" },
  { id: 11, name: "Henry Gonzales", phone: "0927-111-2222", email: "henry@email.com", source: "Walk-in", status: "converted", interest: "Full 24 Package", lastContact: "Feb 3, 2026", nextFollowUp: "-", notes: "Signed up today!", assignedTo: "Coach Joaquin" },
  { id: 12, name: "Irene Mendoza", phone: "0928-222-3333", email: "irene@email.com", source: "Social Media", status: "lost", interest: "Personal Training", lastContact: "Jan 20, 2026", nextFollowUp: "-", notes: "Chose competitor gym", assignedTo: "Coach Maria" },
]

// Leads pipeline stats
const leadsPipelineStats = {
  total: 12,
  hot: 4,
  warm: 4,
  cold: 2,
  converted: 1,
  lost: 1,
  conversionRate: "8.3%",
  avgTimeToConvert: "12 days"
}

// Branch data for admin tracking
const branchData = [
  { id: 1, name: "Malingap", address: "Malingap St., Teachers Village, QC", members: 58, revenue: "â‚±185k", sessionsToday: 8, staff: 4, status: "active", topCoach: "Coach Joaquin", avgRating: 4.9, monthlyGrowth: "+12%", activePackages: 45, pendingPayments: 3, monthlyRevenue: "â‚±485k", totalClients: 128, newThisMonth: 12, expiringPackages: 8 },
  { id: 2, name: "E.Rod", address: "E. Rodriguez Ave., New Manila, QC", members: 42, revenue: "â‚±156k", sessionsToday: 4, staff: 3, status: "active", topCoach: "Coach Maria", avgRating: 4.8, monthlyGrowth: "+8%", activePackages: 32, pendingPayments: 5, monthlyRevenue: "â‚±320k", totalClients: 95, newThisMonth: 8, expiringPackages: 5 },
  { id: 3, name: "Cainta", address: "Ortigas Ave. Extension, Cainta, Rizal", members: 28, revenue: "â‚±144k", sessionsToday: 2, staff: 2, status: "active", topCoach: "Coach Carlos", avgRating: 4.7, monthlyGrowth: "+15%", activePackages: 22, pendingPayments: 2, monthlyRevenue: "â‚±245k", totalClients: 65, newThisMonth: 10, expiringPackages: 3 },
]

// Staff attendance data
const staffAttendanceData: Record<number, { present: boolean; timeIn?: string; timeOut?: string }> = {
  1: { present: true, timeIn: "5:45 AM" },
  2: { present: true, timeIn: "7:30 AM" },
  3: { present: true, timeIn: "1:45 PM" },
  4: { present: false },
  5: { present: true, timeIn: "6:00 AM" },
  6: { present: true, timeIn: "8:00 AM" },
  7: { present: false },
  8: { present: true, timeIn: "2:00 PM" },
  9: { present: false },
  10: { present: true, timeIn: "6:30 AM" },
  11: { present: true, timeIn: "7:00 AM" },
  12: { present: false },
  13: { present: true, timeIn: "5:30 AM" },
  14: { present: true, timeIn: "8:15 AM" },
  15: { present: true, timeIn: "6:45 AM" },
  17: { present: true, timeIn: "6:00 AM" },
  18: { present: true, timeIn: "7:30 AM" },
  19: { present: true, timeIn: "2:00 PM" },
  20: { present: false },
  21: { present: true, timeIn: "6:15 AM" },
  22: { present: true, timeIn: "8:00 AM" },
  24: { present: true, timeIn: "6:00 AM" },
  25: { present: true, timeIn: "7:45 AM" },
  26: { present: true, timeIn: "1:30 PM" },
  27: { present: false },
  28: { present: true, timeIn: "6:30 AM" },
}

// Session time slots for calendar
const sessionTimeSlots = {
  "6:00 AM": { clients: 3, coach: "Coach Joaquin" },
  "7:00 AM": { clients: 4, coach: "Coach Ana" },
  "8:00 AM": { clients: 5, coach: "Coach Maria" },
  "9:00 AM": { clients: 3, coach: "Coach Joaquin" },
  "10:00 AM": { clients: 4, coach: "Coach Carlos" },
  "11:00 AM": { clients: 2, coach: "Coach Maria" },
  "2:00 PM": { clients: 3, coach: "Coach Carlos" },
  "3:00 PM": { clients: 4, coach: "Coach Joaquin" },
  "4:00 PM": { clients: 5, coach: "Coach Ana" },
  "5:00 PM": { clients: 4, coach: "Coach Maria" },
  "6:00 PM": { clients: 3, coach: "Coach Carlos" },
}

export default function BearfitApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [showChat, setShowChat] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [activeRole, setActiveRole] = useState<"Member" | "Staff" | "Leads" | "Admin">("Member")

  // Help modal (loads content from Supabase)
  const [helpOpen, setHelpOpen] = useState(false)
  const [helpContent, setHelpContent] = useState<{ title: string; description: string } | null>(null)

  async function openHelp(key: string) {
    const { data } = await supabase
      .from("help_tooltips")
      .select("title, description")
      .eq("key", key)
      .single()

    if (data) {
      setHelpContent(data)
      setHelpOpen(true)
    }
  }
  
  // Staff states
  const [showScanQR, setShowScanQR] = useState(false)
  const [showCreateSession, setShowCreateSession] = useState(false)
  const [showClientDetail, setShowClientDetail] = useState<typeof clientsData[0] | null>(null)
  const [showWorkoutLog, setShowWorkoutLog] = useState(false)
  const [staffCheckedIn, setStaffCheckedIn] = useState(false)
  const [staffStatsView, setStaffStatsView] = useState<"day" | "week" | "month">("week")
  const [showMessageClient, setShowMessageClient] = useState(false)
  const [selectedClientForMessage, setSelectedClientForMessage] = useState<typeof clientsData[0] | null>(null)
  const [showSessionDetail, setShowSessionDetail] = useState<typeof staffScheduleData[0] | null>(null)
  const [clientFilter, setClientFilter] = useState("All")
  const [calendarMonth, setCalendarMonth] = useState(1) // February (0-indexed)
  const [calendarYear, setCalendarYear] = useState(2026)
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<number | null>(null)
  const [showDayDetail, setShowDayDetail] = useState(false)
  
  // Admin states
  const [showMemberDetail, setShowMemberDetail] = useState<typeof membersData[0] | null>(null)
  const [showStaffDetail, setShowStaffDetail] = useState<typeof staffData[0] | null>(null)
  const [staffTimeView, setStaffTimeView] = useState<"day" | "week" | "month">("week")
  const [showPackages, setShowPackages] = useState(false)
  const [showReports, setShowReports] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showAnnouncements, setShowAnnouncements] = useState(false)
  
  // More menu states
  const [showReferral, setShowReferral] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showLanguage, setShowLanguage] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showSessionHistory, setShowSessionHistory] = useState(false)
  const [showMonthlyReport, setShowMonthlyReport] = useState(false)
  const [showTimeOff, setShowTimeOff] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  
  // Admin filter states
  const [adminMemberFilter, setAdminMemberFilter] = useState("All")
  const [adminPaymentFilter, setAdminPaymentFilter] = useState("All")
  const [reminderFilter, setReminderFilter] = useState("All")
  const [showCoachToggle, setShowCoachToggle] = useState(false)
  const [showDayScheduleDetail, setShowDayScheduleDetail] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState<typeof branchData[0] | null>(null)
  const [branchFilter, setBranchFilter] = useState("All")
  const [attendanceCoachFilter, setAttendanceCoachFilter] = useState("All")
  const [attendanceMonth, setAttendanceMonth] = useState(1) // February index
  const [scheduleMonth, setScheduleMonth] = useState(1) // February index
  const [scheduleCoachFilter, setScheduleCoachFilter] = useState("All")
  const [showAddLead, setShowAddLead] = useState(false)
  const [showNotificationSettings, setShowNotificationSettings] = useState(false)
  const [showAccessControl, setShowAccessControl] = useState(false)
  const [showAppSettings, setShowAppSettings] = useState(false)
  const [showAboutBearFit, setShowAboutBearFit] = useState(false)
  const [leadSourceFilter, setLeadSourceFilter] = useState("All")
  const [leadStatusFilter, setLeadStatusFilter] = useState("All")
  
  // Create session form state
  const [sessionForm, setSessionForm] = useState({
    client: "",
    date: "",
    time: "",
    type: "",
    duration: "60",
    notes: ""
  })

  // Get appropriate nav items based on role
  const getNavItems = () => {
    switch (activeRole) {
      case "Staff":
        return staffNavItems
      case "Leads":
        return leadsNavItems
      case "Admin":
        return adminNavItems
      default:
        return memberNavItems
    }
  }

  // Reset tab when role changes
  const handleRoleChange = (role: "Member" | "Staff" | "Leads" | "Admin") => {
    setActiveRole(role)
    if (role === "Leads") {
      setActiveTab("dashboard")
    } else if (role === "Admin") {
      setActiveTab("dashboard")
    } else {
      setActiveTab("home")
    }
  }

  const handleCreateSession = () => {
    alert(`Session created for ${sessionForm.client} on ${sessionForm.date} at ${sessionForm.time}`)
    setShowCreateSession(false)
    setSessionForm({ client: "", date: "", time: "", type: "", duration: "60", notes: "" })
  }

  const handleSendReminder = (member: typeof membersData[0]) => {
    alert(`Payment reminder sent to ${member.name} via SMS and Email`)
  }

  const handleStaffCheckIn = () => {
    setStaffCheckedIn(!staffCheckedIn)
    if (!staffCheckedIn) {
      alert("Checked in successfully! Have a great day!")
    } else {
      alert("Checked out successfully! See you tomorrow!")
    }
  }

  const handleMessageClient = (client: typeof clientsData[0] | typeof staffScheduleData[0]) => {
    const clientData = 'package' in client ? client : clientsData.find(c => c.name === client.client) || clientsData[0]
    setSelectedClientForMessage(clientData)
    setShowMessageClient(true)
    setShowClientDetail(null)
    setShowSessionDetail(null)
  }

  const navItems = getNavItems()

  // Performance stats based on selected time view
  const getStaffStats = () => {
    const stats = {
      day: { sessions: 5, rating: 4.9, clients: 5, attendance: 100 },
      week: { sessions: 24, rating: 4.9, clients: 18, attendance: 96 },
      month: { sessions: 96, rating: 4.8, clients: 18, attendance: 94 },
    }
    return stats[staffStatsView]
  }

  const currentStats = getStaffStats()

  // Filter clients by package type
  const filteredClients = clientFilter === "All" 
    ? clientsData 
    : clientsData.filter(c => {
        const filter = clientFilter.toLowerCase().replace(" ", "")
        return c.packageType.includes(filter) || 
               (clientFilter === "PT" && c.packageType === "pt") ||
               (clientFilter === "Pilates" && c.packageType === "pilates")
      })

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Layout - Sidebar Navigation */}
      <div className="hidden lg:flex">
        {/* Desktop Sidebar */}
        <aside className="w-64 h-screen sticky top-0 bg-[#0d0d0d] border-r border-border/30 flex flex-col">
          {/* Logo */}
          {/* Sidebar Brand (logo handled in top header to avoid duplicates) */}
          <div className="p-5 bg-gradient-to-b from-background/40 via-background/10 to-transparent" />

          {/* Role Tabs */}
          <div className="p-4">
            <div className="flex items-center bg-secondary rounded-xl p-1">
              {(["Member", "Staff", "Leads", "Admin"] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                    activeRole === role
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-border/30">
            <button 
              onClick={() => setShowNotifications(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
            >
              <Bell className="w-5 h-5" />
              <span className="font-medium text-sm">Notifications</span>
              <span className="ml-auto w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button 
              onClick={() => setShowChat(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all mt-1"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium text-sm">Messages</span>
              <span className="ml-auto w-5 h-5 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </aside>

        {/* Desktop Main Content */}
        <main className="flex-1 min-h-screen">
          <DesktopHeader 
            onOpenChat={() => setShowChat(true)} 
            onOpenNotifications={() => setShowNotifications(true)}
            activeRole={activeRole}
            onRoleChange={handleRoleChange}
          />
          <div className="px-6 py-4 max-w-5xl mx-auto">
            {/* Member View - Desktop */}
            {activeRole === "Member" && (
              <>
          <div className="[&>header>div:first-child>div:first-child]:scale-[1.6] [&>header>div:first-child>div:first-child]:origin-left [&>header>div:first-child>div:first-child>div:first-child]:bg-transparent [&>header>div:first-child>div:first-child>div:first-child]:rounded-none">
            <DesktopHeader
              onOpenChat={() => setShowChat(true)}
              onOpenNotifications={() => setShowNotifications(true)}
              activeRole={activeRole}
              onRoleChange={handleRoleChange}
            />
          </div>

                {activeTab === "home" && (
                  <div className="space-y-5">
                    <ProfileCard />
                    <SessionCard />
                    <ActivityLog />
                    <PromoBanner />
                  </div>
                )}
                {activeTab === "schedule" && <SchedulePage />}
                {activeTab === "payment" && <PaymentPage />}
                {activeTab === "profile" && <ProfilePage />}
                {activeTab === "more" && (
                  <div className="space-y-2">
                    {memberMoreItems.map((item, i) => {
                      const Icon = item.icon
                      const handleClick = () => {
                        if (item.id === "referral") setShowReferral(true)
                        else if (item.id === "help") setShowHelp(true)
                        else if (item.id === "privacy") setShowPrivacy(true)
                        else if (item.id === "language") setShowLanguage(true)
                        else if (item.id === "notifications") setShowNotifications(true)
                        else if (item.id === "about") setShowAbout(true)
                      }
                      return (
                        <button key={i} onClick={handleClick} className="w-full flex items-center justify-between p-4 bg-[#141414] rounded-xl border border-border/30 touch-active card-press">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-semibold text-foreground">{item.label}</p>
                              <p className="text-[11px] text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </button>
                      )
                    })}
                  </div>
                )}
              </>
            )}

            {/* Staff & Admin content follows same pattern - showing key parts */}
            {activeRole === "Staff" && (
              <>
                {activeTab === "home" && (
                  <div className="space-y-4">
                    {/* Check-in Card */}
                    <div className={`rounded-xl p-4 border ${staffCheckedIn ? "bg-green-500/10 border-green-500/30" : "bg-[#141414] border-border/30"}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {staffCheckedIn ? "Currently Checked In" : "Not Checked In"}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {staffCheckedIn ? "Since 6:00 AM - Malingap Branch" : "Tap to check in"}
                          </p>
                        </div>
                        <button 
                          onClick={handleStaffCheckIn}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold touch-active ${
                            staffCheckedIn 
                              ? "bg-red-500/20 text-red-500" 
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {staffCheckedIn ? <LogOut className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                          {staffCheckedIn ? "Check Out" : "Check In"}
                        </button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => setShowScanQR(true)}
                          className="bg-secondary rounded-xl p-3 text-left touch-active card-press"
                        >
                          <QrCode className="w-5 h-5 text-primary mb-2" />
                          <p className="text-xs font-semibold text-foreground">Scan QR</p>
                          <p className="text-[9px] text-muted-foreground">Fast check-in</p>
                        </button>
                        <button 
                          onClick={() => setShowCreateSession(true)}
                          className="bg-secondary rounded-xl p-3 text-left touch-active card-press"
                        >
                          <CalendarPlus className="w-5 h-5 text-green-500 mb-2" />
                          <p className="text-xs font-semibold text-foreground">Create Session</p>
                          <p className="text-[9px] text-muted-foreground">Add schedule slot</p>
                        </button>
                        <button 
                          onClick={() => setActiveTab("clients")}
                          className="bg-secondary rounded-xl p-3 text-left touch-active card-press"
                        >
                          <Users className="w-5 h-5 text-blue-500 mb-2" />
                          <p className="text-xs font-semibold text-foreground">Client List</p>
                          <p className="text-[9px] text-muted-foreground">View members</p>
                        </button>
                        <button 
                          onClick={() => setShowWorkoutLog(true)}
                          className="bg-secondary rounded-xl p-3 text-left touch-active card-press"
                        >
                          <Dumbbell className="w-5 h-5 text-yellow-500 mb-2" />
                          <p className="text-xs font-semibold text-foreground">Workout Log</p>
                          <p className="text-[9px] text-muted-foreground">Record exercises</p>
                        </button>
                      </div>
                    </div>

                    {/* Recent Check-ins */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Recent Check-ins</h2>
                      <div className="space-y-2">
                        {clientsData.slice(0, 3).map((client) => (
                          <div key={client.id} className="flex items-center justify-between p-2.5 bg-secondary rounded-xl">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                <span className="text-[10px] font-bold text-primary">{client.avatar}</span>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-foreground">{client.name}</p>
                                <p className="text-[9px] text-muted-foreground">{client.package}</p>
                              </div>
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                              {client.id === 1 ? "10:02 AM" : client.id === 2 ? "8:05 AM" : "6:00 AM"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Staff Schedule Tab */}
                {activeTab === "schedule" && (
                  <div className="space-y-4">
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Today's Schedule</h2>
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full font-medium">
                          {staffScheduleData.length} Sessions
                        </span>
                      </div>
                      <div className="space-y-2">
                        {staffScheduleData.map((session) => (
                          <div 
                            key={session.id}
                            className="flex items-center justify-between p-2.5 bg-secondary rounded-xl"
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-center w-14">
                                <p className="text-xs font-bold text-foreground">{session.time}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-foreground">{session.client}</p>
                                <p className="text-[9px] text-muted-foreground">{session.session}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {session.phone && (
                                <button 
                                  onClick={() => handleMessageClient(session)}
                                  className="p-1.5 bg-[#0d0d0d] rounded-lg touch-active"
                                >
                                  <MessageCircle className="w-3.5 h-3.5 text-primary" />
                                </button>
                              )}
                              <button 
                                onClick={() => setShowSessionDetail(session)}
                                className="px-2 py-1 bg-[#0d0d0d] rounded-lg text-[9px] text-primary font-medium touch-active"
                              >
                                Details
                              </button>
                              <span className={`px-2 py-0.5 text-[9px] font-medium rounded-full ${
                                session.status === "done" ? "bg-green-500/20 text-green-500" :
                                session.status === "now" ? "bg-primary/20 text-primary" :
                                "bg-muted text-muted-foreground"
                              }`}>
                                {session.status === "done" ? "Done" : session.status === "now" ? "Now" : "Soon"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* This Week Summary */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">This Week Summary</h2>
                        <span className="text-[10px] text-muted-foreground">Feb 3-9, 2026</span>
                      </div>
                      {/* Summary Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-secondary rounded-lg p-2.5 text-center">
                          <p className="text-lg font-bold text-primary">{nextWeekSchedule.reduce((acc, d) => acc + d.sessions, 0)}</p>
                          <p className="text-[9px] text-muted-foreground">Total Sessions</p>
                        </div>
                        <div className="bg-secondary rounded-lg p-2.5 text-center">
                          <p className="text-lg font-bold text-foreground">{nextWeekSchedule.filter(d => d.sessions > 0).length}</p>
                          <p className="text-[9px] text-muted-foreground">Working Days</p>
                        </div>
                        <div className="bg-secondary rounded-lg p-2.5 text-center">
                          <p className="text-lg font-bold text-green-500">18</p>
                          <p className="text-[9px] text-muted-foreground">Unique Clients</p>
                        </div>
                      </div>
                      {/* Staff Members Summary */}
                      <p className="text-[10px] text-muted-foreground mb-2 font-medium">Staff Sessions Overview</p>
                      <div className="space-y-2">
                        {staffData.slice(0, 3).map((staff) => (
                          <div key={staff.id} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold">
                                {staff.avatar}
                              </div>
                              <span className="text-xs text-foreground">{staff.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-primary">{staff.stats.week.sessions}</span>
                              <span className="text-[9px] text-muted-foreground">sessions</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Calendar */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              if (calendarMonth === 0) {
                                setCalendarMonth(11)
                                setCalendarYear(calendarYear - 1)
                              } else {
                                setCalendarMonth(calendarMonth - 1)
                              }
                            }}
                            className="p-1 rounded-lg bg-secondary touch-active"
                          >
                            <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                          <h2 className="text-sm font-semibold text-foreground min-w-[110px] text-center">
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][calendarMonth]} {calendarYear}
                          </h2>
                          <button 
                            onClick={() => {
                              if (calendarMonth === 11) {
                                setCalendarMonth(0)
                                setCalendarYear(calendarYear + 1)
                              } else {
                                setCalendarMonth(calendarMonth + 1)
                              }
                            }}
                            className="p-1 rounded-lg bg-secondary touch-active"
                          >
                            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                        </div>
                        <CalendarDays className="w-4 h-4 text-primary" />
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                          <span key={i} className="text-[9px] text-muted-foreground font-medium">{d}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 28 }, (_, i) => {
                          const day = i + 1
                          const hasSession = monthlyActivities[day]
                          const isToday = day === 3 && calendarMonth === 1 && calendarYear === 2026
                          const isSelected = selectedCalendarDate === day
                          return (
                            <button 
                              key={day}
                              onClick={() => {
                                setSelectedCalendarDate(day)
                                if (hasSession) setShowDayDetail(true)
                              }}
                              className={`aspect-square rounded-md flex items-center justify-center text-[10px] touch-active transition-all ${
                                isSelected
                                  ? "ring-2 ring-primary ring-offset-1 ring-offset-[#141414]"
                                  : ""
                              } ${
                                isToday 
                                  ? "bg-primary text-primary-foreground font-bold"
                                  : hasSession
                                    ? "bg-primary/30 text-primary font-medium border border-primary/30 hover:bg-primary/40"
                                    : "text-muted-foreground hover:bg-secondary"
                              }`}
                            >
                              {day}
                            </button>
                          )
                        })}
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
                          <span className="text-[9px] text-muted-foreground">Today</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-sm bg-primary/30 border border-primary/30" />
                          <span className="text-[9px] text-muted-foreground">Has Sessions</span>
                        </div>
                      </div>
                    </div>

                    {/* Staff Instructions */}
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-4 border border-blue-500/20">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                          <Info className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xs font-semibold text-foreground mb-2">Quick Guide</h3>
                          <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                              <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 text-[8px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                              <span className="text-[10px] text-muted-foreground">Tap any highlighted date on the calendar to see scheduled clients</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 text-[8px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                              <span className="text-[10px] text-muted-foreground">Use arrows to navigate between months</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 text-[8px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                              <span className="text-[10px] text-muted-foreground">Mark sessions as complete from the Details button</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Day Detail Modal */}
                {showDayDetail && selectedCalendarDate && (
                  <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl p-5 border border-border/50 animate-slide-up">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold text-foreground">
                          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][calendarMonth]} {selectedCalendarDate}, {calendarYear}
                        </h3>
                        <button onClick={() => setShowDayDetail(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {monthlyActivities[selectedCalendarDate] ? (
                          <>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xs font-medium text-primary">{monthlyActivities[selectedCalendarDate].sessions} sessions scheduled</span>
                            </div>
                            {/* Sample sessions for the day */}
                            {["9:00 AM - Maria Santos (PT)", "11:00 AM - John Reyes (Weights)", "2:00 PM - Group Class (HIIT)", "4:00 PM - Alex Cruz (Cardio)"].slice(0, monthlyActivities[selectedCalendarDate].sessions).map((session, i) => (
                              <div key={i} className="p-3 bg-secondary rounded-lg">
                                <p className="text-xs text-foreground">{session}</p>
                              </div>
                            ))}
                          </>
                        ) : (
                          <p className="text-sm text-muted-foreground text-center py-4">No sessions scheduled</p>
                        )}
                      </div>
                      <button 
                        onClick={() => setShowDayDetail(false)}
                        className="w-full mt-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold touch-active text-sm"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                {/* Staff Clients Tab */}
                {activeTab === "clients" && (
                  <div className="space-y-4">
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Your Clients</h2>
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full font-medium">
                          {filteredClients.length} total
                        </span>
                      </div>

                      {/* Package Filter */}
                      <div className="flex gap-1.5 mb-3 overflow-x-auto hide-scrollbar pb-1 -mx-1 px-1">
                        {packageFilters.map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setClientFilter(filter)}
                            className={`px-2.5 py-1.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-all touch-active ${
                              clientFilter === filter
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-2">
                        {filteredClients.map((client) => (
                          <button 
                            key={client.id}
                            onClick={() => setShowClientDetail(client)}
                            className="w-full flex items-center justify-between p-2.5 bg-secondary rounded-xl touch-active card-press"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center">
                                <span className="text-[10px] font-bold text-primary">{client.avatar}</span>
                              </div>
                              <div className="text-left">
                                <p className="text-xs font-semibold text-foreground">{client.name}</p>
                                <p className="text-[9px] text-muted-foreground">{client.package}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <p className="text-[10px] font-bold text-foreground">{client.sessionsLeft}/{client.totalSessions}</p>
                                <p className="text-[8px] text-muted-foreground">sessions</p>
                              </div>
                              <span className={`px-2 py-0.5 text-[9px] font-medium rounded-full ${
                                client.status === "paid" ? "bg-green-500/20 text-green-500" :
                                client.status === "expiring" ? "bg-yellow-500/20 text-yellow-500" :
                                "bg-red-500/20 text-red-500"
                              }`}>
                                {client.status === "paid" ? "Paid" : client.status === "expiring" ? "Expiring" : "Unpaid"}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Staff Stats Tab */}
                {activeTab === "stats" && (
                  <div className="space-y-4">
                    {/* Time Toggle */}
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-semibold text-foreground">Your Performance</h2>
                      <div className="flex items-center bg-secondary rounded-full p-0.5">
                        {(["day", "week", "month"] as const).map((period) => (
                          <button
                            key={period}
                            onClick={() => setStaffStatsView(period)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all capitalize ${
                              staffStatsView === period
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {period}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Period Label */}
                    <p className="text-[11px] text-muted-foreground">
                      {staffStatsView === "day" ? "February 3, 2026" : 
                       staffStatsView === "week" ? "This Week - February 2026" : 
                       "February 2026"}
                    </p>

                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-xl font-bold text-foreground">{currentStats.sessions}</p>
                          <p className="text-[9px] text-muted-foreground">
                            Sessions {staffStatsView === "day" ? "Today" : staffStatsView === "week" ? "This Week" : "This Month"}
                          </p>
                        </div>
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-xl font-bold text-yellow-500">{currentStats.rating}</p>
                          <p className="text-[9px] text-muted-foreground">Avg Rating</p>
                        </div>
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-xl font-bold text-foreground">{currentStats.clients}</p>
                          <p className="text-[9px] text-muted-foreground">Active Clients</p>
                        </div>
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-xl font-bold text-green-500">{currentStats.attendance}%</p>
                          <p className="text-[9px] text-muted-foreground">Attendance</p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Reviews */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Recent Reviews</h2>
                      <div className="space-y-2">
                        {[
                          { client: "Alex Cruz", rating: 5, comment: "Great session!", date: "Today" },
                          { client: "Maria Santos", rating: 5, comment: "Best trainer!", date: "Yesterday" },
                        ].map((review, i) => (
                          <div key={i} className="p-2.5 bg-secondary rounded-xl">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-xs font-semibold text-foreground">{review.client}</p>
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: review.rating }).map((_, j) => (
                                  <Star key={j} className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                                ))}
                              </div>
                            </div>
                            <p className="text-[10px] text-muted-foreground">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Staff More Tab */}
                {activeTab === "more" && (
                  <div className="space-y-2">
                    {staffMoreItems.map((item, i) => {
                      const Icon = item.icon
                      const handleClick = () => {
                        if (item.id === "sessionHistory") setShowSessionHistory(true)
                        else if (item.id === "monthlyReport") setShowMonthlyReport(true)
                        else if (item.id === "timeOff") setShowTimeOff(true)
                        else if (item.id === "help") setShowHelp(true)
                        else if (item.id === "preferences") setShowPreferences(true)
                        else if (item.id === "about") setShowAbout(true)
                      }
                      return (
                        <button key={i} onClick={handleClick} className="w-full flex items-center justify-between p-4 bg-[#141414] rounded-xl border border-border/30 touch-active card-press">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-semibold text-foreground">{item.label}</p>
                              <p className="text-[11px] text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </button>
                      )
                    })}
                  </div>
                )}
              </>
            )}

            {/* Leads View */}
            {activeRole === "Leads" && (
              <>
                {activeTab === "dashboard" && (
                  <div className="space-y-4">
                    {/* Pipeline Overview */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Pipeline Overview</h2>
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-[10px] rounded-full font-medium">{leadsPipelineStats.conversionRate} conversion</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="bg-red-500/10 rounded-xl p-3 text-center border border-red-500/20">
                          <p className="text-[9px] text-red-400">Hot Leads</p>
                          <p className="text-lg font-bold text-red-500">{leadsPipelineStats.hot}</p>
                        </div>
                        <div className="bg-yellow-500/10 rounded-xl p-3 text-center border border-yellow-500/20">
                          <p className="text-[9px] text-yellow-400">Warm</p>
                          <p className="text-lg font-bold text-yellow-500">{leadsPipelineStats.warm}</p>
                        </div>
                        <div className="bg-blue-500/10 rounded-xl p-3 text-center border border-blue-500/20">
                          <p className="text-[9px] text-blue-400">Cold</p>
                          <p className="text-lg font-bold text-blue-500">{leadsPipelineStats.cold}</p>
                        </div>
                        <div className="bg-green-500/10 rounded-xl p-3 text-center border border-green-500/20">
                          <p className="text-[9px] text-green-400">Converted</p>
                          <p className="text-lg font-bold text-green-500">{leadsPipelineStats.converted}</p>
                        </div>
                      </div>
                    </div>

                    {/* Today's Follow-ups */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Today's Follow-ups</h2>
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full font-medium">
                          {leadsData.filter(l => l.nextFollowUp === "Feb 4, 2026" || l.nextFollowUp === "Today").length} due
                        </span>
                      </div>
                      <div className="space-y-2">
                        {leadsData.filter(l => l.nextFollowUp === "Feb 4, 2026" || l.nextFollowUp === "Today" || l.nextFollowUp === "Feb 3, 2026").slice(0, 5).map((lead) => (
                          <div key={lead.id} className="flex items-center justify-between p-2.5 bg-secondary rounded-xl">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-2 h-2 rounded-full ${
                                lead.status === "hot" ? "bg-red-500" :
                                lead.status === "warm" ? "bg-yellow-500" : "bg-blue-500"
                              }`} />
                              <div>
                                <p className="text-xs font-semibold text-foreground">{lead.name}</p>
                                <p className="text-[9px] text-muted-foreground">{lead.interest}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-1.5 bg-green-500/20 rounded-lg touch-active">
                                <Phone className="w-3.5 h-3.5 text-green-500" />
                              </button>
                              <button className="p-1.5 bg-primary/20 rounded-lg touch-active">
                                <Mail className="w-3.5 h-3.5 text-primary" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
                      <div className="grid grid-cols-3 gap-2">
                        <button className="bg-primary text-primary-foreground rounded-xl p-3 text-left touch-active card-press">
                          <Plus className="w-5 h-5 mb-2" />
                          <p className="text-xs font-semibold">Add Lead</p>
                          <p className="text-[9px] opacity-80">New prospect</p>
                        </button>
                        <button 
                          onClick={() => setActiveTab("leads")}
                          className="bg-secondary rounded-xl p-3 text-left touch-active card-press"
                        >
                          <Users className="w-5 h-5 text-green-500 mb-2" />
                          <p className="text-xs font-semibold text-foreground">All Leads</p>
                          <p className="text-[9px] text-muted-foreground">{leadsData.length} total</p>
                        </button>
                        <button 
                          onClick={() => setActiveTab("pipeline")}
                          className="bg-secondary rounded-xl p-3 text-left touch-active card-press"
                        >
                          <TrendingUp className="w-5 h-5 text-yellow-500 mb-2" />
                          <p className="text-xs font-semibold text-foreground">Pipeline</p>
                          <p className="text-[9px] text-muted-foreground">View stages</p>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Leads List Tab */}
                {activeTab === "leads" && (
                  <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-sm font-semibold text-foreground">All Leads</h2>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 bg-secondary rounded-lg">
                          <Search className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 bg-secondary rounded-lg">
                          <Filter className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="px-2.5 py-1 bg-primary text-primary-foreground text-[10px] rounded-lg font-medium">
                          <Plus className="w-3 h-3 inline mr-1" />
                          Add Lead
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                      {leadsData.map((lead) => (
                        <div key={lead.id} className="flex items-center justify-between p-3 bg-secondary rounded-xl touch-active card-press">
                          <div className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full ${
                              lead.status === "hot" ? "bg-red-500" :
                              lead.status === "warm" ? "bg-yellow-500" :
                              lead.status === "cold" ? "bg-blue-500" :
                              lead.status === "converted" ? "bg-green-500" : "bg-muted-foreground"
                            }`} />
                            <div>
                              <p className="text-xs font-semibold text-foreground">{lead.name}</p>
                              <p className="text-[9px] text-muted-foreground">{lead.interest} | {lead.source}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-muted-foreground">Next: {lead.nextFollowUp}</p>
                            <p className="text-[9px] text-muted-foreground">{lead.assignedTo}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Follow-ups Tab */}
                {activeTab === "followups" && (
                  <div className="space-y-4">
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Overdue Follow-ups</h2>
                      <div className="space-y-2">
                        {leadsData.filter(l => l.nextFollowUp === "Feb 3, 2026").map((lead) => (
                          <div key={lead.id} className="flex items-center justify-between p-2.5 bg-red-500/10 rounded-xl border border-red-500/20">
                            <div className="flex items-center gap-2.5">
                              <AlertCircle className="w-4 h-4 text-red-500" />
                              <div>
                                <p className="text-xs font-semibold text-foreground">{lead.name}</p>
                                <p className="text-[9px] text-red-400">Due: {lead.nextFollowUp}</p>
                              </div>
                            </div>
                            <button className="px-2.5 py-1 bg-red-500 text-white text-[10px] rounded-lg font-medium touch-active">
                              Follow up now
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Today's Schedule</h2>
                      <div className="space-y-2">
                        {leadsData.filter(l => l.nextFollowUp === "Feb 4, 2026").map((lead) => (
                          <div key={lead.id} className="flex items-center justify-between p-2.5 bg-secondary rounded-xl">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-2 h-2 rounded-full ${
                                lead.status === "hot" ? "bg-red-500" :
                                lead.status === "warm" ? "bg-yellow-500" : "bg-blue-500"
                              }`} />
                              <div>
                                <p className="text-xs font-semibold text-foreground">{lead.name}</p>
                                <p className="text-[9px] text-muted-foreground">{lead.notes}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-1.5 bg-green-500/20 rounded-lg touch-active">
                                <Phone className="w-3.5 h-3.5 text-green-500" />
                              </button>
                              <button className="px-2.5 py-1 bg-primary text-primary-foreground text-[10px] rounded-lg font-medium touch-active">
                                Done
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Pipeline Tab */}
                {activeTab === "pipeline" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Hot Leads */}
                      <div className="bg-[#141414] rounded-xl p-4 border border-red-500/30">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xs font-semibold text-red-500">Hot Leads</h3>
                          <span className="px-2 py-0.5 bg-red-500/20 text-red-500 text-[9px] rounded-full font-medium">{leadsPipelineStats.hot}</span>
                        </div>
                        <div className="space-y-2">
                          {leadsData.filter(l => l.status === "hot").map((lead) => (
                            <div key={lead.id} className="p-2 bg-secondary rounded-lg">
                              <p className="text-[10px] font-semibold text-foreground">{lead.name}</p>
                              <p className="text-[8px] text-muted-foreground">{lead.interest}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Warm Leads */}
                      <div className="bg-[#141414] rounded-xl p-4 border border-yellow-500/30">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xs font-semibold text-yellow-500">Warm Leads</h3>
                          <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-[9px] rounded-full font-medium">{leadsPipelineStats.warm}</span>
                        </div>
                        <div className="space-y-2">
                          {leadsData.filter(l => l.status === "warm").map((lead) => (
                            <div key={lead.id} className="p-2 bg-secondary rounded-lg">
                              <p className="text-[10px] font-semibold text-foreground">{lead.name}</p>
                              <p className="text-[8px] text-muted-foreground">{lead.interest}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Conversion Stats</h2>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-[9px] text-muted-foreground">Conversion Rate</p>
                          <p className="text-lg font-bold text-green-500">{leadsPipelineStats.conversionRate}</p>
                        </div>
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-[9px] text-muted-foreground">Avg Time</p>
                          <p className="text-lg font-bold text-foreground">{leadsPipelineStats.avgTimeToConvert}</p>
                        </div>
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-[9px] text-muted-foreground">Total Leads</p>
                          <p className="text-lg font-bold text-foreground">{leadsPipelineStats.total}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Leads More Tab */}
                {activeTab === "more" && (
                  <div className="space-y-2">
                    {[
                      { icon: FileText, label: "Lead Reports", description: "View conversion reports" },
                      { icon: Target, label: "Goals & Targets", description: "Set recruitment goals" },
                      { icon: Bell, label: "Notification Settings", description: "Configure alerts" },
                      { icon: HelpCircle, label: "Help & Support", description: "Get assistance" },
                    ].map((item, i) => {
                      const Icon = item.icon
                      return (
                        <button key={i} className="w-full flex items-center justify-between p-4 bg-[#141414] rounded-xl border border-border/30 touch-active card-press">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-semibold text-foreground">{item.label}</p>
                              <p className="text-[11px] text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </button>
                      )
                    })}
                  </div>
                )}
              </>
            )}

            {/* Admin View */}
            {activeRole === "Admin" && (
              <>
                {activeTab === "dashboard" && (
                  <div className="space-y-4">
                    {/* Overview Stats */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Overview</h2>
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-[10px] rounded-full font-medium">All systems OK</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-[9px] text-muted-foreground">Active Members</p>
                          <p className="text-lg font-bold text-foreground">128</p>
                        </div>
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-[9px] text-muted-foreground">Revenue Today</p>
                          <p className="text-lg font-bold text-foreground">P26k</p>
                        </div>
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-[9px] text-muted-foreground">Sessions Today</p>
                          <p className="text-lg font-bold text-foreground">14</p>
                        </div>
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-[9px] text-muted-foreground">Active Staff</p>
                          <p className="text-lg font-bold text-foreground">8</p>
                        </div>
                      </div>
                    </div>

                    {/* Branch Tracking */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Branch Performance</h2>
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full font-medium">3 branches</span>
                      </div>
                      <div className="space-y-2">
                        {branchData.map((branch) => (
                          <div key={branch.id} className="p-3 bg-secondary rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                <div>
                                  <p className="text-xs font-semibold text-foreground">{branch.name}</p>
                                  <p className="text-[9px] text-muted-foreground">{branch.address}</p>
                                </div>
                              </div>
                              <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-[9px] rounded-full font-medium">Active</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mt-2">
                              <div className="text-center">
                                <p className="text-xs font-bold text-foreground">{branch.members}</p>
                                <p className="text-[8px] text-muted-foreground">Members</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-bold text-foreground">{branch.revenue}</p>
                                <p className="text-[8px] text-muted-foreground">Revenue</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-bold text-foreground">{branch.sessionsToday}</p>
                                <p className="text-[8px] text-muted-foreground">Sessions</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-bold text-foreground">{branch.staff}</p>
                                <p className="text-[8px] text-muted-foreground">Staff</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
                      <div className="grid grid-cols-4 gap-2">
                        <button 
                          onClick={() => setShowPackages(true)}
                          className="bg-primary text-primary-foreground rounded-xl p-3 text-left touch-active card-press"
                        >
                          <Package className="w-5 h-5 mb-2" />
                          <p className="text-xs font-semibold">Packages</p>
                          <p className="text-[9px] opacity-80">Manage plans</p>
                        </button>
                        <button 
                          onClick={() => setShowReports(true)}
                          className="bg-secondary rounded-xl p-3 text-left touch-active card-press"
                        >
                          <FileText className="w-5 h-5 text-green-500 mb-2" />
                          <p className="text-xs font-semibold text-foreground">Reports</p>
                          <p className="text-[9px] text-muted-foreground">Generate</p>
                        </button>
                        <button 
                          onClick={() => setShowAnnouncements(true)}
                          className="bg-secondary rounded-xl p-3 text-left touch-active card-press"
                        >
                          <Bell className="w-5 h-5 text-blue-500 mb-2" />
                          <p className="text-xs font-semibold text-foreground">Announce</p>
                          <p className="text-[9px] text-muted-foreground">Send alerts</p>
                        </button>
                        <button 
                          onClick={() => setShowAnalytics(true)}
                          className="bg-secondary rounded-xl p-3 text-left touch-active card-press"
                        >
                          <BarChart3 className="w-5 h-5 text-yellow-500 mb-2" />
                          <p className="text-xs font-semibold text-foreground">Analytics</p>
                          <p className="text-[9px] text-muted-foreground">Insights</p>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Admin Members Tab */}
                {activeTab === "members" && (
                  <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-sm font-semibold text-foreground">All Members</h2>
                      <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full font-medium">{clientsData.length} total</span>
                    </div>
                    {/* Package Filter Toggle */}
                    <div className="flex gap-1 mb-3 overflow-x-auto pb-1 scrollbar-hide">
                      {["All", "Full 48", "Staggered 48", "Staggered 24", "Pilates", "PT"].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setAdminMemberFilter(filter)}
                          className={`px-2.5 py-1 rounded-full text-[9px] font-medium whitespace-nowrap transition-all ${
                            adminMemberFilter === filter
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-2 max-h-[55vh] overflow-y-auto">
                      {clientsData
                        .filter(c => {
                          if (adminMemberFilter === "All") return true
                          if (adminMemberFilter === "Full 48") return c.packageType === "full48"
                          if (adminMemberFilter === "Staggered 48") return c.packageType === "staggered48"
                          if (adminMemberFilter === "Staggered 24") return c.packageType === "staggered24"
                          if (adminMemberFilter === "Pilates") return c.packageType === "pilates"
                          if (adminMemberFilter === "PT") return c.packageType === "pt"
                          return true
                        })
                        .slice(0, 10)
                        .map((member) => (
                        <button 
                          key={member.id}
                          onClick={() => setShowMemberDetail(membersData.find(m => m.name === member.name) || membersData[0])}
                          className="w-full flex items-center justify-between p-2.5 bg-secondary rounded-xl touch-active card-press"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                              <span className="text-[10px] font-bold text-primary">{member.avatar}</span>
                            </div>
                            <div className="text-left">
                              <p className="text-xs font-semibold text-foreground">{member.name}</p>
                              <p className="text-[9px] text-muted-foreground">{member.package}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-muted-foreground">{member.sessionsLeft}/{member.totalSessions}</span>
                            <span className={`px-2 py-0.5 text-[9px] font-medium rounded-full ${
                              member.status === "paid" ? "bg-green-500/20 text-green-500" :
                              member.status === "expiring" ? "bg-yellow-500/20 text-yellow-500" :
                              "bg-red-500/20 text-red-500"
                            }`}>
                              {member.status === "paid" ? "Active" : member.status === "expiring" ? "Expiring" : "Expired"}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Admin Payments Tab */}
                {activeTab === "payments" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-[#141414] rounded-xl p-3 border border-border/30">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-sm font-bold text-primary">â‚±</span>
                          <p className="text-[9px] text-muted-foreground">Today</p>
                        </div>
                        <p className="text-xl font-bold text-foreground">â‚±26.5k</p>
                        <p className="text-[9px] text-green-500">+8%</p>
                      </div>
                      <div className="bg-[#141414] rounded-xl p-3 border border-border/30">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-sm font-bold text-primary">â‚±</span>
                          <p className="text-[9px] text-muted-foreground">This Month</p>
                        </div>
                        <p className="text-xl font-bold text-foreground">â‚±485k</p>
                        <p className="text-[9px] text-green-500">+12%</p>
                      </div>
                      <div className="bg-[#141414] rounded-xl p-3 border border-border/30">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-sm font-bold text-yellow-500">â‚±</span>
                          <p className="text-[9px] text-muted-foreground">Pending</p>
                        </div>
                        <p className="text-xl font-bold text-yellow-500">â‚±52.1k</p>
                        <p className="text-[9px] text-muted-foreground">12 pending</p>
                      </div>
                    </div>

                    {/* Payment Reminders Needed with Filter */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Payment Reminders Needed</h2>
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-500 text-[10px] rounded-full font-medium">
                          {clientsData.filter(c => c.status === "unpaid" || c.status === "expiring").length}
                        </span>
                      </div>
                      {/* Reminder Filter Toggle */}
                      <div className="flex gap-1 mb-3 overflow-x-auto pb-1 scrollbar-hide">
                        {["All", "Full 48", "Staggered", "Pilates", "PT"].map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setReminderFilter(filter)}
                            className={`px-2 py-0.5 rounded-full text-[8px] font-medium whitespace-nowrap transition-all ${
                              reminderFilter === filter
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {clientsData
                          .filter(c => c.status === "unpaid" || c.status === "expiring")
                          .filter(c => {
                            if (reminderFilter === "All") return true
                            if (reminderFilter === "Staggered") return c.packageType.includes("staggered")
                            return c.packageType.toLowerCase().includes(reminderFilter.toLowerCase().replace(" ", ""))
                          })
                          .map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-2.5 bg-secondary rounded-xl">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                <span className="text-[10px] font-bold text-primary">{member.avatar}</span>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-foreground">{member.name}</p>
                                <p className="text-[9px] text-muted-foreground">{member.package}</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => alert(`Payment reminder sent to ${member.name}`)}
                              className="px-2.5 py-1 bg-primary text-primary-foreground text-[10px] rounded-lg font-medium touch-active"
                            >
                              Send Reminder
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Transactions with Filter */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-sm font-semibold text-foreground">Recent Transactions</h2>
                        <button className="text-[10px] text-primary font-medium">View All</button>
                      </div>
                      {/* Transaction Filter Toggle */}
                      <div className="flex gap-1 mb-3 overflow-x-auto pb-1 scrollbar-hide">
                        {["All", "Full Package", "PT Session", "Monthly"].map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setAdminPaymentFilter(filter)}
                            className={`px-2 py-0.5 rounded-full text-[8px] font-medium whitespace-nowrap transition-all ${
                              adminPaymentFilter === filter
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-2">
                        {adminTransactions
                          .filter(tx => {
                            if (adminPaymentFilter === "All") return true
                            return tx.type.toLowerCase().includes(adminPaymentFilter.toLowerCase())
                          })
                          .map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between p-2.5 bg-secondary rounded-xl">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                tx.status === "completed" ? "bg-green-500/20" : "bg-yellow-500/20"
                              }`}>
                                <span className={`text-[10px] font-bold ${tx.status === "completed" ? "text-green-500" : "text-yellow-500"}`}>{tx.avatar}</span>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-foreground">{tx.name}</p>
                                <p className="text-[9px] text-muted-foreground">{tx.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-bold text-foreground">{tx.amount.replace("P", "â‚±")}</p>
                              <p className="text-[8px] text-muted-foreground">{tx.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Admin Staff Tab */}
                {activeTab === "staff" && (
                  <div className="space-y-4">
                    {/* Staff List */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Staff Management</h2>
                        <div className="flex items-center bg-secondary rounded-full p-0.5">
                          {(["day", "week", "month"] as const).map((period) => (
                            <button
                              key={period}
                              onClick={() => setStaffTimeView(period)}
                              className={`px-2 py-0.5 rounded-full text-[9px] font-medium transition-all capitalize ${
                                staffTimeView === period
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {period}
                            </button>
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground mb-3">
                        {staffTimeView === "day" ? "February 3, 2026" : 
                         staffTimeView === "week" ? "This Week" : 
                         "February 2026"}
                      </p>
                      <div className="space-y-2">
                        {staffData.map((staff) => (
                          <button 
                            key={staff.id}
                            onClick={() => setShowStaffDetail(staff)}
                            className="w-full flex items-center justify-between p-2.5 bg-secondary rounded-xl touch-active card-press"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="relative">
                                <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center">
                                  <span className="text-[10px] font-bold text-primary">{staff.avatar}</span>
                                </div>
                                <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-secondary ${
                                  staff.status === "online" ? "bg-green-500" : "bg-muted-foreground"
                                }`} />
                              </div>
                              <p className="text-xs font-semibold text-foreground">{staff.name}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-center">
                                <p className="text-xs font-bold text-foreground">{staff.stats[staffTimeView].sessions}</p>
                                <p className="text-[8px] text-muted-foreground">Sessions</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-bold text-yellow-500">{staff.rating}</p>
                                <p className="text-[8px] text-muted-foreground">Rating</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Staff Attendance Calendar */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-semibold text-foreground">Attendance - {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][attendanceMonth]} 2026</h2>
                          <div className="flex items-center gap-1">
                            <button onClick={() => setAttendanceMonth(Math.max(0, attendanceMonth - 1))} className="p-0.5 hover:bg-secondary rounded">
                              <ChevronLeft className="w-3 h-3 text-muted-foreground" />
                            </button>
                            <button onClick={() => setAttendanceMonth(Math.min(11, attendanceMonth + 1))} className="p-0.5 hover:bg-secondary rounded">
                              <ChevronRight className="w-3 h-3 text-muted-foreground" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-[8px] text-muted-foreground">Present</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            <span className="text-[8px] text-muted-foreground">Absent</span>
                          </div>
                        </div>
                      </div>
                      {/* Branch Filter */}
                      <div className="flex gap-1 mb-3 overflow-x-auto pb-1">
                        {["All", "Malingap", "E.Rod", "Cainta"].map((branch) => (
                          <button
                            key={branch}
                            onClick={() => setBranchFilter(branch)}
                            className={`px-2 py-0.5 rounded-full text-[8px] font-medium whitespace-nowrap transition-all ${
                              branchFilter === branch
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {branch}
                          </button>
                        ))}
                      </div>
                      {/* Coach Filter */}
                      <div className="flex gap-1 mb-3 overflow-x-auto pb-1">
                        {["All", "Coach Joaquin", "Coach Maria", "Coach Carlos", "Coach Ana"].map((coach) => (
                          <button
                            key={coach}
                            onClick={() => setAttendanceCoachFilter(coach)}
                            className={`px-2 py-0.5 rounded-full text-[8px] font-medium whitespace-nowrap transition-all ${
                              attendanceCoachFilter === coach
                                ? "bg-green-500/20 text-green-500 border border-green-500/30"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {coach === "All" ? "All Coaches" : coach.replace("Coach ", "")}
                          </button>
                        ))}
                      </div>
                      {/* Mini Calendar Grid */}
                      <div className="grid grid-cols-7 gap-0.5 text-center mb-2">
                        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                          <div key={i} className="text-[8px] text-muted-foreground py-1">{day}</div>
                        ))}
                        {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
                          const hasAttendance = staffAttendanceData[day]
                          const isPresent = hasAttendance?.present
                          return (
                            <div 
                              key={day}
                              className={`aspect-square flex items-center justify-center text-[9px] rounded ${
                                hasAttendance 
                                  ? isPresent 
                                    ? "bg-green-500/20 text-green-500" 
                                    : "bg-red-500/20 text-red-500"
                                  : day <= 3 ? "bg-secondary text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              {day}
                            </div>
                          )
                        })}
                      </div>
                      {/* Today's Attendance Summary */}
                      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border/30">
                        <div className="text-center">
                          <p className="text-lg font-bold text-green-500">{staffData.filter(s => s.status === "online").length}</p>
                          <p className="text-[8px] text-muted-foreground">Present Today</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-red-500">{staffData.filter(s => s.status === "offline").length}</p>
                          <p className="text-[8px] text-muted-foreground">Absent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-foreground">{staffData.length}</p>
                          <p className="text-[8px] text-muted-foreground">Total Staff</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Admin Settings Tab */}
                {activeTab === "settings" && (
                  <div className="space-y-2">
                    {[
                      { icon: Bell, label: "Notification Settings", description: "Configure alerts", action: () => setShowNotificationSettings(true) },
                      { icon: Lock, label: "Access Control", description: "Manage permissions", action: () => setShowAccessControl(true) },
                      { icon: Smartphone, label: "App Settings", description: "General configuration", action: () => setShowAppSettings(true) },
                      { icon: Info, label: "About BearFit", description: "Version 2.0.1", action: () => setShowAboutBearFit(true) },
                    ].map((item, i) => {
                      const Icon = item.icon
                      return (
                        <button key={i} onClick={item.action} className="w-full flex items-center justify-between p-4 bg-[#141414] rounded-xl border border-border/30 touch-active card-press">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-semibold text-foreground">{item.label}</p>
                              <p className="text-[11px] text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </button>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col min-h-screen">
        <main className="flex-1 overflow-y-auto pb-20">
          {/* Member View - Mobile */}
          {activeRole === "Member" && (
            <div className="animate-slide-in">
              <Header 
                onOpenChat={() => setShowChat(true)} 
                onOpenNotifications={() => setShowNotifications(true)}
                activeRole={activeRole}
                onRoleChange={handleRoleChange}
              />
              {activeTab === "home" && (
                <>
                  <ProfileCard />
                  <SessionCard />
                  <ActivityLog />
                  <PromoBanner />
                </>
              )}
              {activeTab === "schedule" && <SchedulePage />}
              {activeTab === "payment" && <PaymentPage />}
              {activeTab === "profile" && <ProfilePage />}
              {activeTab === "more" && (
                <div className="px-4 space-y-2 pb-4">
                  {memberMoreItems.map((item, i) => {
                    const Icon = item.icon
                    const handleClick = () => {
                      if (item.id === "referral") setShowReferral(true)
                      else if (item.id === "help") setShowHelp(true)
                      else if (item.id === "privacy") setShowPrivacy(true)
                      else if (item.id === "language") setShowLanguage(true)
                      else if (item.id === "notifications") setShowNotifications(true)
                      else if (item.id === "about") setShowAbout(true)
                    }
                    return (
                      <button key={i} onClick={handleClick} className="w-full flex items-center justify-between p-3 bg-[#141414] rounded-xl border border-border/30 touch-active card-press">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-semibold text-foreground">{item.label}</p>
                            <p className="text-[10px] text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Staff View - Mobile */}
          {activeRole === "Staff" && (
            <div className="animate-slide-in">
              <Header 
                onOpenChat={() => setShowChat(true)} 
                onOpenNotifications={() => setShowNotifications(true)}
                activeRole={activeRole}
                onRoleChange={handleRoleChange}
              />
              <div className="px-4 space-y-4 pb-4">
                {/* Same content as desktop but in mobile container */}
                {activeTab === "home" && (
                  <>
                    {/* Check-in Card */}
                    <div className={`rounded-xl p-3 border ${staffCheckedIn ? "bg-green-500/10 border-green-500/30" : "bg-[#141414] border-border/30"}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-foreground">
                            {staffCheckedIn ? "Checked In" : "Not Checked In"}
                          </p>
                          <p className="text-[9px] text-muted-foreground">
                            {staffCheckedIn ? "Since 6:00 AM" : "Tap to check in"}
                          </p>
                        </div>
                        <button 
                          onClick={handleStaffCheckIn}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-semibold touch-active ${
                            staffCheckedIn 
                              ? "bg-red-500/20 text-red-500" 
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {staffCheckedIn ? <LogOut className="w-3.5 h-3.5" /> : <LogIn className="w-3.5 h-3.5" />}
                          {staffCheckedIn ? "Out" : "In"}
                        </button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => setShowScanQR(true)}
                          className="bg-secondary rounded-xl p-3 text-left touch-active card-press"
                        >
                          <QrCode className="w-5 h-5 text-primary mb-2" />
                          <p className="text-xs font-semibold text-foreground">Scan QR</p>
                          <p className="text-[9px] text-muted-foreground">Fast check-in</p>
                        </button>
                        <button 
                          onClick={() => setShowCreateSession(true)}
                          className="bg-secondary rounded-xl p-3 text-left touch-active card-press"
                        >
                          <CalendarPlus className="w-5 h-5 text-green-500 mb-2" />
                          <p className="text-xs font-semibold text-foreground">Create Session</p>
                          <p className="text-[9px] text-muted-foreground">Add schedule slot</p>
                        </button>
                        <button 
                          onClick={() => setActiveTab("clients")}
                          className="bg-secondary rounded-xl p-3 text-left touch-active card-press"
                        >
                          <Users className="w-5 h-5 text-blue-500 mb-2" />
                          <p className="text-xs font-semibold text-foreground">Client List</p>
                          <p className="text-[9px] text-muted-foreground">View members</p>
                        </button>
                        <button 
                          onClick={() => setShowWorkoutLog(true)}
                          className="bg-secondary rounded-xl p-3 text-left touch-active card-press"
                        >
                          <Dumbbell className="w-5 h-5 text-yellow-500 mb-2" />
                          <p className="text-xs font-semibold text-foreground">Workout Log</p>
                          <p className="text-[9px] text-muted-foreground">Record exercises</p>
                        </button>
                      </div>
                    </div>

                    {/* Recent Check-ins */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Recent Check-ins</h2>
                      <div className="space-y-2">
                        {clientsData.slice(0, 3).map((client, i) => (
                          <div key={client.id} className="flex items-center justify-between p-2.5 bg-secondary rounded-xl">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                <span className="text-[10px] font-bold text-primary">{client.avatar}</span>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-foreground">{client.name}</p>
                                <p className="text-[9px] text-muted-foreground">{client.package}</p>
                              </div>
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                              {i === 0 ? "10:02 AM" : i === 1 ? "8:05 AM" : "6:00 AM"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "schedule" && (
                  <>
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Today's Schedule</h2>
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full font-medium">
                          {staffScheduleData.length} Sessions
                        </span>
                      </div>
                      <div className="space-y-2">
                        {staffScheduleData.map((session) => (
                          <div 
                            key={session.id}
                            className="flex items-center justify-between p-2.5 bg-secondary rounded-xl"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="text-center w-12">
                                <p className="text-[10px] font-bold text-foreground">{session.time}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-foreground">{session.client}</p>
                                <p className="text-[9px] text-muted-foreground">{session.session}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {session.phone && (
                                <button 
                                  onClick={() => handleMessageClient(session)}
                                  className="p-1.5 bg-[#0d0d0d] rounded-lg touch-active"
                                >
                                  <MessageCircle className="w-3 h-3 text-primary" />
                                </button>
                              )}
                              <button 
                                onClick={() => setShowSessionDetail(session)}
                                className="px-1.5 py-1 bg-[#0d0d0d] rounded-lg text-[8px] text-primary font-medium touch-active"
                              >
                                Details
                              </button>
                              <span className={`px-1.5 py-0.5 text-[8px] font-medium rounded-full ${
                                session.status === "done" ? "bg-green-500/20 text-green-500" :
                                session.status === "now" ? "bg-primary/20 text-primary" :
                                "bg-muted text-muted-foreground"
                              }`}>
                                {session.status === "done" ? "Done" : session.status === "now" ? "Now" : "Soon"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Next Week */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Next Week</h2>
                        <span className="text-[10px] text-muted-foreground">Feb 10-16, 2026</span>
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {nextWeekSchedule.map((day) => (
                          <div key={day.day} className="text-center">
                            <p className="text-[8px] text-muted-foreground mb-1">{day.day}</p>
                            <div className={`w-full aspect-square rounded-lg flex flex-col items-center justify-center ${
                              day.sessions > 0 ? "bg-secondary" : "bg-secondary/50"
                            }`}>
                              <span className="text-xs font-bold text-foreground">{day.date}</span>
                              {day.sessions > 0 && (
                                <span className="text-[7px] text-primary font-medium">{day.sessions}</span>
                              )}
                              {day.sessions === 0 && (
                                <span className="text-[7px] text-muted-foreground">Off</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mini Calendar */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">February 2026</h2>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setShowCoachToggle(!showCoachToggle)}
                            className={`px-2 py-0.5 rounded-full text-[8px] font-medium transition-all ${
                              showCoachToggle ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            Show Coach
                          </button>
                          <CalendarDays className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-0.5 text-center mb-1.5">
                        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                          <span key={i} className="text-[8px] text-muted-foreground font-medium">{d}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-0.5">
                        {Array.from({ length: 28 }, (_, i) => {
                          const day = i + 1
                          const hasSession = monthlyActivities[day]
                          const isToday = day === 3
                          const isSelected = selectedCalendarDate === day
                          return (
                            <button 
                              key={day}
                              onClick={() => {
                                setSelectedCalendarDate(day)
                                if (hasSession) setShowDayScheduleDetail(true)
                              }}
                              className={`aspect-square rounded flex items-center justify-center text-[9px] touch-active ${
                                isSelected
                                  ? "bg-green-500 text-white font-bold ring-2 ring-green-400"
                                  : isToday 
                                    ? "bg-primary text-primary-foreground font-bold"
                                    : hasSession
                                      ? "bg-primary/30 text-primary font-medium border border-primary/30"
                                      : "text-muted-foreground"
                              }`}
                            >
                              {day}
                            </button>
                          )
                        })}
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-sm bg-primary" />
                          <span className="text-[8px] text-muted-foreground">Today</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-sm bg-primary/30 border border-primary/30" />
                          <span className="text-[8px] text-muted-foreground">Has Sessions</span>
                        </div>
                      </div>

                      {/* Day Detail Modal */}
                      {showDayScheduleDetail && selectedCalendarDate && monthlyActivities[selectedCalendarDate] && (
                        <div className="mt-3 pt-3 border-t border-border/30">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-semibold text-foreground">
                              February {selectedCalendarDate}, 2026
                            </h3>
                            <button 
                              onClick={() => setShowDayScheduleDetail(false)}
                              className="p-1 bg-secondary rounded"
                            >
                              <X className="w-3 h-3 text-muted-foreground" />
                            </button>
                          </div>
                          <p className="text-[9px] text-muted-foreground mb-2">
                            {monthlyActivities[selectedCalendarDate].sessions} sessions scheduled
                          </p>
                          <div className="space-y-1.5 max-h-40 overflow-y-auto">
                            {Object.entries(sessionTimeSlots).slice(0, 5).map(([time, data]) => (
                              <div key={time} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-bold text-foreground w-14">{time}</span>
                                  <span className="text-[9px] text-muted-foreground">{data.clients} clients</span>
                                </div>
                                {showCoachToggle && (
                                  <span className="text-[8px] text-primary font-medium">{data.coach}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {activeTab === "clients" && (
                  <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-sm font-semibold text-foreground">Your Clients</h2>
                      <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full font-medium">
                        {filteredClients.length} total
                      </span>
                    </div>

                    {/* Package Filter */}
                    <div className="flex gap-1.5 mb-3 overflow-x-auto hide-scrollbar pb-1 -mx-1 px-1">
                      {packageFilters.map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setClientFilter(filter)}
                          className={`px-2 py-1 rounded-full text-[9px] font-medium whitespace-nowrap transition-all touch-active ${
                            clientFilter === filter
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {filteredClients.map((client) => (
                        <button 
                          key={client.id}
                          onClick={() => setShowClientDetail(client)}
                          className="w-full flex items-center justify-between p-2.5 bg-secondary rounded-xl touch-active card-press"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                              <span className="text-[10px] font-bold text-primary">{client.avatar}</span>
                            </div>
                            <div className="text-left">
                              <p className="text-xs font-semibold text-foreground">{client.name}</p>
                              <p className="text-[9px] text-muted-foreground">{client.package}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <p className="text-[10px] font-bold text-foreground">{client.sessionsLeft}/{client.totalSessions}</p>
                              <p className="text-[8px] text-muted-foreground">sessions</p>
                            </div>
                            <span className={`px-1.5 py-0.5 text-[8px] font-medium rounded-full ${
                              client.status === "paid" ? "bg-green-500/20 text-green-500" :
                              client.status === "expiring" ? "bg-yellow-500/20 text-yellow-500" :
                              "bg-red-500/20 text-red-500"
                            }`}>
                              {client.status === "paid" ? "Paid" : client.status === "expiring" ? "Expiring" : "Unpaid"}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "stats" && (
                  <>
                    {/* Check-in Status for Stats */}
                    <div className={`rounded-xl p-3 border ${staffCheckedIn ? "bg-green-500/10 border-green-500/30" : "bg-[#141414] border-border/30"}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-foreground">
                            {staffCheckedIn ? "Checked In" : "Not Checked In"}
                          </p>
                          <p className="text-[9px] text-muted-foreground">
                            {staffCheckedIn ? "Since 6:00 AM" : "Tap to check in"}
                          </p>
                        </div>
                        <button 
                          onClick={handleStaffCheckIn}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-semibold touch-active ${
                            staffCheckedIn 
                              ? "bg-red-500/20 text-red-500" 
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {staffCheckedIn ? <LogOut className="w-3.5 h-3.5" /> : <LogIn className="w-3.5 h-3.5" />}
                          {staffCheckedIn ? "Out" : "In"}
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Your Performance</h2>
                        <div className="flex items-center bg-secondary rounded-full p-0.5">
                          {(["day", "week", "month"] as const).map((period) => (
                            <button
                              key={period}
                              onClick={() => setStaffStatsView(period)}
                              className={`px-2 py-0.5 rounded-full text-[9px] font-medium transition-all capitalize ${
                                staffStatsView === period
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {period}
                            </button>
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground mb-3">
                        {staffStatsView === "day" ? "February 3, 2026" : 
                         staffStatsView === "week" ? "This Week - February 2026" : 
                         "February 2026"}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-xl font-bold text-foreground">{currentStats.sessions}</p>
                          <p className="text-[9px] text-muted-foreground">Sessions</p>
                        </div>
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-xl font-bold text-yellow-500">{currentStats.rating}</p>
                          <p className="text-[9px] text-muted-foreground">Avg Rating</p>
                        </div>
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-xl font-bold text-foreground">{currentStats.clients}</p>
                          <p className="text-[9px] text-muted-foreground">Active Clients</p>
                        </div>
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-xl font-bold text-green-500">{currentStats.attendance}%</p>
                          <p className="text-[9px] text-muted-foreground">Attendance</p>
                        </div>
                      </div>
                    </div>

                    {/* Your Attendance Calendar */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Your Attendance - Feb 2026</h2>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-[8px] text-muted-foreground">In</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            <span className="text-[8px] text-muted-foreground">Out</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
                        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                          <span key={i} className="text-[7px] text-muted-foreground font-medium">{d}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-0.5">
                        {Array.from({ length: 28 }, (_, i) => {
                          const day = i + 1
                          const attendance = staffAttendanceData[day]
                          const isPresent = attendance?.present
                          const isToday = day === 3
                          return (
                            <div 
                              key={day}
                              className={`aspect-square rounded flex items-center justify-center text-[8px] ${
                                isToday 
                                  ? "bg-primary text-primary-foreground font-bold"
                                  : attendance 
                                    ? isPresent 
                                      ? "bg-green-500/20 text-green-500" 
                                      : "bg-red-500/20 text-red-500"
                                    : day <= 3 ? "bg-secondary text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              {day}
                            </div>
                          )
                        })}
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border/30">
                        <div className="text-center">
                          <p className="text-sm font-bold text-green-500">
                            {Object.values(staffAttendanceData).filter(a => a.present).length}
                          </p>
                          <p className="text-[8px] text-muted-foreground">Days Present</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-red-500">
                            {Object.values(staffAttendanceData).filter(a => !a.present).length}
                          </p>
                          <p className="text-[8px] text-muted-foreground">Days Absent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-foreground">96%</p>
                          <p className="text-[8px] text-muted-foreground">Attendance</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Recent Reviews</h2>
                      <div className="space-y-2">
                        {[
                          { client: "Alex Cruz", rating: 5, comment: "Great session!", date: "Today" },
                          { client: "Maria Santos", rating: 5, comment: "Best trainer!", date: "Yesterday" },
                        ].map((review, i) => (
                          <div key={i} className="p-2.5 bg-secondary rounded-xl">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-xs font-semibold text-foreground">{review.client}</p>
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: review.rating }).map((_, j) => (
                                  <Star key={j} className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                                ))}
                              </div>
                            </div>
                            <p className="text-[10px] text-muted-foreground">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "more" && (
                  <div className="space-y-2">
                    {staffMoreItems.map((item, i) => {
                      const Icon = item.icon
                      const handleClick = () => {
                        if (item.id === "sessionHistory") setShowSessionHistory(true)
                        else if (item.id === "monthlyReport") setShowMonthlyReport(true)
                        else if (item.id === "timeOff") setShowTimeOff(true)
                        else if (item.id === "help") setShowHelp(true)
                        else if (item.id === "preferences") setShowPreferences(true)
                        else if (item.id === "about") setShowAbout(true)
                      }
                      return (
                        <button key={i} onClick={handleClick} className="w-full flex items-center justify-between p-3 bg-[#141414] rounded-xl border border-border/30 touch-active card-press">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className="text-left">
                              <p className="text-xs font-semibold text-foreground">{item.label}</p>
                              <p className="text-[10px] text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Leads View - Mobile */}
          {activeRole === "Leads" && (
            <div className="animate-slide-in">
              <Header 
                onOpenChat={() => setShowChat(true)} 
                onOpenNotifications={() => setShowNotifications(true)}
                activeRole={activeRole}
                onRoleChange={handleRoleChange}
              />
              <div className="px-4 space-y-4 pb-4">
                {activeTab === "dashboard" && (
                  <>
                    {/* Pipeline Overview */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Pipeline</h2>
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-[10px] rounded-full font-medium">{leadsPipelineStats.conversionRate}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        <button onClick={() => { setLeadStatusFilter("hot"); setActiveTab("leads") }} className="bg-red-500/10 rounded-lg p-2 text-center border border-red-500/20 touch-active">
                          <p className="text-lg font-bold text-red-500">{leadsPipelineStats.hot}</p>
                          <p className="text-[7px] text-red-400">Hot</p>
                        </button>
                        <button onClick={() => { setLeadStatusFilter("warm"); setActiveTab("leads") }} className="bg-yellow-500/10 rounded-lg p-2 text-center border border-yellow-500/20 touch-active">
                          <p className="text-lg font-bold text-yellow-500">{leadsPipelineStats.warm}</p>
                          <p className="text-[7px] text-yellow-400">Warm</p>
                        </button>
                        <button onClick={() => { setLeadStatusFilter("cold"); setActiveTab("leads") }} className="bg-blue-500/10 rounded-lg p-2 text-center border border-blue-500/20 touch-active">
                          <p className="text-lg font-bold text-blue-500">{leadsPipelineStats.cold}</p>
                          <p className="text-[7px] text-blue-400">Cold</p>
                        </button>
                        <button onClick={() => { setLeadStatusFilter("converted"); setActiveTab("leads") }} className="bg-green-500/10 rounded-lg p-2 text-center border border-green-500/20 touch-active">
                          <p className="text-lg font-bold text-green-500">{leadsPipelineStats.converted}</p>
                          <p className="text-[7px] text-green-400">Won</p>
                        </button>
                      </div>
                    </div>

                    {/* Lead Sources */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Lead Sources</h2>
                      <div className="space-y-2">
                        {[
                          { source: "Referral", count: 4, color: "bg-green-500" },
                          { source: "Social Media", count: 3, color: "bg-blue-500" },
                          { source: "Walk-in", count: 3, color: "bg-yellow-500" },
                          { source: "Website", count: 2, color: "bg-primary" },
                        ].map((item) => (
                          <div key={item.source} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${item.color}`} />
                            <span className="text-[11px] text-foreground flex-1">{item.source}</span>
                            <span className="text-[11px] font-bold text-foreground">{item.count}</span>
                            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div className={`h-full ${item.color}`} style={{ width: `${(item.count / 12) * 100}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Today's Follow-ups */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Today's Follow-ups</h2>
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full font-medium">
                          {leadsData.filter(l => l.nextFollowUp.includes("Feb 4") || l.nextFollowUp === "Today").length} due
                        </span>
                      </div>
                      <div className="space-y-2">
                        {leadsData.filter(l => l.status === "hot").slice(0, 3).map((lead) => (
                          <div key={lead.id} className="flex items-center justify-between p-2.5 bg-secondary rounded-xl">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                lead.status === "hot" ? "bg-red-500" : "bg-yellow-500"
                              }`} />
                              <div>
                                <p className="text-xs font-semibold text-foreground">{lead.name}</p>
                                <p className="text-[9px] text-muted-foreground">{lead.interest}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button className="p-1.5 bg-green-500/20 rounded-lg touch-active">
                                <Phone className="w-3 h-3 text-green-500" />
                              </button>
                              <button className="p-1.5 bg-primary/20 rounded-lg touch-active">
                                <Mail className="w-3 h-3 text-primary" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">This Month</h2>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-secondary rounded-lg p-2.5 text-center">
                          <p className="text-lg font-bold text-foreground">12</p>
                          <p className="text-[8px] text-muted-foreground">New Leads</p>
                        </div>
                        <div className="bg-secondary rounded-lg p-2.5 text-center">
                          <p className="text-lg font-bold text-green-500">3</p>
                          <p className="text-[8px] text-muted-foreground">Converted</p>
                        </div>
                        <div className="bg-secondary rounded-lg p-2.5 text-center">
                          <p className="text-lg font-bold text-primary">25%</p>
                          <p className="text-[8px] text-muted-foreground">Rate</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setShowAddLead(true)} className="bg-primary text-primary-foreground rounded-xl p-3 text-left touch-active card-press">
                          <Plus className="w-5 h-5 mb-2" />
                          <p className="text-xs font-semibold">Add Lead</p>
                          <p className="text-[9px] opacity-80">New prospect</p>
                        </button>
                        <button onClick={() => setActiveTab("leads")} className="bg-secondary rounded-xl p-3 text-left touch-active card-press">
                          <Users className="w-5 h-5 text-green-500 mb-2" />
                          <p className="text-xs font-semibold text-foreground">All Leads</p>
                          <p className="text-[9px] text-muted-foreground">{leadsData.length} total</p>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "leads" && (
                  <div className="space-y-4">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-4 gap-2">
                      <button onClick={() => setLeadStatusFilter("All")} className={`bg-[#141414] rounded-xl p-2.5 text-center border ${leadStatusFilter === "All" ? "border-primary" : "border-border/30"}`}>
                        <p className="text-lg font-bold text-foreground">{leadsData.length}</p>
                        <p className="text-[7px] text-muted-foreground">Total</p>
                      </button>
                      <button onClick={() => setLeadStatusFilter("hot")} className={`bg-[#141414] rounded-xl p-2.5 text-center border ${leadStatusFilter === "hot" ? "border-red-500" : "border-red-500/30"}`}>
                        <p className="text-lg font-bold text-red-500">{leadsData.filter(l => l.status === "hot").length}</p>
                        <p className="text-[7px] text-muted-foreground">Hot</p>
                      </button>
                      <button onClick={() => setLeadStatusFilter("warm")} className={`bg-[#141414] rounded-xl p-2.5 text-center border ${leadStatusFilter === "warm" ? "border-yellow-500" : "border-yellow-500/30"}`}>
                        <p className="text-lg font-bold text-yellow-500">{leadsData.filter(l => l.status === "warm").length}</p>
                        <p className="text-[7px] text-muted-foreground">Warm</p>
                      </button>
                      <button onClick={() => setLeadStatusFilter("converted")} className={`bg-[#141414] rounded-xl p-2.5 text-center border ${leadStatusFilter === "converted" ? "border-green-500" : "border-green-500/30"}`}>
                        <p className="text-lg font-bold text-green-500">{leadsData.filter(l => l.status === "converted").length}</p>
                        <p className="text-[7px] text-muted-foreground">Won</p>
                      </button>
                    </div>

                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">All Leads</h2>
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 bg-secondary rounded-lg touch-active">
                            <Search className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                          <button onClick={() => setShowAddLead(true)} className="px-2 py-1 bg-primary text-primary-foreground text-[9px] rounded-lg font-medium">
                            <Plus className="w-3 h-3 inline mr-0.5" />Add
                          </button>
                        </div>
                      </div>
                      {/* Source Filter */}
                      <div className="flex gap-1 mb-2 overflow-x-auto touch-pan-x pb-1 hide-scrollbar">
                        {["All", "Referral", "Walk-in", "Social Media", "Website", "Event"].map((source) => (
                          <button
                            key={source}
                            onClick={() => setLeadSourceFilter(source)}
                            className={`px-2 py-0.5 rounded-full text-[8px] font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                              leadSourceFilter === source
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {source}
                          </button>
                        ))}
                      </div>
                      {/* Status Filter */}
                      <div className="flex gap-1 mb-3 overflow-x-auto touch-pan-x pb-1 hide-scrollbar">
                        {["All", "hot", "warm", "cold", "converted", "lost"].map((status) => (
                          <button
                            key={status}
                            onClick={() => setLeadStatusFilter(status)}
                            className={`px-2 py-0.5 rounded-full text-[8px] font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                              leadStatusFilter === status
                                ? status === "hot" ? "bg-red-500 text-white" :
                                  status === "warm" ? "bg-yellow-500 text-white" :
                                  status === "cold" ? "bg-blue-500 text-white" :
                                  status === "converted" ? "bg-green-500 text-white" :
                                  status === "lost" ? "bg-muted-foreground text-white" :
                                  "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {status === "All" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-2 max-h-[50vh] overflow-y-auto hide-scrollbar">
                        {leadsData
                          .filter(lead => {
                            if (leadSourceFilter !== "All" && lead.source !== leadSourceFilter) return false
                            if (leadStatusFilter !== "All" && lead.status !== leadStatusFilter) return false
                            return true
                          })
                          .map((lead) => (
                          <button key={lead.id} className="w-full flex items-center justify-between p-2.5 bg-secondary rounded-xl touch-active card-press text-left">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-2.5 h-2.5 rounded-full ${
                                lead.status === "hot" ? "bg-red-500" :
                                lead.status === "warm" ? "bg-yellow-500" :
                                lead.status === "cold" ? "bg-blue-500" :
                                lead.status === "converted" ? "bg-green-500" : "bg-muted-foreground"
                              }`} />
                              <div>
                                <p className="text-xs font-semibold text-foreground">{lead.name}</p>
                                <p className="text-[9px] text-muted-foreground">{lead.interest}</p>
                                <p className="text-[8px] text-muted-foreground">{lead.notes}</p>
                              </div>
                            </div>
                            <div className="text-right flex flex-col gap-1">
                              <span className="text-[8px] px-1.5 py-0.5 bg-secondary border border-border/30 rounded-full">{lead.source}</span>
                              <p className="text-[8px] text-primary">{lead.nextFollowUp}</p>
                              <div className="flex items-center gap-1 justify-end">
                                <Phone className="w-3 h-3 text-green-500" />
                                <Mail className="w-3 h-3 text-primary" />
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "followups" && (
                  <div className="space-y-4">
                    <div className="bg-[#141414] rounded-xl p-4 border border-red-500/30">
                      <h2 className="text-sm font-semibold text-red-500 mb-3">Overdue</h2>
                      <div className="space-y-2">
                        {leadsData.filter(l => l.nextFollowUp === "Feb 3, 2026").map((lead) => (
                          <div key={lead.id} className="flex items-center justify-between p-2 bg-red-500/10 rounded-lg">
                            <div>
                              <p className="text-xs font-semibold text-foreground">{lead.name}</p>
                              <p className="text-[8px] text-red-400">Due: {lead.nextFollowUp}</p>
                            </div>
                            <button className="px-2 py-1 bg-red-500 text-white text-[9px] rounded-lg font-medium">
                              Call Now
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Today</h2>
                      <div className="space-y-2">
                        {leadsData.filter(l => l.nextFollowUp === "Feb 4, 2026").map((lead) => (
                          <div key={lead.id} className="flex items-center justify-between p-2.5 bg-secondary rounded-xl">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                lead.status === "hot" ? "bg-red-500" : "bg-yellow-500"
                              }`} />
                              <div>
                                <p className="text-xs font-semibold text-foreground">{lead.name}</p>
                                <p className="text-[9px] text-muted-foreground">{lead.notes}</p>
                              </div>
                            </div>
                            <button className="px-2 py-1 bg-primary text-primary-foreground text-[9px] rounded-lg font-medium">
                              Done
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "pipeline" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#141414] rounded-xl p-3 border border-red-500/30">
                        <h3 className="text-[10px] font-semibold text-red-500 mb-2">Hot ({leadsPipelineStats.hot})</h3>
                        <div className="space-y-1.5">
                          {leadsData.filter(l => l.status === "hot").map((lead) => (
                            <div key={lead.id} className="p-1.5 bg-secondary rounded text-[9px] text-foreground">
                              {lead.name}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-[#141414] rounded-xl p-3 border border-yellow-500/30">
                        <h3 className="text-[10px] font-semibold text-yellow-500 mb-2">Warm ({leadsPipelineStats.warm})</h3>
                        <div className="space-y-1.5">
                          {leadsData.filter(l => l.status === "warm").map((lead) => (
                            <div key={lead.id} className="p-1.5 bg-secondary rounded text-[9px] text-foreground">
                              {lead.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Stats</h2>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-secondary rounded-lg p-2 text-center">
                          <p className="text-sm font-bold text-green-500">{leadsPipelineStats.conversionRate}</p>
                          <p className="text-[8px] text-muted-foreground">Conversion</p>
                        </div>
                        <div className="bg-secondary rounded-lg p-2 text-center">
                          <p className="text-sm font-bold text-foreground">{leadsPipelineStats.avgTimeToConvert}</p>
                          <p className="text-[8px] text-muted-foreground">Avg Time</p>
                        </div>
                        <div className="bg-secondary rounded-lg p-2 text-center">
                          <p className="text-sm font-bold text-foreground">{leadsPipelineStats.total}</p>
                          <p className="text-[8px] text-muted-foreground">Total</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "more" && (
                  <div className="space-y-2">
                    {[
                      { icon: FileText, label: "Lead Reports", description: "View conversion reports" },
                      { icon: Target, label: "Goals & Targets", description: "Set recruitment goals" },
                      { icon: Bell, label: "Notifications", description: "Configure alerts" },
                      { icon: HelpCircle, label: "Help & Support", description: "Get assistance" },
                    ].map((item, i) => {
                      const Icon = item.icon
                      return (
                        <button key={i} className="w-full flex items-center justify-between p-3 bg-[#141414] rounded-xl border border-border/30 touch-active card-press">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className="text-left">
                              <p className="text-xs font-semibold text-foreground">{item.label}</p>
                              <p className="text-[10px] text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Admin View - Mobile */}
          {activeRole === "Admin" && (
            <div className="animate-slide-in">
              <Header 
                onOpenChat={() => setShowChat(true)} 
                onOpenNotifications={() => setShowNotifications(true)}
                activeRole={activeRole}
                onRoleChange={handleRoleChange}
              />
              <div className="px-4 space-y-4 pb-4">
                {activeTab === "dashboard" && (
                  <>
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Overview</h2>
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-[10px] rounded-full font-medium">All systems OK</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-[9px] text-muted-foreground">Active Members</p>
                          <p className="text-lg font-bold text-foreground">128</p>
                        </div>
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-[9px] text-muted-foreground">Revenue Today</p>
                          <p className="text-lg font-bold text-foreground">â‚±26k</p>
                        </div>
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-[9px] text-muted-foreground">Sessions Today</p>
                          <p className="text-lg font-bold text-foreground">14</p>
                        </div>
                        <div className="bg-secondary rounded-xl p-3 text-center">
                          <p className="text-[9px] text-muted-foreground">Active Staff</p>
                          <p className="text-lg font-bold text-foreground">8</p>
                        </div>
                      </div>
                    </div>

                    {/* Branch Tracking Mobile */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Branches</h2>
                      <div className="space-y-2">
                        {branchData.map((branch) => (
                          <button 
                            key={branch.id} 
                            onClick={() => setSelectedBranch(branch)}
                            className="w-full p-2.5 bg-secondary rounded-xl touch-active card-press text-left"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5 text-primary" />
                                <p className="text-xs font-semibold text-foreground">{branch.name}</p>
                              </div>
                              <span className="px-1.5 py-0.5 bg-green-500/20 text-green-500 text-[8px] rounded-full">Active</span>
                            </div>
                            <div className="grid grid-cols-4 gap-1 text-center">
                              <div>
                                <p className="text-[10px] font-bold text-foreground">{branch.members}</p>
                                <p className="text-[7px] text-muted-foreground">Members</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-foreground">{branch.revenue}</p>
                                <p className="text-[7px] text-muted-foreground">Revenue</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-foreground">{branch.sessionsToday}</p>
                                <p className="text-[7px] text-muted-foreground">Sessions</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-foreground">{branch.staff}</p>
                                <p className="text-[7px] text-muted-foreground">Staff</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setShowPackages(true)} className="bg-primary text-primary-foreground rounded-xl p-3 text-left touch-active card-press">
                          <Package className="w-5 h-5 mb-2" />
                          <p className="text-xs font-semibold">Packages</p>
                          <p className="text-[9px] opacity-80">Manage plans</p>
                        </button>
                        <button onClick={() => setShowReports(true)} className="bg-secondary rounded-xl p-3 text-left touch-active card-press">
                          <FileText className="w-5 h-5 text-green-500 mb-2" />
                          <p className="text-xs font-semibold text-foreground">Reports</p>
                          <p className="text-[9px] text-muted-foreground">Generate</p>
                        </button>
                        <button onClick={() => setShowAnnouncements(true)} className="bg-secondary rounded-xl p-3 text-left touch-active card-press">
                          <Bell className="w-5 h-5 text-blue-500 mb-2" />
                          <p className="text-xs font-semibold text-foreground">Announce</p>
                          <p className="text-[9px] text-muted-foreground">Send alerts</p>
                        </button>
                        <button onClick={() => setShowAnalytics(true)} className="bg-secondary rounded-xl p-3 text-left touch-active card-press">
                          <BarChart3 className="w-5 h-5 text-yellow-500 mb-2" />
                          <p className="text-xs font-semibold text-foreground">Analytics</p>
                          <p className="text-[9px] text-muted-foreground">Insights</p>
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {activeTab === "members" && (
                  <div className="space-y-4">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-4 gap-2">
                      <div className="bg-[#141414] rounded-xl p-2.5 text-center border border-border/30">
                        <p className="text-lg font-bold text-foreground">{clientsData.length}</p>
                        <p className="text-[7px] text-muted-foreground">Total</p>
                      </div>
                      <div className="bg-[#141414] rounded-xl p-2.5 text-center border border-green-500/30">
                        <p className="text-lg font-bold text-green-500">{clientsData.filter(c => c.status === "paid").length}</p>
                        <p className="text-[7px] text-muted-foreground">Active</p>
                      </div>
                      <div className="bg-[#141414] rounded-xl p-2.5 text-center border border-yellow-500/30">
                        <p className="text-lg font-bold text-yellow-500">{clientsData.filter(c => c.status === "expiring").length}</p>
                        <p className="text-[7px] text-muted-foreground">Expiring</p>
                      </div>
                      <div className="bg-[#141414] rounded-xl p-2.5 text-center border border-red-500/30">
                        <p className="text-lg font-bold text-red-500">{clientsData.filter(c => c.status === "unpaid").length}</p>
                        <p className="text-[7px] text-muted-foreground">Expired</p>
                      </div>
                    </div>
                    
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">All Members</h2>
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 bg-secondary rounded-lg touch-active">
                            <Search className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                          <button className="px-2 py-1 bg-primary text-primary-foreground text-[9px] rounded-lg font-medium touch-active">
                            <Plus className="w-3 h-3 inline mr-0.5" />Add
                          </button>
                        </div>
                      </div>
                      {/* Branch Filter Toggle */}
                      <div className="flex gap-1 mb-2 overflow-x-auto touch-pan-x pb-1 hide-scrollbar">
                        {["All", "Malingap", "E.Rod", "Cainta"].map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setBranchFilter(filter)}
                            className={`px-2 py-0.5 rounded-full text-[8px] font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                              branchFilter === filter
                                ? "bg-blue-500 text-white"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                      {/* Package Filter Toggle */}
                      <div className="flex gap-1 mb-3 overflow-x-auto touch-pan-x pb-1 hide-scrollbar">
                        {["All", "Full 48", "Staggered 48", "Staggered 24", "Pilates", "PT"].map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setAdminMemberFilter(filter)}
                            className={`px-2 py-0.5 rounded-full text-[8px] font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                              adminMemberFilter === filter
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-2 max-h-[50vh] overflow-y-auto hide-scrollbar">
                        {clientsData
                          .filter(c => {
                            if (adminMemberFilter === "All") return true
                            if (adminMemberFilter === "Full 48") return c.packageType === "full48"
                            if (adminMemberFilter === "Staggered 48") return c.packageType === "staggered48"
                            if (adminMemberFilter === "Staggered 24") return c.packageType === "staggered24"
                            if (adminMemberFilter === "Pilates") return c.packageType === "pilates"
                            if (adminMemberFilter === "PT") return c.packageType === "pt"
                            return true
                          })
                          .map((member) => (
                          <button key={member.id} onClick={() => setShowMemberDetail(membersData.find(m => m.name === member.name) || membersData[0])} className="w-full flex items-center justify-between p-2.5 bg-secondary rounded-xl touch-active card-press">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                <span className="text-[10px] font-bold text-primary">{member.avatar}</span>
                              </div>
                              <div className="text-left">
                                <p className="text-xs font-semibold text-foreground">{member.name}</p>
                                <p className="text-[9px] text-muted-foreground">{member.package}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[8px] text-muted-foreground">{member.sessionsLeft}/{member.totalSessions}</span>
                              <span className={`px-1.5 py-0.5 text-[8px] font-medium rounded-full ${
                                member.status === "paid" ? "bg-green-500/20 text-green-500" :
                                member.status === "expiring" ? "bg-yellow-500/20 text-yellow-500" :
                                "bg-red-500/20 text-red-500"
                              }`}>
                                {member.status === "paid" ? "Active" : member.status === "expiring" ? "Expiring" : "Expired"}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "payments" && (
                  <>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-[#141414] rounded-xl p-2.5 border border-border/30">
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="text-xs font-bold text-primary">â‚±</span>
                          <p className="text-[8px] text-muted-foreground">Today</p>
                        </div>
                        <p className="text-lg font-bold text-foreground">â‚±26.5k</p>
                        <p className="text-[8px] text-green-500">+8%</p>
                      </div>
                      <div className="bg-[#141414] rounded-xl p-2.5 border border-border/30">
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="text-xs font-bold text-primary">â‚±</span>
                          <p className="text-[8px] text-muted-foreground">Month</p>
                        </div>
                        <p className="text-lg font-bold text-foreground">â‚±485k</p>
                        <p className="text-[8px] text-green-500">+12%</p>
                      </div>
                      <div className="bg-[#141414] rounded-xl p-2.5 border border-border/30">
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="text-xs font-bold text-yellow-500">â‚±</span>
                          <p className="text-[8px] text-muted-foreground">Pending</p>
                        </div>
                        <p className="text-lg font-bold text-yellow-500">â‚±52.1k</p>
                        <p className="text-[8px] text-muted-foreground">12 pending</p>
                      </div>
                    </div>
                    {/* Payment Reminders with Filter */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-sm font-semibold text-foreground">Payment Reminders</h2>
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-500 text-[10px] rounded-full font-medium">
                          {clientsData.filter(c => c.status === "unpaid" || c.status === "expiring").length}
                        </span>
                      </div>
                      {/* Reminder Filter Toggle */}
                      <div className="flex gap-1 mb-3 overflow-x-auto pb-1 scrollbar-hide">
                        {["All", "Full 48", "Staggered", "Pilates", "PT"].map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setReminderFilter(filter)}
                            className={`px-2 py-0.5 rounded-full text-[8px] font-medium whitespace-nowrap transition-all ${
                              reminderFilter === filter
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-2 max-h-28 overflow-y-auto">
                        {clientsData
                          .filter(c => c.status === "unpaid" || c.status === "expiring")
                          .filter(c => {
                            if (reminderFilter === "All") return true
                            if (reminderFilter === "Staggered") return c.packageType.includes("staggered")
                            return c.packageType.toLowerCase().includes(reminderFilter.toLowerCase().replace(" ", ""))
                          })
                          .map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-2 bg-secondary rounded-xl">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center">
                                <span className="text-[9px] font-bold text-primary">{member.avatar}</span>
                              </div>
                              <div>
                                <p className="text-[11px] font-semibold text-foreground">{member.name}</p>
                                <p className="text-[8px] text-muted-foreground">{member.package}</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => alert(`Payment reminder sent to ${member.name}`)}
                              className="px-2 py-0.5 bg-primary text-primary-foreground text-[9px] rounded-lg font-medium touch-active"
                            >
                              Remind
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Recent Transactions with Filter */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-sm font-semibold text-foreground">Recent Transactions</h2>
                        <button className="text-[10px] text-primary font-medium">View All</button>
                      </div>
                      {/* Transaction Filter Toggle */}
                      <div className="flex gap-1 mb-3 overflow-x-auto pb-1 scrollbar-hide">
                        {["All", "Full Package", "PT Session", "Monthly"].map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setAdminPaymentFilter(filter)}
                            className={`px-2 py-0.5 rounded-full text-[8px] font-medium whitespace-nowrap transition-all ${
                              adminPaymentFilter === filter
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-2">
                        {adminTransactions
                          .filter(tx => {
                            if (adminPaymentFilter === "All") return true
                            return tx.type.toLowerCase().includes(adminPaymentFilter.toLowerCase())
                          })
                          .slice(0, 4)
                          .map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between p-2 bg-secondary rounded-xl">
                            <div className="flex items-center gap-2">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${tx.status === "completed" ? "bg-green-500/20" : "bg-yellow-500/20"}`}>
                                <span className={`text-[9px] font-bold ${tx.status === "completed" ? "text-green-500" : "text-yellow-500"}`}>{tx.avatar}</span>
                              </div>
                              <div>
                                <p className="text-[11px] font-semibold text-foreground">{tx.name}</p>
                                <p className="text-[8px] text-muted-foreground">{tx.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[11px] font-bold text-foreground">{tx.amount.replace("P", "â‚±")}</p>
                              <p className="text-[7px] text-muted-foreground">{tx.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {activeTab === "staff" && (
                  <div className="space-y-4">
                    {/* Staff List */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-foreground">Staff Management</h2>
                        <div className="flex items-center bg-secondary rounded-full p-0.5">
                          {(["day", "week", "month"] as const).map((period) => (
                            <button key={period} onClick={() => setStaffTimeView(period)} className={`px-2 py-0.5 rounded-full text-[9px] font-medium transition-all capitalize ${staffTimeView === period ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                              {period}
                            </button>
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground mb-3">
                        {staffTimeView === "day" ? "February 3, 2026" : staffTimeView === "week" ? "This Week" : "February 2026"}
                      </p>
                      <div className="space-y-2">
                        {staffData.map((staff) => (
                          <button key={staff.id} onClick={() => setShowStaffDetail(staff)} className="w-full flex items-center justify-between p-2.5 bg-secondary rounded-xl touch-active card-press">
                            <div className="flex items-center gap-2.5">
                              <div className="relative">
                                <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center">
                                  <span className="text-[10px] font-bold text-primary">{staff.avatar}</span>
                                </div>
                                <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-secondary ${staff.status === "online" ? "bg-green-500" : "bg-muted-foreground"}`} />
                              </div>
                              <p className="text-xs font-semibold text-foreground">{staff.name}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-center">
                                <p className="text-xs font-bold text-foreground">{staff.stats[staffTimeView].sessions}</p>
                                <p className="text-[8px] text-muted-foreground">Sessions</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-bold text-yellow-500">{staff.rating}</p>
                                <p className="text-[8px] text-muted-foreground">Rating</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Staff Attendance Calendar */}
                    <div className="bg-[#141414] rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-semibold text-foreground">Attendance - {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][attendanceMonth]} 2026</h2>
                          <div className="flex items-center">
                            <button onClick={() => setAttendanceMonth(Math.max(0, attendanceMonth - 1))} className="p-0.5">
                              <ChevronLeft className="w-3 h-3 text-muted-foreground" />
                            </button>
                            <button onClick={() => setAttendanceMonth(Math.min(11, attendanceMonth + 1))} className="p-0.5">
                              <ChevronRight className="w-3 h-3 text-muted-foreground" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-[7px] text-muted-foreground">Present</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            <span className="text-[7px] text-muted-foreground">Absent</span>
                          </div>
                        </div>
                      </div>
                      {/* Branch Toggle - Slidable */}
                      <div className="flex gap-1 mb-2 overflow-x-auto touch-pan-x pb-1 hide-scrollbar">
                        {["All", "Malingap", "E.Rod", "Cainta"].map((branch) => (
                          <button
                            key={branch}
                            onClick={() => setBranchFilter(branch)}
                            className={`px-2 py-0.5 rounded-full text-[7px] font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                              branchFilter === branch
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {branch}
                          </button>
                        ))}
                      </div>
                      {/* Coach Filter - Slidable */}
                      <div className="flex gap-1 mb-2 overflow-x-auto touch-pan-x pb-1 hide-scrollbar">
                        {["All", "Joaquin", "Maria", "Carlos", "Ana"].map((coach) => (
                          <button
                            key={coach}
                            onClick={() => setAttendanceCoachFilter(coach === "All" ? "All" : `Coach ${coach}`)}
                            className={`px-2 py-0.5 rounded-full text-[7px] font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                              attendanceCoachFilter === (coach === "All" ? "All" : `Coach ${coach}`)
                                ? "bg-green-500/20 text-green-500 border border-green-500/30"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {coach}
                          </button>
                        ))}
                      </div>
                      {/* Mini Calendar Grid */}
                      <div className="grid grid-cols-7 gap-0.5 text-center mb-2">
                        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                          <div key={i} className="text-[7px] text-muted-foreground py-0.5">{day}</div>
                        ))}
                        {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
                          const hasAttendance = staffAttendanceData[day]
                          const isPresent = hasAttendance?.present
                          return (
                            <div 
                              key={day}
                              className={`aspect-square flex items-center justify-center text-[8px] rounded ${
                                hasAttendance 
                                  ? isPresent 
                                    ? "bg-green-500/20 text-green-500" 
                                    : "bg-red-500/20 text-red-500"
                                  : day <= 3 ? "bg-secondary text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              {day}
                            </div>
                          )
                        })}
                      </div>
                      {/* Summary Statistics */}
                      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border/30">
                        <div className="text-center">
                          <p className="text-base font-bold text-green-500">{staffData.filter(s => s.status === "online").length}</p>
                          <p className="text-[7px] text-muted-foreground">Present Today</p>
                        </div>
                        <div className="text-center">
                          <p className="text-base font-bold text-red-500">{staffData.filter(s => s.status === "offline").length}</p>
                          <p className="text-[7px] text-muted-foreground">Absent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-base font-bold text-foreground">{staffData.length}</p>
                          <p className="text-[7px] text-muted-foreground">Total Staff</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "settings" && (
                  <div className="space-y-2">
                    {[
                      { icon: Bell, label: "Notification Settings", description: "Configure alerts", action: () => setShowNotificationSettings(true) },
                      { icon: Lock, label: "Access Control", description: "Manage permissions", action: () => setShowAccessControl(true) },
                      { icon: Smartphone, label: "App Settings", description: "General configuration", action: () => setShowAppSettings(true) },
                      { icon: Info, label: "About BearFit", description: "Version 2.0.1", action: () => setShowAboutBearFit(true) },
                    ].map((item, i) => {
                      const Icon = item.icon
                      return (
                        <button key={i} onClick={item.action} className="w-full flex items-center justify-between p-3 bg-[#141414] rounded-xl border border-border/30 touch-active card-press">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className="text-left">
                              <p className="text-xs font-semibold text-foreground">{item.label}</p>
                              <p className="text-[10px] text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        {/* Bottom Navigation - Mobile */}
        <nav className="fixed bottom-0 left-0 right-0 bg-[#0d0d0d] border-t border-border/50 safe-area-bottom z-40">
          <div className="flex justify-around items-center py-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              const isPesoIcon = activeRole === "Admin" && item.id === "payments"
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all touch-active ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {isPesoIcon ? (
                    <span className="w-5 h-5 flex items-center justify-center text-lg font-bold">â‚±</span>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Draggable Chat Button */}
      <DraggableChatButton onClick={() => setShowChat(true)} />

      {/* All Modals remain the same - Chat, Notifications, Scan QR, Create Session, Client Detail, etc. */}
      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up h-[70vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">CJ</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Coach Joaquin</p>
                  <p className="text-[10px] text-green-500">Online</p>
                </div>
              </div>
              <button onClick={() => setShowChat(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
                    msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}>
                    <p className="text-xs leading-relaxed">{msg.message}</p>
                    <p className={`text-[9px] mt-1 ${msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border/50 bg-[#0d0d0d]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="p-2.5 bg-primary rounded-xl touch-active">
                  <Send className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[70vh]">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <h3 className="text-base font-semibold text-foreground">Notifications</h3>
              <button onClick={() => setShowNotifications(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="overflow-y-auto p-4 space-y-2">
              {notifications.map((notif) => (
                <div key={notif.id} className={`p-3 rounded-xl ${notif.unread ? "bg-primary/10 border border-primary/20" : "bg-secondary"}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-foreground">{notif.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{notif.message}</p>
                    </div>
                    {notif.unread && <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1" />}
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-2">{notif.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scan QR Modal */}
      {showScanQR && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <h3 className="text-base font-semibold text-foreground">Scan Member QR</h3>
              <button onClick={() => setShowScanQR(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4">
              <div className="aspect-square bg-black rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-4 border-2 border-primary/50 rounded-xl" />
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-lg" />
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-0.5 bg-primary animate-pulse" />
                </div>
                <QrCode className="w-16 h-16 text-muted-foreground/20" />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Point camera at member QR code
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Create Session Modal */}
      {showCreateSession && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Create Session</h3>
              <button onClick={() => setShowCreateSession(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Select Client</label>
                <select
                  value={sessionForm.client}
                  onChange={(e) => setSessionForm({ ...sessionForm, client: e.target.value })}
                  className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none"
                >
                  <option value="">Select client...</option>
                  {clientsData.map(client => (
                    <option key={client.id} value={client.name}>{client.name} - {client.package}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Date</label>
                  <input
                    type="date"
                    value={sessionForm.date}
                    onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })}
                    className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Time</label>
                  <input
                    type="time"
                    value={sessionForm.time}
                    onChange={(e) => setSessionForm({ ...sessionForm, time: e.target.value })}
                    className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Session Type</label>
                <select
                  value={sessionForm.type}
                  onChange={(e) => setSessionForm({ ...sessionForm, type: e.target.value })}
                  className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none"
                >
                  <option value="">Select type...</option>
                  <option value="Personal Training">Personal Training</option>
                  <option value="Weights Session">Weights Session</option>
                  <option value="Cardio Blast">Cardio Blast</option>
                  <option value="HIIT Session">HIIT Session</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Pilates">Pilates</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Duration (minutes)</label>
                <select
                  value={sessionForm.duration}
                  onChange={(e) => setSessionForm({ ...sessionForm, duration: e.target.value })}
                  className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none"
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Notes (optional)</label>
                <textarea
                  value={sessionForm.notes}
                  onChange={(e) => setSessionForm({ ...sessionForm, notes: e.target.value })}
                  placeholder="Add any notes..."
                  className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none min-h-[70px] resize-none"
                />
              </div>
              <button
                onClick={handleCreateSession}
                disabled={!sessionForm.client || !sessionForm.date || !sessionForm.time || !sessionForm.type}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold touch-active disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Client Detail Modal */}
      {showClientDetail && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <button onClick={() => setShowClientDetail(null)} className="p-1.5 rounded-full bg-secondary touch-active">
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <h3 className="text-base font-semibold text-foreground">Client Details</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{showClientDetail.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-foreground">{showClientDetail.name}</p>
                  <p className="text-xs text-muted-foreground">{showClientDetail.package}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(showClientDetail.sessionsLeft / showClientDetail.totalSessions) * 100}%` }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{showClientDetail.sessionsLeft}/{showClientDetail.totalSessions}</span>
                  </div>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-xs text-foreground">{showClientDetail.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-xs text-foreground">{showClientDetail.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-xs text-foreground">Joined {showClientDetail.joinDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-xs text-foreground">Last visit: {showClientDetail.lastVisit}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-xs text-foreground">{showClientDetail.coach}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleMessageClient(showClientDetail)} className="flex-1 py-3 bg-secondary text-foreground rounded-xl font-semibold touch-active flex items-center justify-center gap-2 text-sm">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </button>
                <button className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold touch-active text-sm">
                  Book Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session Detail Modal (Staff) */}
      {showSessionDetail && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up">
            <div className="flex items-center gap-3 p-4 border-b border-border/50">
              <button onClick={() => setShowSessionDetail(null)} className="p-1.5 rounded-full bg-secondary touch-active">
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <h3 className="text-base font-semibold text-foreground">Session Details</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="text-center">
                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${
                  showSessionDetail.status === "done" ? "bg-green-500/20 text-green-500" :
                  showSessionDetail.status === "now" ? "bg-primary/20 text-primary" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {showSessionDetail.status === "done" ? "Completed" : showSessionDetail.status === "now" ? "In Progress" : "Upcoming"}
                </span>
                <h4 className="text-lg font-bold text-foreground">{showSessionDetail.session}</h4>
                <p className="text-sm text-muted-foreground mt-1">{showSessionDetail.client}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="text-xs font-semibold text-foreground">{showSessionDetail.time}</p>
                  <p className="text-[9px] text-muted-foreground">Time</p>
                </div>
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <MapPin className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="text-xs font-semibold text-foreground">Malingap</p>
                  <p className="text-[9px] text-muted-foreground">Branch</p>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Notes</p>
                <p className="text-sm text-foreground">{showSessionDetail.notes}</p>
              </div>
              <div className="flex gap-2">
                {showSessionDetail.phone && (
                  <button onClick={() => handleMessageClient(showSessionDetail)} className="flex-1 py-3 bg-secondary text-foreground rounded-xl font-semibold touch-active flex items-center justify-center gap-2 text-sm">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                )}
                {showSessionDetail.status !== "done" && (
                  <button className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold touch-active">
                    {showSessionDetail.status === "now" ? "End Session" : "Start Session"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Client Modal (Staff) */}
      {showMessageClient && selectedClientForMessage && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up h-[70vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{selectedClientForMessage.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{selectedClientForMessage.name}</p>
                  <p className="text-[10px] text-muted-foreground">{selectedClientForMessage.package}</p>
                </div>
              </div>
              <button onClick={() => { setShowMessageClient(false); setSelectedClientForMessage(null); }} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-3 border-b border-border/30">
              <p className="text-[9px] text-muted-foreground mb-2 uppercase tracking-wide">Quick Messages</p>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {["Session reminder!", "Great workout today!", "Don't forget tomorrow", "How are you feeling?"].map((msg, i) => (
                  <button key={i} onClick={() => setChatInput(msg)} className="px-3 py-1.5 bg-secondary rounded-full text-[10px] text-foreground whitespace-nowrap touch-active">
                    {msg}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="text-center py-8">
                <MessageCircle className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Start a conversation with {selectedClientForMessage.name.split(" ")[0]}</p>
              </div>
            </div>
            <div className="p-3 border-t border-border/50 bg-[#0d0d0d]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button onClick={() => { if (chatInput.trim()) { alert(`Message sent to ${selectedClientForMessage.name}: "${chatInput}"`); setChatInput(""); } }} className="p-2.5 bg-primary rounded-xl touch-active">
                  <Send className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Workout Log Modal */}
      {showWorkoutLog && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Workout Log</h3>
              <button onClick={() => setShowWorkoutLog(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Select Client</label>
                <select className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none">
                  <option value="">Select client...</option>
                  {clientsData.map(client => (
                    <option key={client.id} value={client.name}>{client.name}</option>
                  ))}
                </select>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <h4 className="text-xs font-semibold text-foreground mb-3">Exercises</h4>
                <div className="space-y-2.5">
                  {["Bench Press", "Squats", "Deadlift"].map((exercise, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 rounded border-border bg-[#0d0d0d] text-primary focus:ring-primary" />
                      <span className="text-xs text-foreground flex-1">{exercise}</span>
                      <input type="number" placeholder="Reps" className="w-14 bg-[#0d0d0d] rounded-lg px-2 py-1.5 text-[10px] text-foreground border border-border/30 text-center" />
                      <input type="number" placeholder="kg" className="w-14 bg-[#0d0d0d] rounded-lg px-2 py-1.5 text-[10px] text-foreground border border-border/30 text-center" />
                    </div>
                  ))}
                </div>
                <button className="mt-3 text-[10px] text-primary font-semibold flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add Exercise
                </button>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Notes</label>
                <textarea placeholder="Session notes..." className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none min-h-[70px] resize-none" />
              </div>
              <button onClick={() => { alert("Workout logged successfully!"); setShowWorkoutLog(false); }} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold touch-active">
                Save Workout Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Member Detail Modal (Admin) */}
      {showMemberDetail && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <button onClick={() => setShowMemberDetail(null)} className="p-1.5 rounded-full bg-secondary touch-active">
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <h3 className="text-base font-semibold text-foreground">Member Details</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{showMemberDetail.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-foreground">{showMemberDetail.name}</p>
                  <p className="text-xs text-muted-foreground">{showMemberDetail.package}</p>
                  <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    showMemberDetail.status === "active" ? "bg-green-500/20 text-green-500" : 
                    showMemberDetail.status === "expiring" ? "bg-yellow-500/20 text-yellow-500" :
                    "bg-red-500/20 text-red-500"
                  }`}>
                    {showMemberDetail.status === "active" ? "Active" : showMemberDetail.status === "expiring" ? "Expiring" : "Expired"}
                  </span>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-xs text-foreground">{showMemberDetail.phone}</span>
                  </div>
                  <button className="text-[10px] text-primary font-medium">Call</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-xs text-foreground">{showMemberDetail.email}</span>
                  </div>
                  <button className="text-[10px] text-primary font-medium">Email</button>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-semibold text-foreground mb-2">Payment Information</h4>
                <div className="flex justify-between">
                  <span className="text-[10px] text-muted-foreground">Total Paid</span>
                  <span className="text-xs font-medium text-foreground">{showMemberDetail.totalPaid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-muted-foreground">Last Payment</span>
                  <span className="text-xs font-medium text-foreground">{showMemberDetail.lastPayment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-muted-foreground">Next Due</span>
                  <span className={`text-xs font-medium ${showMemberDetail.paymentReminder ? "text-red-500" : "text-foreground"}`}>
                    {showMemberDetail.nextDue}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-muted-foreground">Sessions Left</span>
                  <span className="text-xs font-medium text-foreground">{showMemberDetail.sessionsLeft}</span>
                </div>
              </div>
              {showMemberDetail.paymentReminder && (
                <button onClick={() => { handleSendReminder(showMemberDetail); setShowMemberDetail(null); }} className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold touch-active">
                  Send Payment Reminder
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Staff Detail Modal (Admin) */}
      {showStaffDetail && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <button onClick={() => setShowStaffDetail(null)} className="p-1.5 rounded-full bg-secondary touch-active">
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <h3 className="text-base font-semibold text-foreground">Coach Details</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{showStaffDetail.avatar}</span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#141414] ${showStaffDetail.status === "online" ? "bg-green-500" : "bg-muted-foreground"}`} />
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground">{showStaffDetail.name}</p>
                  <p className="text-xs text-muted-foreground">{showStaffDetail.role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-medium text-yellow-500">{showStaffDetail.rating}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{showStaffDetail.clients}</p>
                  <p className="text-[9px] text-muted-foreground">Clients</p>
                </div>
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{showStaffDetail.stats.week.sessions}</p>
                  <p className="text-[9px] text-muted-foreground">This Week</p>
                </div>
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{showStaffDetail.stats.week.hours}h</p>
                  <p className="text-[9px] text-muted-foreground">Hours</p>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <h4 className="text-xs font-semibold text-foreground mb-3">Weekly Schedule</h4>
                <div className="space-y-1.5">
                  {showStaffDetail.schedule.map((day, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground w-8">{day.day}</span>
                      <span className="text-foreground">{day.hours}</span>
                      <span className="text-primary font-medium">{day.sessions} sessions</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-xs text-foreground">{showStaffDetail.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-xs text-foreground">{showStaffDetail.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Branch Detail Modal (Admin) */}
      {selectedBranch && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <button onClick={() => setSelectedBranch(null)} className="p-1.5 rounded-full bg-secondary touch-active">
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-foreground">{selectedBranch.name} Branch</h3>
                <p className="text-[10px] text-muted-foreground">{selectedBranch.address}</p>
              </div>
              <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-[9px] rounded-full font-medium">Active</span>
            </div>
            <div className="p-4 space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-foreground">{selectedBranch.members}</p>
                  <p className="text-[9px] text-muted-foreground">Active Members</p>
                </div>
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-primary">{selectedBranch.monthlyRevenue}</p>
                  <p className="text-[9px] text-muted-foreground">Monthly Revenue</p>
                </div>
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-foreground">{selectedBranch.staff}</p>
                  <p className="text-[9px] text-muted-foreground">Staff</p>
                </div>
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-green-500">{selectedBranch.monthlyGrowth}</p>
                  <p className="text-[9px] text-muted-foreground">Growth</p>
                </div>
              </div>

              {/* Today's Stats */}
              <div className="bg-secondary rounded-xl p-4">
                <h4 className="text-xs font-semibold text-foreground mb-3">Today's Activity</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-muted-foreground">Sessions</span>
                    <span className="text-sm font-bold text-foreground">{selectedBranch.sessionsToday}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-muted-foreground">Revenue Today</span>
                    <span className="text-sm font-bold text-foreground">{selectedBranch.revenue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-muted-foreground">Top Coach</span>
                    <span className="text-sm font-medium text-primary">{selectedBranch.topCoach}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-muted-foreground">Avg Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-yellow-500">{selectedBranch.avgRating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Overview */}
              <div className="bg-secondary rounded-xl p-4">
                <h4 className="text-xs font-semibold text-foreground mb-3">Package Overview</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-muted-foreground">Active Packages</span>
                    <span className="text-sm font-bold text-green-500">{selectedBranch.activePackages}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-muted-foreground">Expiring Soon</span>
                    <span className="text-sm font-bold text-yellow-500">{selectedBranch.expiringPackages}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-muted-foreground">Pending Payments</span>
                    <span className="text-sm font-bold text-red-500">{selectedBranch.pendingPayments}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-muted-foreground">New This Month</span>
                    <span className="text-sm font-bold text-foreground">{selectedBranch.newThisMonth}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-primary text-primary-foreground rounded-xl p-3 text-left touch-active card-press">
                  <Users className="w-5 h-5 mb-2" />
                  <p className="text-xs font-semibold">View Members</p>
                  <p className="text-[9px] opacity-80">{selectedBranch.totalClients} total</p>
                </button>
                <button className="bg-secondary rounded-xl p-3 text-left touch-active card-press border border-border/30">
                  <FileText className="w-5 h-5 text-green-500 mb-2" />
                  <p className="text-xs font-semibold text-foreground">Branch Report</p>
                  <p className="text-[9px] text-muted-foreground">Generate</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Packages Modal (Admin) */}
      {showPackages && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Manage Packages</h3>
              <button onClick={() => setShowPackages(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {packagesData.map((pkg) => (
                <div key={pkg.id} className="bg-secondary rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-foreground">{pkg.name}</p>
                    <p className="text-sm font-bold text-primary">{pkg.price}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground mb-2">{pkg.description}</p>
                  {pkg.bonuses && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {pkg.bonuses.map((bonus, i) => (
                        <span key={i} className="px-2 py-0.5 bg-green-500/20 text-green-500 text-[9px] rounded-full font-medium">
                          {bonus}
                        </span>
                      ))}
                    </div>
                  )}
                  {pkg.paymentSchedule && (
                    <div className="mt-2 space-y-1">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wide">Payment Schedule:</p>
                      {pkg.paymentSchedule.map((payment, i) => (
                        <div key={i} className="flex justify-between text-[10px]">
                          <span className="text-yellow-500">{payment.alert}</span>
                          <span className="text-foreground font-medium">{payment.amount}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[10px] mt-2 pt-2 border-t border-border/30">
                    <span className="text-muted-foreground">{pkg.sessions} sessions / {pkg.duration}</span>
                    <span className="text-green-500 font-medium">{pkg.active} active members</span>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 bg-primary/20 text-primary rounded-xl font-semibold flex items-center justify-center gap-2 touch-active text-sm">
                <Plus className="w-4 h-4" /> Add New Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reports Modal (Admin) */}
      {showReports && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Reports</h3>
              <button onClick={() => setShowReports(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-secondary rounded-xl p-4">
                <h4 className="text-xs font-semibold text-foreground mb-3">Revenue</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <p className="text-base font-bold text-foreground">{reportsData.revenue.daily}</p>
                    <p className="text-[9px] text-muted-foreground">Today</p>
                  </div>
                  <div className="text-center">
                    <p className="text-base font-bold text-foreground">{reportsData.revenue.weekly}</p>
                    <p className="text-[9px] text-muted-foreground">This Week</p>
                  </div>
                  <div className="text-center">
                    <p className="text-base font-bold text-foreground">{reportsData.revenue.monthly}</p>
                    <p className="text-[9px] text-muted-foreground">This Month</p>
                  </div>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <h4 className="text-xs font-semibold text-foreground mb-3">Attendance</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <p className="text-base font-bold text-foreground">{reportsData.attendance.daily}</p>
                    <p className="text-[9px] text-muted-foreground">Today</p>
                  </div>
                  <div className="text-center">
                    <p className="text-base font-bold text-foreground">{reportsData.attendance.weekly}</p>
                    <p className="text-[9px] text-muted-foreground">This Week</p>
                  </div>
                  <div className="text-center">
                    <p className="text-base font-bold text-foreground">{reportsData.attendance.monthly}</p>
                    <p className="text-[9px] text-muted-foreground">This Month</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-secondary rounded-xl p-4 text-center">
                  <p className="text-lg font-bold text-green-500">{reportsData.newMembers.monthly}</p>
                  <p className="text-[9px] text-muted-foreground">New Members (Month)</p>
                </div>
                <div className="bg-secondary rounded-xl p-4 text-center">
                  <p className="text-lg font-bold text-primary">{reportsData.renewals.monthly}</p>
                  <p className="text-[9px] text-muted-foreground">Renewals (Month)</p>
                </div>
              </div>
              <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold touch-active">
                Export Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal (Admin) */}
      {showAnalytics && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Analytics</h3>
              <button onClick={() => setShowAnalytics(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-secondary rounded-xl p-4">
                <h4 className="text-xs font-semibold text-foreground mb-3">Top Packages</h4>
                <div className="space-y-2.5">
                  {analyticsData.topPackages.map((pkg, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-foreground">{pkg.name}</span>
                        <span className="text-[10px] text-muted-foreground">{pkg.percentage}%</span>
                      </div>
                      <div className="h-2 bg-[#0d0d0d] rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pkg.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <h4 className="text-xs font-semibold text-foreground mb-3">Peak Hours</h4>
                <div className="flex items-end justify-between h-20 gap-1">
                  {analyticsData.peakHours.map((hour, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-primary rounded-t transition-all" style={{ height: `${(hour.attendance / 50) * 100}%` }} />
                      <span className="text-[7px] text-muted-foreground mt-1 text-center leading-tight">{hour.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-secondary rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-green-500">{analyticsData.memberRetention}%</p>
                  <p className="text-[9px] text-muted-foreground">Member Retention</p>
                </div>
                <div className="bg-secondary rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{analyticsData.avgSessionsPerMember}</p>
                  <p className="text-[9px] text-muted-foreground">Avg Sessions/Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Announcements Modal (Admin) */}
      {showAnnouncements && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Send Announcement</h3>
              <button onClick={() => setShowAnnouncements(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Send To</label>
                <div className="grid grid-cols-2 gap-2">
                  {["All Members", "Active Only", "Expiring", "Staff"].map((option) => (
                    <button key={option} className="py-2.5 bg-secondary rounded-xl text-xs font-medium text-foreground touch-active hover:bg-secondary/80">
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Title</label>
                <input type="text" placeholder="Announcement title..." className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Message</label>
                <textarea placeholder="Write your announcement..." className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none focus:ring-1 focus:ring-primary min-h-[100px] resize-none" />
              </div>
              <button onClick={() => { alert("Announcement sent successfully!"); setShowAnnouncements(false); }} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold touch-active">
                Send Announcement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Referral Program Modal (Member) */}
      {showReferral && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Referral Program</h3>
              <button onClick={() => setShowReferral(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-secondary rounded-xl p-4 text-center">
                <Gift className="w-10 h-10 text-primary mx-auto mb-2" />
                <h4 className="text-lg font-bold text-foreground mb-1">Earn 200 Points!</h4>
                <p className="text-xs text-muted-foreground">For every friend you refer who signs up</p>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wide">Your Referral Code</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-[#0d0d0d] rounded-lg px-4 py-3 text-center">
                    <p className="text-lg font-bold text-primary tracking-widest">ALEX2026</p>
                  </div>
                  <button onClick={() => alert("Copied to clipboard!")} className="px-4 py-3 bg-primary text-primary-foreground rounded-lg text-xs font-semibold touch-active">
                    Copy
                  </button>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-3">Your Referrals</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-[#0d0d0d] rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-green-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      </div>
                      <span className="text-xs text-foreground">Maria Santos</span>
                    </div>
                    <span className="text-xs font-bold text-green-500">+200 MP</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#0d0d0d] rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        <Clock className="w-3.5 h-3.5 text-yellow-500" />
                      </div>
                      <span className="text-xs text-foreground">John Reyes</span>
                    </div>
                    <span className="text-xs text-yellow-500">Pending</span>
                  </div>
                </div>
              </div>
              <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold touch-active">
                Share Referral Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Help & Support</h3>
              <button onClick={() => setShowHelp(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-3">Frequently Asked Questions</p>
                <div className="space-y-2">
                  {[
                    { q: "How do I book a session?", a: "Go to Schedule tab and tap on an available time slot." },
                    { q: "How do I earn points?", a: "Complete workouts, refer friends, and participate in challenges." },
                    { q: "Can I cancel a booking?", a: "Yes, up to 2 hours before your scheduled session." },
                    { q: "How do I update my payment method?", a: "Go to Payment tab and tap on Payment Methods." },
                  ].map((faq, i) => (
                    <details key={i} className="group bg-[#0d0d0d] rounded-lg">
                      <summary className="p-3 text-xs font-medium text-foreground cursor-pointer flex items-center justify-between">
                        {faq.q}
                        <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="px-3 pb-3 text-[11px] text-muted-foreground">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-3">Contact Us</p>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 bg-[#0d0d0d] rounded-lg touch-active">
                    <Phone className="w-4 h-4 text-primary" />
                    <div className="text-left">
                      <p className="text-xs text-foreground">Call Support</p>
                      <p className="text-[10px] text-muted-foreground">0917-BEARFIT</p>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 bg-[#0d0d0d] rounded-lg touch-active">
                    <Mail className="w-4 h-4 text-primary" />
                    <div className="text-left">
                      <p className="text-xs text-foreground">Email Us</p>
                      <p className="text-[10px] text-muted-foreground">support@bearfit.ph</p>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 bg-[#0d0d0d] rounded-lg touch-active">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <div className="text-left">
                      <p className="text-xs text-foreground">Live Chat</p>
                      <p className="text-[10px] text-muted-foreground">Available 6AM - 10PM</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy & Security Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Privacy & Security</h3>
              <button onClick={() => setShowPrivacy(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-3">Data Management</p>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 bg-[#0d0d0d] rounded-lg touch-active">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-xs text-foreground">Download My Data</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-[#0d0d0d] rounded-lg touch-active">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-xs text-foreground">Privacy Policy</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-[#0d0d0d] rounded-lg touch-active">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-xs text-foreground">Terms of Service</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-3">Security</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-[#0d0d0d] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-primary" />
                      <span className="text-xs text-foreground">Two-Factor Auth</span>
                    </div>
                    <div className="w-10 h-6 bg-green-500 rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-between p-3 bg-[#0d0d0d] rounded-lg touch-active">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-primary" />
                      <span className="text-xs text-foreground">Active Sessions</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">2 devices</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-[#0d0d0d] rounded-lg touch-active">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-primary" />
                      <span className="text-xs text-foreground">Change Password</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <button className="w-full py-3 bg-red-500/20 text-red-500 rounded-xl font-semibold touch-active text-sm">
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language Modal */}
      {showLanguage && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Language</h3>
              <button onClick={() => setShowLanguage(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {[
                { code: "en", name: "English", native: "English", selected: true },
                { code: "fil", name: "Filipino", native: "Tagalog", selected: false },
                { code: "es", name: "Spanish", native: "EspaÃ±ol", selected: false },
                { code: "zh", name: "Chinese", native: "ä¸­æ–‡", selected: false },
                { code: "ja", name: "Japanese", native: "æ—¥æœ¬èªž", selected: false },
                { code: "ko", name: "Korean", native: "í•œêµ­ì–´", selected: false },
              ].map((lang) => (
                <button 
                  key={lang.code} 
                  onClick={() => { alert(`Language changed to ${lang.name}`); setShowLanguage(false); }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl touch-active ${lang.selected ? "bg-primary/20 border border-primary" : "bg-secondary"}`}
                >
                  <div className="flex items-center gap-3">
                    <Globe className={`w-4 h-4 ${lang.selected ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="text-left">
                      <p className={`text-xs font-medium ${lang.selected ? "text-primary" : "text-foreground"}`}>{lang.name}</p>
                      <p className="text-[10px] text-muted-foreground">{lang.native}</p>
                    </div>
                  </div>
                  {lang.selected && <CheckCircle className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* About BearFit Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">About BearFit</h3>
              <button onClick={() => setShowAbout(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary-foreground" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-foreground">
                  <span className="text-primary">BEAR</span>FIT
                </h4>
                <p className="text-xs text-primary">Better fitness.</p>
                <p className="text-[10px] text-muted-foreground mt-1">Version 2.0.1</p>
              </div>
              <div className="bg-secondary rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Build Number</span>
                  <span className="text-xs text-foreground">2026.02.03</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Last Updated</span>
                  <span className="text-xs text-foreground">February 1, 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Developer</span>
                  <span className="text-xs text-foreground">BearFit Technologies</span>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-2">Legal</p>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-2 touch-active">
                    <span className="text-xs text-muted-foreground">Terms of Service</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between p-2 touch-active">
                    <span className="text-xs text-muted-foreground">Privacy Policy</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between p-2 touch-active">
                    <span className="text-xs text-muted-foreground">Open Source Licenses</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-center text-muted-foreground">
                Â© 2026 BearFit Technologies Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings Modal (Admin) */}
      {showNotificationSettings && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Notification Settings</h3>
              <button onClick={() => setShowNotificationSettings(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-secondary rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-semibold text-foreground">Push Notifications</h4>
                {[
                  { label: "New Member Signup", enabled: true },
                  { label: "Payment Received", enabled: true },
                  { label: "Payment Reminders", enabled: true },
                  { label: "Session Bookings", enabled: true },
                  { label: "Staff Attendance", enabled: false },
                  { label: "Low Session Alerts", enabled: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-foreground">{item.label}</span>
                    <button className={`w-10 h-6 rounded-full transition-all ${item.enabled ? "bg-primary" : "bg-muted-foreground/30"}`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transition-all ${item.enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="bg-secondary rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-semibold text-foreground">Email Notifications</h4>
                {[
                  { label: "Daily Summary Report", enabled: true },
                  { label: "Weekly Analytics", enabled: true },
                  { label: "Monthly Revenue Report", enabled: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-foreground">{item.label}</span>
                    <button className={`w-10 h-6 rounded-full transition-all ${item.enabled ? "bg-primary" : "bg-muted-foreground/30"}`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transition-all ${item.enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold touch-active">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Access Control Modal (Admin) */}
      {showAccessControl && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Access Control</h3>
              <button onClick={() => setShowAccessControl(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-secondary rounded-xl p-4">
                <h4 className="text-xs font-semibold text-foreground mb-3">Role Management</h4>
                <div className="space-y-2">
                  {[
                    { role: "Admin", users: 2, color: "bg-red-500" },
                    { role: "Manager", users: 3, color: "bg-yellow-500" },
                    { role: "Staff", users: 8, color: "bg-blue-500" },
                    { role: "Leads", users: 4, color: "bg-green-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-[#141414] rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-xs text-foreground">{item.role}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">{item.users} users</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <h4 className="text-xs font-semibold text-foreground mb-3">Permission Settings</h4>
                <div className="space-y-2">
                  {[
                    { permission: "View Members", admin: true, manager: true, staff: true },
                    { permission: "Edit Members", admin: true, manager: true, staff: false },
                    { permission: "View Payments", admin: true, manager: true, staff: false },
                    { permission: "Process Payments", admin: true, manager: false, staff: false },
                    { permission: "Manage Staff", admin: true, manager: false, staff: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-[#141414] rounded-lg">
                      <span className="text-xs text-foreground">{item.permission}</span>
                      <button className="text-[10px] text-primary font-medium">Configure</button>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold touch-active">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* App Settings Modal (Admin) */}
      {showAppSettings && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">App Settings</h3>
              <button onClick={() => setShowAppSettings(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-secondary rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-semibold text-foreground">General</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground">Language</span>
                  <button className="text-xs text-primary font-medium">English (PH)</button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground">Currency</span>
                  <button className="text-xs text-primary font-medium">PHP (â‚±)</button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground">Time Zone</span>
                  <button className="text-xs text-primary font-medium">Asia/Manila</button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground">Date Format</span>
                  <button className="text-xs text-primary font-medium">MM/DD/YYYY</button>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-semibold text-foreground">Business Hours</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground">Opening Time</span>
                  <button className="text-xs text-primary font-medium">5:00 AM</button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground">Closing Time</span>
                  <button className="text-xs text-primary font-medium">10:00 PM</button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground">Closed Days</span>
                  <button className="text-xs text-primary font-medium">None</button>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-semibold text-foreground">Session Settings</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground">Default Duration</span>
                  <button className="text-xs text-primary font-medium">60 min</button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground">Max Clients per Slot</span>
                  <button className="text-xs text-primary font-medium">5</button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground">Booking Lead Time</span>
                  <button className="text-xs text-primary font-medium">2 hours</button>
                </div>
              </div>
              <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold touch-active">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About BearFit Modal (Admin) */}
      {showAboutBearFit && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">About BearFit</h3>
              <button onClick={() => setShowAboutBearFit(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary-foreground" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-foreground">
                  <span className="text-primary">BEAR</span>FIT
                </h4>
                <p className="text-xs text-primary">Better fitness.</p>
                <p className="text-[10px] text-muted-foreground mt-1">Admin Portal v2.0.1</p>
              </div>
              <div className="bg-secondary rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Build Number</span>
                  <span className="text-xs text-foreground">2026.02.03</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Last Updated</span>
                  <span className="text-xs text-foreground">February 3, 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Environment</span>
                  <span className="text-xs text-foreground">Production</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Server Status</span>
                  <span className="text-xs text-green-500 font-medium">Online</span>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <h4 className="text-xs font-semibold text-foreground mb-2">System Info</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[10px] text-muted-foreground">Total Members</span>
                    <span className="text-[10px] text-foreground">{clientsData.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-muted-foreground">Active Branches</span>
                    <span className="text-[10px] text-foreground">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-muted-foreground">Total Staff</span>
                    <span className="text-[10px] text-foreground">{staffData.length}</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-center text-muted-foreground">
                Â© 2026 BearFit Technologies Inc.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddLead && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Add New Lead</h3>
              <button onClick={() => setShowAddLead(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Full Name</label>
                <input type="text" placeholder="Enter name..." className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Phone</label>
                  <input type="tel" placeholder="0917-xxx-xxxx" className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Email</label>
                  <input type="email" placeholder="email@example.com" className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Source</label>
                  <select className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none">
                    <option value="">Select...</option>
                    <option>Referral</option>
                    <option>Walk-in</option>
                    <option>Social Media</option>
                    <option>Website</option>
                    <option>Event</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Interest</label>
                  <select className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none">
                    <option value="">Select...</option>
                    <option>Full 48 Package</option>
                    <option>Full 24 Package</option>
                    <option>Staggered 48</option>
                    <option>Staggered 24</option>
                    <option>Personal Training</option>
                    <option>Pilates</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Notes</label>
                <textarea placeholder="Initial notes about the lead..." className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none min-h-[70px] resize-none" />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Assign To</label>
                <select className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none">
                  <option value="">Select coach...</option>
                  <option>Coach Joaquin</option>
                  <option>Coach Maria</option>
                  <option>Coach Carlos</option>
                  <option>Coach Ana</option>
                </select>
              </div>
              <button onClick={() => { alert("Lead added successfully!"); setShowAddLead(false); }} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold touch-active">
                Add Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session History Modal (Staff) */}
      {showSessionHistory && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Session History</h3>
              <button onClick={() => setShowSessionHistory(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {sessionHistoryData.map((session) => (
                <div key={session.id} className="bg-secondary rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-foreground">{session.client}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: session.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-primary font-medium mb-1">{session.session}</p>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{session.date} at {session.time}</span>
                    <span>{session.duration}</span>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 bg-secondary text-foreground rounded-xl font-medium text-sm touch-active">
                Load More
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Report Modal (Staff) */}
      {showMonthlyReport && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Monthly Report</h3>
              <button onClick={() => setShowMonthlyReport(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="text-center bg-secondary rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Report Period</p>
                <p className="text-lg font-bold text-foreground">{monthlyReportData.month}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-foreground">{monthlyReportData.totalSessions}</p>
                  <p className="text-[10px] text-muted-foreground">Total Sessions</p>
                </div>
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-foreground">{monthlyReportData.totalHours}</p>
                  <p className="text-[10px] text-muted-foreground">Total Hours</p>
                </div>
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-yellow-500">{monthlyReportData.avgRating}</p>
                  <p className="text-[10px] text-muted-foreground">Avg Rating</p>
                </div>
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-green-500">{monthlyReportData.earnings}</p>
                  <p className="text-[10px] text-muted-foreground">Earnings</p>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-3">Highlights</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-[#0d0d0d] rounded-lg">
                    <span className="text-[10px] text-muted-foreground">Top Client</span>
                    <span className="text-xs text-foreground font-medium">{monthlyReportData.topClient}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#0d0d0d] rounded-lg">
                    <span className="text-[10px] text-muted-foreground">Most Popular Session</span>
                    <span className="text-xs text-foreground font-medium">{monthlyReportData.mostPopularSession}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => alert("Report downloaded!")} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold touch-active">
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time Off Request Modal (Staff) */}
      {showTimeOff && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Time Off Request</h3>
              <button onClick={() => setShowTimeOff(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-3">Leave Balance</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">5</p>
                    <p className="text-[9px] text-muted-foreground">Vacation</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">3</p>
                    <p className="text-[9px] text-muted-foreground">Sick Leave</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">2</p>
                    <p className="text-[9px] text-muted-foreground">Personal</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Leave Type</label>
                <select className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>Vacation Leave</option>
                  <option>Sick Leave</option>
                  <option>Personal Leave</option>
                  <option>Emergency Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Start Date</label>
                  <input type="date" className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">End Date</label>
                  <input type="date" className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground mb-1.5 block font-medium uppercase tracking-wide">Reason</label>
                <textarea placeholder="Provide reason for leave request..." className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground border border-border/30 focus:outline-none focus:ring-1 focus:ring-primary min-h-[80px] resize-none" />
              </div>
              <button onClick={() => { alert("Time off request submitted!"); setShowTimeOff(false); }} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold touch-active">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal (Staff) */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#141414] rounded-t-3xl lg:rounded-2xl overflow-hidden border border-border/50 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border/50 sticky top-0 bg-[#141414] z-10">
              <h3 className="text-base font-semibold text-foreground">Preferences</h3>
              <button onClick={() => setShowPreferences(false)} className="p-1.5 rounded-full bg-secondary touch-active">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-3">Notifications</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 text-primary" />
                      <span className="text-xs text-foreground">Session Reminders</span>
                    </div>
                    <div className="w-10 h-6 bg-green-500 rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-4 h-4 text-primary" />
                      <span className="text-xs text-foreground">Client Messages</span>
                    </div>
                    <div className="w-10 h-6 bg-green-500 rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-xs text-foreground">Weekly Summary</span>
                    </div>
                    <div className="w-10 h-6 bg-muted rounded-full relative">
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-3">Display</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-[#0d0d0d] rounded-lg">
                    <span className="text-xs text-foreground">Theme</span>
                    <span className="text-xs text-muted-foreground">Dark</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#0d0d0d] rounded-lg">
                    <span className="text-xs text-foreground">Calendar Start Day</span>
                    <span className="text-xs text-muted-foreground">Sunday</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#0d0d0d] rounded-lg">
                    <span className="text-xs text-foreground">Time Format</span>
                    <span className="text-xs text-muted-foreground">12 Hour</span>
                  </div>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-xs font-semibold text-foreground mb-3">Account</p>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-2 touch-active">
                    <span className="text-xs text-foreground">Edit Profile</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between p-2 touch-active">
                    <span className="text-xs text-foreground">Change Password</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <button className="w-full py-3 bg-red-500/20 text-red-500 rounded-xl font-semibold touch-active text-sm">
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}