import { RoleSectionPage } from "../../_components/role-section-page";

export default function PlannerGalleryPage() {
  return (
    <RoleSectionPage
      roleLabel="Planner"
      title="Gallery & videos"
      description="Upload event photos, add highlight videos, and keep portfolio media ready for customer review."
      backHref="/planner/dashboard"
      backLabel="Back to dashboard"
      actionHref="/planner/completed-events"
      actionLabel="Log completed event"
      items={[
        "Upload venue photos",
        "Add highlight videos",
        "Tag customer event type",
        "Show media on planner profile",
      ]}
    />
  );
}
