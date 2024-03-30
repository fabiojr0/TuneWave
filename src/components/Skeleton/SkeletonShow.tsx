import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function SkeletonShow() {
  return (
    <section>
      <span className="lg:hidden">
        <SkeletonTheme baseColor="#585555" highlightColor="#444" width={'100%'} height={'100%'}>
          <div className="space-y-4">
            <Skeleton width={'100%'} className="aspect-square" />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </SkeletonTheme>
      </span>
      <span className="max-lg:hidden">
        <SkeletonTheme baseColor="#585555" highlightColor="#444" width={'100%'} height={'100%'}>
          <div className="space-y-4 flex flex-row items-end">
              <Skeleton width={'384px'} className="aspect-square" />
            <div className="w-full px-4">
              <Skeleton height={64} />
              <Skeleton height={16} />
              <Skeleton height={16} />
            </div>
          </div>
        </SkeletonTheme>
      </span>
    </section>
  );
}

export default SkeletonShow;
