import {
  Control,
  FieldValues,
  FieldPath,
  useController,
} from 'react-hook-form';

import { theme } from '@/styles';
import {
  ChangeEventHandler,
  FocusEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

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
  const inputValue = field.value ?? '';
  const [inputType, setInputType] = useState<'text' | 'date'>('text');
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocus: FocusEventHandler<HTMLInputElement> = event => {
    setInputType('date');
    if (typeof event.currentTarget.showPicker === 'function') {
      try {
        event.currentTarget.showPicker();
      } catch {
        console.warn('showPicker is not supported in this browser.');
      }
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    field.onChange(event); // RHF 값 갱신
    setInputType('text');
  };

  useEffect(() => {
    if (
      inputType === 'date' &&
      inputRef.current &&
      typeof inputRef.current.showPicker === 'function'
    ) {
      inputRef.current.showPicker();
    }
  }, [inputType]);

  return (
    <div css={common.flexColumn}>
      {label && (
        <label css={common.inputLabel} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        {...field}
        ref={inputRef}
        value={inputValue}
        type={inputType}
        defaultValue={inputValue}
        placeholder={
          field.name.includes('start')
            ? '시작 날짜를 선택하세요'
            : '종료 날짜를 선택하세요'
        }
        css={common.input}
        disabled={disabled}
        readOnly={inputType === 'text'}
        onClick={() => setInputType('date')}
        onFocus={handleFocus}
        onChange={handleChange}
        aria-required={required}
        min={minDate?.toISOString().split('T')[0]}
        max={maxDate?.toISOString().split('T')[0]}
      />
    </div>
  );
}

export default RHDatePicker;
