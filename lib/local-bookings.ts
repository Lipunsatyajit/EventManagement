export type LocalBooking = {
  id: string; email: string; name: string; mobile: string; district: string;
  eventType: string; date: string; budget: number; message: string;
  status: "Pending" | "Cancelled"; createdAt: string;
};
const KEY = "utkal-local-bookings";
export function readLocalBookings(): LocalBooking[] {
  const data: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
  if (!Array.isArray(data)) throw new Error("Saved booking data could not be read.");
  return data.filter((item): item is LocalBooking => item && typeof item.id === "string" &&
    typeof item.email === "string" && typeof item.eventType === "string" && typeof item.date === "string" &&
    (item.status === "Pending" || item.status === "Cancelled"));
}
export function saveLocalBooking(booking: LocalBooking) {
  localStorage.setItem(KEY, JSON.stringify([...readLocalBookings(), booking]));
}
export function cancelLocalBooking(id: string, email: string) {
  const records = readLocalBookings().map((item) => item.id === id && item.email === email
    ? { ...item, status: "Cancelled" as const } : item);
  localStorage.setItem(KEY, JSON.stringify(records));
}
export function localToday() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
