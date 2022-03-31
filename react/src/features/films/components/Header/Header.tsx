import { memo, ReactNode, VFC } from 'react';
import { Skeleton } from '@mui/material';
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
      {title != null
        ? <div className={cls.title}>{title !== '' ? title : 'No title'}</div>
        : <Skeleton variant="text" width={240} />}
      <div className={cls.buttons}>
        {buttons}
      </div>
    </div>
    {children}
  </div>
);

export const Header = memo(HeaderComponent);
