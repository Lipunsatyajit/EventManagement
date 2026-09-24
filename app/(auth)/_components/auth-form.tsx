import Link from "next/link";

type AuthFormProps = {
  role: "customer" | "planner" | "admin";
  actionLabel: string;
  helperText: string;
};

export function AuthForm({ role, actionLabel, helperText }: AuthFormProps) {
  const roleLabel =
    role === "planner" ? "Planner" : role === "admin" ? "Super admin" : "Customer";

  return (
    <form className="space-y-4">
      <div className="rounded-[1.3rem] border border-black/5 bg-[#fffdf8] p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" placeholder={`Enter ${roleLabel.toLowerCase()} email`} />
          <Field label="Password" placeholder="Enter password" type="password" />
        </div>

        {role === "customer" ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Phone number" placeholder="Enter mobile number" />
            <Field label="District" placeholder="Select district" />
          </div>
        ) : null}

        {role === "planner" ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Planner ID" placeholder="Enter planner code" />
            <Field label="District" placeholder="Select district" />
          </div>
        ) : null}

        {role === "admin" ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Admin ID" placeholder="Enter admin code" />
            <Field label="2FA code" placeholder="Enter one-time code" />
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-[#4e4335]">
          <input type="checkbox" className="h-4 w-4 accent-[#6a1b9a]" />
          Remember this device
        </label>
        <Link href="/#contact" className="text-sm font-semibold text-[#6a1b9a]">
          Need help?
        </Link>
      </div>

      <button className="inline-flex w-full items-center justify-center rounded-full bg-[#6a1b9a] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
        {actionLabel}
      </button>

      <p className="text-sm leading-6 text-[#6b6152]">{helperText}</p>
    </form>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-[#241f1b]">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#988b78] focus:border-[#6a1b9a]/30"
      />
    </label>
  );
}
