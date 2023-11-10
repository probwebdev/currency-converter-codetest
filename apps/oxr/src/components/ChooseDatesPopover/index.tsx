import * as Popover from '@radix-ui/react-popover';
import { DayPicker, type DayPickerMultipleProps } from 'react-day-picker';

export interface ChooseDatesPopoverProps extends DayPickerMultipleProps {
  label: string;
  selected?: Date[];
  onSelect: (values: Date[] | undefined) => void;
}

export const ChooseDatesPopover = ({
  mode,
  label,
  selected,
  onSelect,
  toDate,
  fromDate,
}: ChooseDatesPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button aria-label="Choose Dates to compare historical rates">
          {label}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded border-2 border-neutral-600 bg-white p-2 shadow-2xl"
          sideOffset={5}
        >
          <DayPicker
            mode={mode}
            selected={selected}
            onSelect={onSelect}
            toDate={toDate}
            fromDate={fromDate}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
