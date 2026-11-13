import clsx from "clsx";

import { navigation } from "../../data/navigation";
import { Icon } from "../Icon";
import s from "./Sidebar.module.scss";

export type SidebarProps = { className?: string };

export const Sidebar = (props: SidebarProps) => {
  const { className } = props;
  return (
    <aside className={clsx(s.sidebar, className)}>
      <div className={s.sidebarBrand}>
        <span className={s.sidebarLogo}>
          <Icon name="logo" />
        </span>
        <span className={s.sidebarWordmark}>
          runforge<span>®</span>
        </span>
      </div>
      <nav className={s.sidebarNavigation} aria-label="Workspace">
        <p className={s.sidebarLabel}>Workspace</p>
        <ul>
          {navigation.map(({ label, icon }) => (
            <li key={label}>
              <a
                className={clsx(s.sidebarLink, label === "Runs" && s.active)}
                aria-current={label === "Runs" ? "page" : undefined}
                aria-disabled={label !== "Runs" ? true : undefined}
                tabIndex={0}
                title={label}
                href="/"
              >
                <Icon name={icon} />
                <span className={s.sidebarLinkLabel}>{label}</span>
                {label === "Runs" && <span className={s.sidebarCount}>6</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={s.sidebarBottom}>
        <a
          className={s.sidebarLink}
          aria-disabled="true"
          tabIndex={0}
          title="Settings"
          href="/"
        >
          <Icon name="settings" />
          <span className={s.sidebarLinkLabel}>Settings</span>
        </a>
        <div className={s.sidebarFooter}>
          <span className={s.sidebarSystemDot} /> Workspace online
          <span>v0.1</span>
        </div>
      </div>
    </aside>
  );
};
