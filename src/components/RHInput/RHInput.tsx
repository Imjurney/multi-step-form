import { RegisterOptions, useFormContext } from 'react-hook-form';
import { theme } from '@/styles';
import { css } from '@emotion/react';
const { common } = theme;

interface RHInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  type?: string;
  rules?: RegisterOptions;
  label?: string;
  required?: boolean;
}

const RHInput = ({ name, placeholder, type, rules, ...rest }: RHInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[name]?.message as string | undefined;

  const { label, required } = rest;
  return (
    <div css={InputWrapper}>
      {label && (
        <label css={common.inputLabel} htmlFor={name}>
          {required && <em>(*필수)</em>} {label || placeholder}
        </label>
      )}

      <input
        css={[common.input, error && ErrorStyledInput]}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name, rules)}
        {...rest}
      />
      {error && (
        <span id={`${name}-error`} css={common.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
};

const InputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const ErrorStyledInput = css`
  border-color: ${theme.colors.feedback.error};
`;

export default RHInput;
