import clsx from "clsx";

import { Icon } from "../Icon";
import s from "./Header.module.scss";

export type HeaderProps = { className?: string };

export const Header = (props: HeaderProps) => {
  const { className } = props;

  return (
    <header className={clsx(s.header, className)}>
      <span className={s.headerMobileLogo} role="img" aria-label="Runforge">
        <Icon name="logo" />
      </span>
      <div className={s.headerProject}>
        <span>Project</span>
        <span className={s.headerSeparator}>/</span>
        <strong>web-platform</strong>
      </div>
      <span className={s.headerAvatar} role="img" aria-label="User Alex Morgan">
        AM
      </span>
    </header>
  );
};
