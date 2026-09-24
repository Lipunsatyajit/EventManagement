import {
  CustomerAuthShell,
  CustomerDashboardContent,
  CustomerEmailLoginForm,
  CustomerOtpVerificationForm,
  CustomerPortalShell,
} from "../../customer/_components/customer-ui";
import { RoleSectionPage } from "../../_components/role-section-page";

export function CustomerLoginPage() {
  return (
    <CustomerAuthShell
      eyebrow="Customer access"
      title="Sign in with email to receive your OTP."
      description="Customer login lives under the customer folder now, with OTP verification on the next step."
      footerHref="/"
      footerLabel="Back to home"
    >
      <CustomerEmailLoginForm
        role="customer"
        actionLabel="Send OTP"
        verifyHref="/customer/login/verify"
        helperText="After OTP verification, customers land on the customer dashboard."
        noteText="Customer login is intentionally email-only. No password field is shown."
      />
    </CustomerAuthShell>
  );
}

export async function CustomerOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email = "" } = await searchParams;

  return (
    <CustomerAuthShell
      eyebrow="Customer verification"
      title="Enter the OTP sent to your email."
      description="Customer OTP verification routes into the customer dashboard without needing an API yet."
      footerHref="/customer/login"
      footerLabel="Back to customer login"
    >
      <CustomerOtpVerificationForm
        email={email}
        role="customer"
        fallbackHref="/customer/dashboard"
        title="Customer OTP verification"
        description={`A 6-digit code is required for ${email || "your email"} before opening the customer dashboard.`}
        overrideDashboardHref="/customer/dashboard"
      />
    </CustomerAuthShell>
  );
}

export function CustomerDashboardPage() {
  return (
    <CustomerPortalShell
      roleLabel="Customer dashboard"
      title="Bookings, wishlist, and consultation requests."
      description="Customer-facing home for requests, pending consultations, and completed bookings."
      backHref="/customer/login"
      backLabel="Back to login"
    >
      <CustomerDashboardContent />
    </CustomerPortalShell>
  );
}

export function CustomerBookingsPage() {
  return (
    <RoleSectionPage
      roleLabel="Customer"
      title="Bookings"
      description="Customer booking history, status tracking, and consultation follow-up."
      backHref="/customer/dashboard"
      backLabel="Back to dashboard"
      actionHref="/customer/login"
      actionLabel="Request another consultation"
      items={[
        "Booking request timeline",
        "Confirmed and pending requests",
        "Offline payment follow-up notes",
        "Planner response history",
      ]}
    />
  );
}

export function CustomerWishlistPage() {
  return (
    <RoleSectionPage
      roleLabel="Customer"
      title="Wishlist"
      description="Saved planners and quick access to shortlisted event vendors."
      backHref="/customer/dashboard"
      backLabel="Back to dashboard"
      actionHref="/planners"
      actionLabel="Browse planners"
      items={[
        "Saved planner cards",
        "District and event-type filters",
        "Shareable shortlists",
        "Comparison notes",
      ]}
    />
  );
}

export function CustomerReviewsPage() {
  return (
    <RoleSectionPage
      roleLabel="Customer"
      title="Reviews"
      description="Ratings and feedback submitted after completed events."
      backHref="/customer/dashboard"
      backLabel="Back to dashboard"
      actionHref="/customer/bookings"
      actionLabel="View bookings"
      items={[
        "Submitted ratings",
        "Review edit history",
        "Photo and event references",
        "Planner response status",
      ]}
    />
  );
}

export function CustomerProfilePage() {
  return (
    <RoleSectionPage
      roleLabel="Customer"
      title="Profile"
      description="Customer account details, contact info, and preferences."
      backHref="/customer/dashboard"
      backLabel="Back to dashboard"
      actionHref="/customer/login"
      actionLabel="Update login email"
      items={[
        "Email and phone details",
        "District preference",
        "Notification settings",
        "Review and booking preferences",
      ]}
    />
  );
}
