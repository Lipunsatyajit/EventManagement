export type AccentTone = "violet" | "amber" | "rose" | "emerald" | "slate";

export type NavigationItem = {
  label: string;
  href: string;
};

export type CategoryItem = {
  label: string;
  note: string;
  icon: string;
};

export type PlannerCard = {
  slug: string;
  name: string;
  district: string;
  services: string[];
  rating: string;
  reviews: number;
  completedEvents: string;
  accent: AccentTone;
  summary: string;
};

export type EventCard = {
  slug: string;
  title: string;
  venue: string;
  date: string;
  budget: string;
  services: string[];
  summary: string;
  accent: AccentTone;
  photoCount: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type FeatureItem = {
  label: string;
};

export type DashboardCard = {
  title: string;
  description: string;
  stats: StatItem[];
  accent: AccentTone;
  href: string;
  note: string;
};

export type AuthRole = {
  key: "customer" | "planner" | "admin";
  label: string;
  href: string;
  accent: AccentTone;
  description: string;
};

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Planners", href: "/planners" },
  { label: "How it works", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const categoryItems: CategoryItem[] = [
  { label: "Wedding", note: "Ceremony and reception", icon: "O" },
  { label: "Birthday", note: "Family and kids events", icon: "B" },
  { label: "Reception", note: "Grand venue styling", icon: "R" },
  { label: "Corporate", note: "Launches and conferences", icon: "C" },
  { label: "Engagement", note: "Pre-wedding moments", icon: "E" },
  { label: "Photography", note: "Portrait and event coverage", icon: "P" },
  { label: "Decoration", note: "Stage and floral design", icon: "D" },
  { label: "More", note: "Expanded service catalog", icon: "+" },
];

export const heroStats: StatItem[] = [
  { value: "500+", label: "Event planners" },
  { value: "50+", label: "Districts covered" },
  { value: "10K+", label: "Events completed" },
  { value: "5K+", label: "Happy customers" },
];

export const planners: PlannerCard[] = [
  {
    slug: "dream-events",
    name: "Dream Events",
    district: "Bhubaneswar",
    services: ["Wedding", "Reception"],
    rating: "4.8",
    reviews: 124,
    completedEvents: "120+ events",
    accent: "violet",
    summary:
      "Modern stage design, premium floral setups, and end-to-end coordination for wedding celebrations.",
  },
  {
    slug: "royal-celebration",
    name: "Royal Celebration",
    district: "Cuttack",
    services: ["Wedding", "Birthday"],
    rating: "4.7",
    reviews: 98,
    completedEvents: "90+ events",
    accent: "amber",
    summary:
      "Luxury decor with strong vendor coordination for family and milestone celebrations.",
  },
  {
    slug: "elegant-planners",
    name: "Elegant Planners",
    district: "Puri",
    services: ["Wedding", "Corporate"],
    rating: "4.9",
    reviews: 156,
    completedEvents: "140+ events",
    accent: "rose",
    summary:
      "Destination-friendly planning with curated decor stories and polished event execution.",
  },
  {
    slug: "moments-and-more",
    name: "Moments & More",
    district: "Sambalpur",
    services: ["Wedding", "Photography"],
    rating: "4.6",
    reviews: 87,
    completedEvents: "75+ events",
    accent: "emerald",
    summary:
      "Balanced planning for weddings, small receptions, and event photography coordination.",
  },
];

export const completedEvents: EventCard[] = [
  {
    slug: "wedding-of-rahul-and-priya",
    title: "Wedding of Rahul & Priya",
    venue: "Mayfair Lagoon, Bhubaneswar",
    date: "18 Feb 2024",
    budget: "Rs. 2,50,000",
    services: ["Decoration", "Catering", "Photography", "Lighting"],
    summary:
      "A warm, colorful wedding with coordinated decor, live music cues, and a premium dining setup.",
    accent: "violet",
    photoCount: "+28",
  },
  {
    slug: "reception-of-ankit-and-sneha",
    title: "Reception of Ankit & Sneha",
    venue: "Hotel Crown, Cuttack",
    date: "10 Dec 2023",
    budget: "Rs. 1,80,000",
    services: ["Decoration", "Catering", "DJ", "Photography"],
    summary:
      "An elegant reception with ambient lighting, classic floral work, and a compact photo wall.",
    accent: "amber",
    photoCount: "+18",
  },
];

export const featureItems: FeatureItem[] = [
  { label: "Search planners by district and category" },
  { label: "View completed events with photos and videos" },
  { label: "Book consultation and offline follow-up" },
  { label: "Role-based dashboards for all user types" },
  { label: "Ratings, reviews, and notification support" },
  { label: "Responsive layouts for desktop and mobile" },
];

export const dashboardCards: DashboardCard[] = [
  {
    title: "Customer dashboard",
    description:
      "Track bookings, wishlist items, notifications, and review activity from one place.",
    stats: [
      { value: "05", label: "Total bookings" },
      { value: "02", label: "Pending" },
      { value: "02", label: "Confirmed" },
      { value: "01", label: "Completed" },
    ],
    accent: "slate",
    href: "/#contact",
    note: "Booking overview and request follow-up",
  },
  {
    title: "Planner dashboard",
    description:
      "Manage inquiries, completed events, packages, bookings, and planner profile details.",
    stats: [
      { value: "28", label: "Total bookings" },
      { value: "05", label: "Pending requests" },
      { value: "124", label: "Reviews" },
      { value: "4.8", label: "Rating" },
    ],
    accent: "violet",
    href: "/planners/dream-events",
    note: "Planner operations and reviews",
  },
  {
    title: "Admin dashboard",
    description:
      "Monitor planner approvals, customers, bookings, reports, categories, and districts.",
    stats: [
      { value: "320", label: "Total planners" },
      { value: "2,450", label: "Customers" },
      { value: "1,250", label: "Bookings" },
      { value: "980", label: "Reviews" },
    ],
    accent: "amber",
    href: "/planners",
    note: "Platform oversight and moderation",
  },
];

export const authRoles: AuthRole[] = [
  {
    key: "customer",
    label: "Customer login",
    href: "/login?role=customer",
    accent: "slate",
    description: "Book consultations, track requests, and manage reviews.",
  },
  {
    key: "planner",
    label: "Planner login",
    href: "/login?role=planner",
    accent: "violet",
    description: "Manage bookings, portfolios, packages, and notifications.",
  },
  {
    key: "admin",
    label: "Super admin login",
    href: "/login?role=admin",
    accent: "amber",
    description: "Approve planners, monitor reports, and oversee the platform.",
  },
];
