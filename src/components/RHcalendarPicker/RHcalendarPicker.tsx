import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { theme } from '@/styles';
import { css } from '@emotion/react';

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
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 4px;
            width: fit-content;
          `}
        >
          {label && (
            <label css={common.inputLabel} htmlFor={name}>
              {label}
            </label>
          )}
          <ReactDatePicker
            css={common.input}
            id={name}
            selected={
              field.value
                ? typeof field.value === 'string'
                  ? new Date(field.value)
                  : field.value
                : null
            }
            onChange={date => {
              field.onChange(date ? date.toISOString().split('T')[0] : null);
            }}
            onBlur={field.onBlur}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            dateFormat='yyyy-MM-dd'
            placeholderText='날짜를 선택하세요'
          />
        </div>
      )}
    />
  );
}

export default RHDatePicker;
