import { RegisterOptions, useFormContext } from 'react-hook-form';
import { theme } from '@/styles';
import { css } from '@emotion/react';
const { common } = theme;

interface RHInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  type?: string;
  rules?: RegisterOptions;
}

const RHInput = ({ name, placeholder, type, rules, ...rest }: RHInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors?.[name]?.message as string | undefined;
  return (
    <div css={InputWrapper}>
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
`;

const ErrorStyledInput = css`
  border-color: ${theme.colors.feedback.error};
`;

export default RHInput;
