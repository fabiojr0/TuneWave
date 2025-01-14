import { ring2 } from 'ldrs';
import ActivityIndicator from './ActivityIndicator';
import { ComponentProps } from 'react';
import { tv, VariantProps } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

const buttonStyles = tv({
  base: 'font-semibold transition-all flex items-center justify-center gap-2 min-w-20 min-h-9 whitespace-nowrap',
  variants: {
    color: {
      green: 'bg-darkGreen text-white',
      black: 'hover:text-lightGreen',
      selectedBlack: 'bg-zinc-900 text-lightGreen hover:text-darkGreen',
    },
    format: {
      roundedFull: 'rounded-full p-2',
      rounded: 'rounded-lg py-2 px-4 text-sm',
    },
    hover: {
      scale: 'hover:scale-110',
    },
  },
  defaultVariants: {
    color: 'green',
    format: 'roundedFull',
  },
});

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonStyles> & {
    buttonType?: 'primary' | 'time_range';
    loading?: boolean;
    selected?: boolean;
  };

function Button({ buttonType = 'primary', loading, selected, children, ...props }: ButtonProps) {
  const loadingVariants = {
    primary: '#ffffff',
    time_range: '#1ED760',
  };

  ring2.register();

  const buttonClass = twMerge(
    buttonStyles({
      color: buttonType === 'time_range' ? (selected ? 'selectedBlack' : 'black') : 'green',
      format: buttonType === 'primary' ? 'roundedFull' : 'rounded',
      hover: buttonType === 'time_range' ? undefined : 'scale',
    }),
    selected && 'text-darkGreen'
  );

  return (
    <button {...props} className={buttonClass}>
      {loading ? <ActivityIndicator color={loadingVariants[buttonType || 'primary']} /> : children}
    </button>
  );
}

export default Button;
