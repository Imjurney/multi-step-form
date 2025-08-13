import {
  Control,
  FieldValues,
  FieldPath,
  useController,
} from 'react-hook-form';

import { theme } from '@/styles';

const { common } = theme;

interface RHDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

function RHDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  minDate,
  maxDate,
  disabled = false,
}: RHDatePickerProps<T>) {
  const { field } = useController({
    control,
    name,
    rules: { required },
  });
  return (
    <div css={common.flexColumn}>
      {label && (
        <label css={common.inputLabel} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        {...field}
        type='date'
        css={common.input}
        disabled={disabled}
        aria-required={required}
        min={minDate?.toISOString().split('T')[0]}
        max={maxDate?.toISOString().split('T')[0]}
      />
    </div>
  );
}

export default RHDatePicker;
