// Loading placeholder shaped like a page banner followed by a grid of cards.
export default function PageSkeleton({ cards = 6, withImages = true }: { cards?: number; withImages?: boolean }) {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="bg-navy-900 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-12 w-64 rounded-lg bg-navy-700" />
          <div className="mt-5 h-5 w-full max-w-xl rounded bg-navy-800" />
        </div>
      </div>
      <div className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl animate-pulse gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: cards }, (_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 dark:bg-navy-900 dark:ring-navy-800">
              {withImages && <div className="aspect-[16/10] bg-slate-200 dark:bg-navy-800" />}
              <div className="space-y-3 p-6">
                <div className="h-4 w-24 rounded bg-slate-200 dark:bg-navy-800" />
                <div className="h-6 w-3/4 rounded bg-slate-200 dark:bg-navy-800" />
                <div className="h-4 w-full rounded bg-slate-100 dark:bg-navy-800/60" />
                <div className="h-4 w-5/6 rounded bg-slate-100 dark:bg-navy-800/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
