import { Skeleton } from "./UI/skeleton";

const SidebarShopAccordionSkeleton = function () {
  return (
    <Skeleton className="w-full h-[38vh] rounded-none bg-(--color-skeleton) px-3">
      <div className="flex items-center justify-between py-3">
        <Skeleton className="w-20 h-6 rounded-md bg-(--color-skeleton-inner)" />
        <Skeleton className="w-5 h-5 rounded-md bg-(--color-skeleton-inner)" />
      </div>

      <div className="flex items-center justify-between py-3">
        <Skeleton className="w-28 h-6 rounded-md bg-(--color-skeleton-inner)" />
        <Skeleton className="w-5 h-5 rounded-md bg-(--color-skeleton-inner)" />
      </div>

      <div className="flex items-center justify-between py-3">
        <Skeleton className="w-20 h-6 rounded-md bg-(--color-skeleton-inner)" />
        <Skeleton className="w-5 h-5 rounded-md bg-(--color-skeleton-inner)" />
      </div>

      <div className="flex items-center justify-between py-3">
        <Skeleton className="w-16 h-6 rounded-md bg-(--color-skeleton-inner)" />
        <Skeleton className="w-5 h-5 rounded-md bg-(--color-skeleton-inner)" />
      </div>

      <div className="flex items-center justify-between py-3">
        <Skeleton className="w-22 h-6 rounded-md bg-(--color-skeleton-inner)" />
        <Skeleton className="w-5 h-5 rounded-md bg-(--color-skeleton-inner)" />
      </div>
    </Skeleton>
  );
};
export default SidebarShopAccordionSkeleton;
