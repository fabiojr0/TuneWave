import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function SkeletonDefault({ collum, index }: { collum?: boolean; index?: number }) {
  if (collum) {
    return (
      <SkeletonTheme baseColor="#585555" highlightColor="#444" key={index} width={'100%'} height={'100%'}>
        <div className="flex flex-col w-24">
          <Skeleton className="w-full aspect-square object-cover rounded" />
          <Skeleton />
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <SkeletonTheme baseColor="#585555" highlightColor="#444" key={index} width={'100%'} height={'100%'}>
      <div className="flex items-center pl-4 gap-4 w-full">
        <Skeleton height={64} width={64} />
        <div className="w-full">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
        <Skeleton height={24} width={24} circle />
      </div>
    </SkeletonTheme>
  );
}

export default SkeletonDefault;
