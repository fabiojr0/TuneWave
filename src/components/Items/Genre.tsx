import {  capitalizeEachWord } from '../../utils/utils';

function Genre({ title, count, maxCount }: { title: string; count: number; maxCount: number; }) {
  const widthPercentage = Math.min(100, (count / maxCount) * 100);

  return (
    <div className="flex flex-col">
      <span className="font-semibold pl-2">{capitalizeEachWord(title)}</span>
      <span
        className="bg-gradient-to-r to-lightGreen from-darkGreen rounded-e h-8 max-w-[80vw]"
        style={{ width: `${widthPercentage}%`}}
      ></span>
    </div>
  );
}

export default Genre;
