import Button from './Button';

function TimeRangeButtons({
  chageTimeRange,
  time_range,
  isLoading,
}: {
  chageTimeRange: (time_range: TimeRange) => void;
  time_range: TimeRange;
  isLoading: boolean;
}) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center justify-center gap-4 p-1 rounded-lg bg-zinc-800">
        <Button
          buttonType="time_range"
          onClick={() => chageTimeRange('short_term')}
          loading={time_range === 'short_term' && isLoading}
          selected={time_range === 'short_term'}
        >
          4 Weeks ago
        </Button>
        <Button
          buttonType="time_range"
          onClick={() => chageTimeRange('medium_term')}
          loading={time_range === 'medium_term' && isLoading}
          selected={time_range === 'medium_term'}
        >
          6 Months ago
        </Button>
        <Button
          buttonType="time_range"
          onClick={() => chageTimeRange('long_term')}
          loading={time_range === 'long_term' && isLoading}
          selected={time_range === 'long_term'}
        >
          All time
        </Button>
      </div>
    </div>
  );
}

export default TimeRangeButtons;
