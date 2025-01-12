'use client';

export type TSelectField<T = string> = {
  type: 'select';
  title: string;
  description: string;
  options: T[];
};

export type TBooleanField = {
  type: 'boolean';
  title: string;
  description: string;
  // children?: Record<string, TBooleanField | TSelectField>
};

export const fields = {
  isBoardMoreObvious: {
    type: 'boolean',
    title: 'Make board more obvious',
    description:
      'Add extra spacing and borders to the board scroll container to make it easier to see and play with',
  },
  isFPSPanelEnabled: {
    type: 'boolean',
    title: 'FPS Panel',
    description: 'Display a panel with Frame Per Second (FPS) information',
  },
  isCPUBurnEnabled: {
    type: 'boolean',
    title: 'Drop FPS 🔥',
    description: 'Start heavy process that will cause the frame rate on the page to drop',
  },
  isOverElementAutoScrollEnabled: {
    type: 'boolean',
    title: 'Over element auto scrolling',
    description: 'Should elements automatically scroll when over them',
  },
  isOverflowScrollingEnabled: {
    type: 'boolean',
    title: 'Overflow scrolling',
    description: 'Should overflow scrolling be enabled',
  },
  boardScrollSpeed: {
    type: 'select',
    title: 'Board auto scroll speed',
    description: 'What should the max horizontal scroll speed the board be?',
    options: ['fast', 'standard'],
  },
  columnScrollSpeed: {
    type: 'select',
    title: 'Column auto scroll speed',
    description: 'What should the max vertical scroll speed for columns be?',
    options: ['fast', 'standard'],
  },
} as const satisfies Record<string, TBooleanField | TSelectField>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TupleToUnion<T extends any[]> = T[number];

type GetFieldValues<TRecord extends Record<string, TBooleanField | TSelectField>> = {
  // [TKey in keyof TRecord]: TRecord[TKey] extends TBooleanField ? boolean : TRecord[TKey] extends TSelectField ? 'fast' | 'standard' : never
  [TKey in keyof TRecord]: TRecord[TKey] extends TBooleanField
    ? boolean
    : TRecord[TKey] extends TSelectField
      ? TupleToUnion<TRecord[TKey]['options']>
      : never;
};

export type TFields = typeof fields;

export type TSettings = GetFieldValues<TFields>;
