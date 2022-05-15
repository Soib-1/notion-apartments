import Link from 'next/link';
import { ReactNode } from 'react';
import * as S from './selection-box.styles';

export const SelectionBox = ({
  children,
  href,
}: {
  children: ReactNode | ReactNode[];
  href: string;
}) => (
  <Link href={href}>
    <S.SelectionBox>{children}</S.SelectionBox>
  </Link>
);
