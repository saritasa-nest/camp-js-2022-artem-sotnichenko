import { Skeleton } from '@mui/material';
import { memo, ReactNode, VFC } from 'react';
import cls from './Header.module.css';

interface Props {
  /** Header title. */
  readonly title?: string;

  /** Slot for buttons. */
  readonly buttons?: ReactNode;

  /** Slot for content under. */
  readonly children?: ReactNode;
}

const HeaderComponent: VFC<Props> = ({ title, buttons = null, children = null }) => (
  <div className={cls.header}>
    <div className={cls.options}>
      {title
        ? <div className={cls.title}>{title}</div>
        : <Skeleton variant="rectangular" width={240} height={20} />}
      <div className={cls.buttons}>
        {buttons}
      </div>
    </div>
    {children}
  </div>
);

export const Header = memo(HeaderComponent);
