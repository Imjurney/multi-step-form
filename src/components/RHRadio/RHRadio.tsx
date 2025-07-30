import { useFormContext, RegisterOptions } from 'react-hook-form';
import { theme } from '@/styles';
import { css } from '@emotion/react';

const { colors, typography } = theme;

interface RHRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  label?: string;
  rules?: RegisterOptions;
  required?: boolean;
}

const RHRadio = ({
  name,
  value,
  label,
  rules,

  ...rest
}: RHRadioProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[name]?.message as string | undefined;
  const inputId = `${name}-${value}`;

  return (
    <div css={RadioWrapper}>
      <input
        id={inputId}
        type='radio'
        value={value}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name, rules)}
        {...rest}
        css={[RadioInput, error && ErrorStyledRadio]}
      />
      {label && (
        <label htmlFor={inputId} css={typography.content.sm}>
          {label}
        </label>
      )}
    </div>
  );
};

const RadioWrapper = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RadioInput = css`
  accent-color: ${colors.primary[500]};
  width: 18px;
  height: 18px;
  margin: 0;
`;

const ErrorStyledRadio = css`
  outline: 2px solid ${colors.feedback.error};
`;

export default RHRadio;
