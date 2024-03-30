import { HeartStraight } from '@phosphor-icons/react';
import Tooltip from './Tooltip';

function FollowHeart({
  follow,
  onClick,
  message,
  color,
  followers,
}: {
  follow: boolean;
  onClick: () => void;
  message: string;
  color?: string;
  followers?: number;
}) {
  return (
    <Tooltip message={message} color={color}>
      <span className="flex flex-col items-center gap-1">
        <HeartStraight
          size={24}
          weight={follow ? 'fill' : 'regular'}
          color="#1ED760"
          onClick={onClick}
          className="group-hover:scale-125 transition-all"
        />
        {followers && <p className="text-lightGreen text-sm font-medium">{followers}</p>}
      </span>
    </Tooltip>
  );
}

export default FollowHeart;
