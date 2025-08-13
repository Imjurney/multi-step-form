import { JSX } from 'react';

type SwitchCasesProps<T extends string | number> = {
  value: T;
  cases: Record<T, JSX.Element>;
};

function SwitchCases<T extends string | number>({
  value,
  cases,
}: SwitchCasesProps<T>) {
  return cases[value] ?? null;
}
export default SwitchCases;
