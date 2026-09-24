import type { AuthRoleKey } from "@/lib/auth-directory";

export type PortalNavItem = {
  label: string;
  href: string;
  description?: string;
};

export type PortalNavGroup = {
  title: string;
  items: PortalNavItem[];
};

export const portalNavigation: Record<AuthRoleKey, PortalNavGroup[]> = {
  customer: [],
  planner: [
    {
      title: "Planner",
      items: [
        { label: "Dashboard", href: "/planner/dashboard" },
        { label: "Booking requests", href: "/planner/bookings" },
        { label: "Gallery & videos", href: "/planner/gallery" },
        { label: "Completed events", href: "/planner/completed-events" },
        { label: "Reviews", href: "/planner/reviews" },
        { label: "Profile", href: "/planner/profile" },
        { label: "Packages", href: "/planner/packages" },
        { label: "Notifications", href: "/planner/notifications" },
        { label: "Settings", href: "/planner/settings" },
      ],
    },
  ],
  admin: [
    {
      title: "Super admin",
      items: [
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Planner approvals", href: "/admin/planner-approvals" },
        { label: "Planners", href: "/admin/planners" },
        { label: "Bookings", href: "/admin/bookings" },
        { label: "Reviews", href: "/admin/reviews" },
        { label: "Reports", href: "/admin/reports" },
        { label: "Categories", href: "/admin/categories" },
        { label: "Districts", href: "/admin/districts" },
        { label: "Customers", href: "/admin/customers" },
        { label: "Settings", href: "/admin/settings" },
      ],
    },
  ],
};

export function getPortalRoleLabel(role: AuthRoleKey) {
  if (role === "planner") {
    return "Planner";
  }

  if (role === "admin") {
    return "Super Admin";
  }

  return "Customer";
}
