import { ring2 } from 'ldrs';

function ActivityIndicator({ color = '#1ED760' }: { color?: string }) {
  ring2.register();

  return <l-ring-2 size="20" stroke="2" stroke-length="0.25" bg-opacity="0.1" speed="0.6" color={color} />;
}

export default ActivityIndicator;
