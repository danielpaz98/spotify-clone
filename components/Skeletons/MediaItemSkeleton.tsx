// COMPONENTS
import { Skeleton } from "@/components/ui";

export default function MediaItemSkeleton() {
  return (
    <div className="flex items-center gap-x-3 p-2">
      <Skeleton className="flex-shrink-0 h-12 w-12 rounded" />

      <div className="space-y-[6px] w-full">
        <Skeleton className="h-4 w-[140px] rounded" />
        <Skeleton className="h-3 w-[116px] rounded" />
      </div>
    </div>
  );
}
