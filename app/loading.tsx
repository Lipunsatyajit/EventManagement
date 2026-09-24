export default function Loading() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto w-full max-w-[1480px]">
        <div className="shell-card rounded-[2rem] p-6 sm:p-8">
          <div className="h-4 w-28 rounded-full bg-[#6a1b9a]/15" />
          <div className="mt-4 h-10 w-[60%] max-w-xl rounded-2xl bg-[#241f1b]/8" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="h-56 rounded-[1.8rem] bg-white/70" />
            <div className="h-56 rounded-[1.8rem] bg-white/70" />
          </div>
          <div className="mt-4 h-64 rounded-[1.8rem] bg-white/70" />
        </div>
      </div>
    </main>
  );
}
