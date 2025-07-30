/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react-calendar-datetime-picker' {
  import * as React from 'react';

  export interface DtPickerProps {
    onChange: (date: Date | null) => void;
    value: Date | null;
    id?: string;
    [key: string]: any;
  }

  export const DtPicker: React.FC<DtPickerProps>;
}
