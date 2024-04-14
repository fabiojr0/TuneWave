import { useMemo } from 'react';
import { capitalizeEachWord } from '../../utils/utils';

function Genre({ title, count, maxCount }: { title: string; count: number; maxCount: number }) {
  
  const widthPercentage = useMemo(() => {
    return Math.min(100, (count / maxCount) * 100);
  }, [count, maxCount]);

  return (
    <div className="flex flex-col group">
      <span className="font-semibold pl-2">{capitalizeEachWord(title)}</span>
      <span
        className="bg-gradient-to-r to-lightGreen from-darkGreen shadow-white/50 shadow-inner rounded-e h-8 max-w-[80vw] transition-all"
        style={{ width: `${widthPercentage}%` }}
      ></span>
    </div>
  );
}

export default Genre;
