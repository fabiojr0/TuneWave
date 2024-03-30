import { HeartStraight } from '@phosphor-icons/react';
import Tooltip from './Tooltip';

function FollowHeart({
  follow,
  onClick,
  message,
  color,
}: {
  follow: boolean;
  onClick: () => void;
  message: string;
  color?: string;
}) {
  return (
    <Tooltip message={message} color={color}>
      <HeartStraight
        size={24}
        weight={follow ? 'fill' : 'regular'}
        color="#1ED760"
        onClick={onClick}
        className="group-hover:scale-125 transition-all"
      />
    </Tooltip>
  );
}

export default FollowHeart;
