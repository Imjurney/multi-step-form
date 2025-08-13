import { useFormContext, RegisterOptions } from 'react-hook-form';
import { theme } from '@/styles';
import { css } from '@emotion/react';

const { common, typography, colors } = theme;

interface RHTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
  label?: string;
  required?: boolean;
  maxLength?: number;
}

const RHTextarea = ({
  name,
  placeholder,
  rules,
  label,
  required,
  maxLength = 200,
  ...rest
}: RHTextareaProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name) ?? '';
  const length = value.length;

  const error = errors?.[name]?.message as string | undefined;

  return (
    <div css={TextareaWrapper}>
      {label && (
        <label css={common.inputLabel} htmlFor={name}>
          {required && <em>(*필수)</em>} {label || placeholder}
        </label>
      )}
      <textarea
        id={name}
        css={[common.input, error && ErrorStyledTextarea, TextareaStyle]}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        maxLength={maxLength}
        {...register(name, { ...rules, maxLength })}
        {...rest}
      />
      <div css={CharCountStyle}>
        <span>
          {length} / {maxLength}
        </span>
      </div>
      {error && typeof error === 'string' && error.trim() && (
        <span id={`${name}-error`} css={common.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
};

const TextareaWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const TextareaStyle = css`
  min-height: 96px;
`;

const ErrorStyledTextarea = css`
  border-color: ${colors.feedback.error};
`;

const CharCountStyle = css`
  align-self: flex-end;
  margin-top: 2px;
  color: ${colors.gray[500]};
  ${typography.caption.sm};
`;

export default RHTextarea;
