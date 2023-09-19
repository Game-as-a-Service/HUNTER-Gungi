import clsx from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function combine(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}
