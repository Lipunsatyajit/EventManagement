import {
  PlannerAuthShell,
  PlannerCreateForm,
  PlannerDashboardContent,
  PlannerEmailLoginForm,
  PlannerOtpVerificationForm,
  PlannerPortalShell,
} from "../../planner/_components/planner-ui";
import { RoleSectionPage } from "../../_components/role-section-page";

export { PlannerCreateForm };

export function PlannerLoginPage() {
  return (
    <PlannerAuthShell
      eyebrow="Planner portal"
      title="Planner login with email and OTP."
      description="Planner access is grouped under the planner folder with a create-account flow and OTP verification."
      footerHref="/planner/create"
      footerLabel="Create planner account"
    >
      <PlannerEmailLoginForm
        role="planner"
        actionLabel="Send OTP"
        verifyHref="/planner/login/verify"
        helperText="Once verified, planners land on the planner dashboard."
        noteText="Planner users are created with a fixed planner ID, then authenticated with email + OTP."
        ctaLink={{ href: "/planner/create", label: "Create a planner account" }}
      />
    </PlannerAuthShell>
  );
}

export async function PlannerOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; plannerId?: string }>;
}) {
  const { email = "", plannerId } = await searchParams;

  return (
    <PlannerAuthShell
      eyebrow="Planner verification"
      title="Verify the planner email with OTP."
      description="Once the planner account is created, OTP verification routes the planner to the planner dashboard."
      footerHref="/planner/create"
      footerLabel="Create planner account"
    >
      <PlannerOtpVerificationForm
        email={email}
        role="planner"
        fallbackHref="/planner/dashboard"
        title="Planner OTP verification"
        description={`A 6-digit code is required for ${email || "the planner email"} before opening the planner dashboard.`}
        overrideDashboardHref={plannerId ? "/planner/dashboard" : undefined}
        hintText={
          plannerId
            ? `Planner ID ${plannerId} will be attached to this session.`
            : "Choose a planner account first if you are creating a new user."
        }
      />
    </PlannerAuthShell>
  );
}

export function PlannerCreatePage({
  searchParams,
}: {
  searchParams: Promise<{ plannerId?: string }>;
}) {
  return (
    <PlannerCreatePageInner searchParams={searchParams} />
  );
}

async function PlannerCreatePageInner({
  searchParams,
}: {
  searchParams: Promise<{ plannerId?: string }>;
}) {
  const { plannerId } = await searchParams;
  const selectedPlanner = plannerId ?? "plnr-001";

  return (
    <PlannerAuthShell
      eyebrow="Planner onboarding"
      title="Create a planner account with a fixed planner ID."
      description="The planner dropdown stays selected and disabled so the account is linked to the correct planner row."
      footerHref="/planner/login"
      footerLabel="Back to planner login"
    >
      <div className="mb-5 rounded-[1.4rem] border border-black/5 bg-[#faf7f2] p-4 text-sm leading-6 text-[#4e4335]">
        Selected planner ID: <span className="font-semibold text-[#241f1b]">{selectedPlanner}</span>
      </div>
      <PlannerCreateForm selectedPlannerId={selectedPlanner} />
    </PlannerAuthShell>
  );
}

export function PlannerDashboardPage() {
  return (
    <PlannerPortalShell
      roleLabel="Planner dashboard"
      title="Manage inquiries, completed events, and packages."
      description="Planner operations center for requests, completed portfolio updates, and customer communication."
      backHref="/planner/login"
      backLabel="Back to planner login"
    >
      <PlannerDashboardContent />
    </PlannerPortalShell>
  );
}

export function PlannerBookingsPage() {
  return (
    <RoleSectionPage
      roleLabel="Planner"
      title="Bookings"
      description="Planner booking requests, confirmations, and follow-up tasks."
      backHref="/planner/dashboard"
      backLabel="Back to dashboard"
      actionHref="/planner/login"
      actionLabel="Review new request"
      items={[
        "Pending consultation requests",
        "Confirmed event bookings",
        "Offline discussion notes",
        "Client communication history",
      ]}
    />
  );
}

export function PlannerCompletedEventsPage() {
  return (
    <RoleSectionPage
      roleLabel="Planner"
      title="Completed events"
      description="Portfolio evidence for the planner profile and marketing pages."
      backHref="/planner/dashboard"
      backLabel="Back to dashboard"
      actionHref="/planners/dream-events"
      actionLabel="Open profile"
      items={["Event gallery entries", "Budget and venue notes", "Services delivered", "Review references"]}
    />
  );
}

export function PlannerPackagesPage() {
  return (
    <RoleSectionPage
      roleLabel="Planner"
      title="Packages"
      description="Service packages and pricing tiers for event planning."
      backHref="/planner/dashboard"
      backLabel="Back to dashboard"
      actionHref="/planner/profile"
      actionLabel="Edit package data"
      items={["Wedding packages", "Reception packages", "Corporate packages", "Custom add-ons"]}
    />
  );
}

export function PlannerReviewsPage() {
  return (
    <RoleSectionPage
      roleLabel="Planner"
      title="Reviews"
      description="Planner review management and customer feedback."
      backHref="/planner/dashboard"
      backLabel="Back to dashboard"
      actionHref="/planner/completed-events"
      actionLabel="Open completed events"
      items={["Customer ratings", "Review responses", "Photos attached to reviews", "Feedback moderation"]}
    />
  );
}

export function PlannerNotificationsPage() {
  return (
    <RoleSectionPage
      roleLabel="Planner"
      title="Notifications"
      description="Alerts for incoming consultation requests and booking updates."
      backHref="/planner/dashboard"
      backLabel="Back to dashboard"
      actionHref="/planner/bookings"
      actionLabel="Check bookings"
      items={["New consultation requests", "Payment follow-up reminders", "Customer responses", "Pending approval alerts"]}
    />
  );
}

export function PlannerProfilePage() {
  return (
    <RoleSectionPage
      roleLabel="Planner"
      title="Profile"
      description="Planner profile details shown on the public marketplace."
      backHref="/planner/dashboard"
      backLabel="Back to dashboard"
      actionHref="/planner/settings"
      actionLabel="Open settings"
      items={["Business name and contact", "District and service areas", "Portfolio summary", "Verification status"]}
    />
  );
}

export function PlannerSettingsPage() {
  return (
    <RoleSectionPage
      roleLabel="Planner"
      title="Settings"
      description="Planner account and notification preferences."
      backHref="/planner/dashboard"
      backLabel="Back to dashboard"
      actionHref="/planner/login"
      actionLabel="Sign out"
      items={["Passwordless login preferences", "Notification settings", "Business profile options", "Account security"]}
    />
  );
}
