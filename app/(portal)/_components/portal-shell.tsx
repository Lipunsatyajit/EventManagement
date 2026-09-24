"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getPortalRoleLabel, portalNavigation } from "@/lib/portal-navigation";
import { type AuthRoleKey } from "@/lib/auth-directory";
import { clearAuthSession, readAuthSession, type AuthSession } from "@/lib/auth-session";
import styles from "./portal-shell.module.css";
import { useOverlayKeyboard } from "@/app/_components/use-overlay-keyboard";

type PortalShellProps = {
  roleLabel: string;
  title: string;
  description: string;
  children: React.ReactNode;
  backHref: string;
  backLabel: string;
};

export function PortalShell({
  roleLabel,
  title,
  description,
  children,
  backHref,
  backLabel,
}: PortalShellProps) {
  const pathname = usePathname();
  const role = useMemo(() => inferRole(roleLabel), [roleLabel]);
  const navGroups = portalNavigation[role];
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  useOverlayKeyboard("portal-mobile-drawer", menuOpen, () => setMenuOpen(false), true);
  useOverlayKeyboard("portal-user-menu", userMenuOpen, () => setUserMenuOpen(false));

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const syncSession = () => {
      setSession(readAuthSession());
    };

    syncSession();
    window.addEventListener("focus", syncSession);
    window.addEventListener("storage", syncSession);

    return () => {
      window.removeEventListener("focus", syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!userMenuRef.current) {
        return;
      }

      if (!userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showSidebar = role !== "customer" && navGroups.length > 0;

  return (
    <main className={styles.shell}>
      <div
        className={`${styles.frame} ${showSidebar ? styles.frameWithSidebar : styles.frameSingle}`}
      >
        {showSidebar ? (
          <aside className={styles.sidebar} aria-label={`${getPortalRoleLabel(role)} navigation`}>
            <div className={styles.sidebarInner}>
              <div className={styles.sidebarBrand}>
                <Image
                  src="/icon.svg"
                  alt="Utkal Events"
                  width={42}
                  height={42}
                  className={styles.sidebarLogo}
                />
                <div className={styles.sidebarBrandText}>
                  <div className={styles.sidebarBrandTitle}>Utkal Events</div>
                  <div className={styles.sidebarBrandSubtitle}>{getPortalRoleLabel(role)}</div>
                </div>
              </div>

              {navGroups.map((group) => (
                <div key={group.title} className={styles.sidebarSection}>
                  <div className={styles.sidebarSectionTitle}>{group.title}</div>
                  <nav className={styles.sidebarNav}>
                    {group.items.map((item) => {
                      const active = isActivePath(pathname, item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`${styles.sidebarLink} ${active ? styles.sidebarLinkActive : ""}`}
                        >
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}

              <div className={styles.sidebarFooter}>
                <div className={styles.sidebarFooterText}>
                  Role-based navigation for planner and super admin screens.
                </div>
              </div>
            </div>
          </aside>
        ) : null}

        <div className={styles.content}>
          <div className={styles.topbar}>
            <div className={styles.topbarTitle}>
              <div className={styles.topbarEyebrow}>{roleLabel}</div>
              <h1 className={styles.topbarHeading}>{title}</h1>
              <p className={styles.topbarDescription}>{description}</p>
            </div>

            <div className={styles.topbarActions}>
              <Link href={backHref} className={styles.backButton}>
                {backLabel}
              </Link>
              {showSidebar ? (
                <button
                  type="button"
                  className={styles.menuButton}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  aria-controls="portal-mobile-drawer"
                  onClick={() => setMenuOpen((current) => !current)}
                >
                  <MenuIcon />
                </button>
              ) : null}
              {session ? (
                <div className={styles.userMenu} ref={userMenuRef}>
                  <button
                    type="button"
                    className={styles.userMenuButton}
                    aria-expanded={userMenuOpen}
                    aria-controls="portal-user-menu"
                    aria-label={`Open user menu${session.displayName ? ` for ${session.displayName}` : ""}`}
                    onClick={() => setUserMenuOpen((current) => !current)}
                  >
                    <UserIcon />
                    <span className={styles.userMenuName}>
                      {session.displayName ?? getPortalRoleLabel(role)}
                    </span>
                    <ChevronDownIcon open={userMenuOpen} />
                  </button>

                  <div
                    id="portal-user-menu"
                    className={`${styles.userMenuDropdown} ${
                      userMenuOpen ? styles.userMenuDropdownOpen : ""
                    }`}
                  >
                    {getUserMenuItems(role).map((item) =>
                      item.href ? (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={styles.userMenuItem}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      ) : (
                        <button
                          key={item.label}
                          type="button"
                          className={styles.userMenuItem}
                          onClick={() => {
                            setUserMenuOpen(false);
                            clearAuthSession();
                            window.location.assign("/");
                          }}
                        >
                          <item.icon />
                          <span>{item.label}</span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {showSidebar ? (
            <>
              <button
                type="button"
                className={`${styles.mobileBackdrop} ${menuOpen ? styles.mobileBackdropOpen : ""}`}
                aria-label="Close navigation overlay"
                tabIndex={-1}
                onClick={() => setMenuOpen(false)}
              />

              <aside
                id="portal-mobile-drawer"
                className={`${styles.mobileDrawer} ${menuOpen ? styles.mobileDrawerOpen : ""}`}
                aria-hidden={!menuOpen}
                inert={!menuOpen}
              >
                <div className={styles.mobileDrawerHeader}>
                  <div className={styles.sidebarBrand}>
                    <Image
                      src="/icon.svg"
                      alt="Utkal Events"
                      width={42}
                      height={42}
                      className={styles.sidebarLogo}
                    />
                    <div className={styles.sidebarBrandText}>
                      <div className={styles.sidebarBrandTitle}>Utkal Events</div>
                      <div className={styles.sidebarBrandSubtitle}>
                        {getPortalRoleLabel(role)}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.menuButton}
                    aria-label="Close menu"
                    onClick={() => setMenuOpen(false)}
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className={styles.mobileDrawerBody}>
                  {session ? (
                    <div className={styles.mobileUserCard}>
                      <div className={styles.mobileUserIcon}>
                        <UserIcon />
                      </div>
                      <div className={styles.mobileUserMeta}>
                        <div className={styles.mobileUserName}>
                          {session.displayName ?? getPortalRoleLabel(role)}
                        </div>
                        <div className={styles.mobileUserRole}>{getPortalRoleLabel(role)}</div>
                      </div>
                    </div>
                  ) : null}

                  {navGroups.map((group) => (
                    <div key={group.title}>
                      <div className={styles.sidebarSectionTitle}>{group.title}</div>
                      <nav className={styles.mobileDrawerNav}>
                        {group.items.map((item) => {
                          const active = isActivePath(pathname, item.href);
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`${styles.mobileDrawerLink} ${
                                active ? styles.mobileDrawerLinkActive : ""
                              }`}
                              onClick={() => setMenuOpen(false)}
                            >
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                      </nav>
                    </div>
                  ))}

                  <div className={styles.mobileDrawerFooter}>
                    <button
                      type="button"
                      className={styles.mobileLogout}
                      onClick={() => {
                        clearAuthSession();
                        window.location.assign("/");
                      }}
                    >
                      <LogoutIcon />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </aside>
            </>
          ) : null}

          <div className={styles.page}>{children}</div>
        </div>
      </div>
    </main>
  );
}

function inferRole(roleLabel: string): AuthRoleKey {
  const normalized = roleLabel.toLowerCase();

  if (normalized.includes("admin")) {
    return "admin";
  }

  if (normalized.includes("planner")) {
    return "planner";
  }

  return "customer";
}

function isActivePath(currentPath: string, href: string) {
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={open ? styles.chevronOpen : ""}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21a8 8 0 1 0-16 0" />
      <path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.05.05a2.2 2.2 0 1 1-3.11 3.11l-.05-.05a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.09 1.65V21a2.2 2.2 0 0 1-4.4 0v-.12a1.8 1.8 0 0 0-1.09-1.65 1.8 1.8 0 0 0-1.98.36l-.05.05a2.2 2.2 0 1 1-3.11-3.11l.05-.05a1.8 1.8 0 0 0 .36-1.98 1.8 1.8 0 0 0-1.65-1.09H3a2.2 2.2 0 0 1 0-4.4h.12a1.8 1.8 0 0 0 1.65-1.09 1.8 1.8 0 0 0-.36-1.98l-.05-.05A2.2 2.2 0 1 1 7.47 3.3l.05.05A1.8 1.8 0 0 0 9.5 3.71h.08A1.8 1.8 0 0 0 10.67 2.6V2.5a2.2 2.2 0 0 1 4.4 0v.12a1.8 1.8 0 0 0 1.09 1.65 1.8 1.8 0 0 0 1.98-.36l.05-.05a2.2 2.2 0 1 1 3.11 3.11l-.05.05a1.8 1.8 0 0 0-.36 1.98v.08A1.8 1.8 0 0 0 22 10.67H22.1a2.2 2.2 0 0 1 0 4.4H22a1.8 1.8 0 0 0-1.65 1.09Z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      <path d="M10 16l4-4-4-4" />
      <path d="M14 12H4" />
    </svg>
  );
}

type UserMenuItem = {
  label: string;
  href?: string;
  icon: () => React.ReactElement;
};

function getUserMenuItems(role: AuthRoleKey): UserMenuItem[] {
  if (role === "planner") {
    return [
      { label: "Dashboard", href: "/planner/dashboard", icon: UserIcon },
      { label: "Profile", href: "/planner/profile", icon: UserIcon },
      { label: "Settings", href: "/planner/settings", icon: SettingsIcon },
      { label: "Logout", icon: LogoutIcon },
    ];
  }

  if (role === "admin") {
    return [
      { label: "Dashboard", href: "/admin/dashboard", icon: UserIcon },
      { label: "Reports", href: "/admin/reports", icon: BagIcon },
      { label: "Settings", href: "/admin/settings", icon: SettingsIcon },
      { label: "Logout", icon: LogoutIcon },
    ];
  }

  return [
    { label: "My account", href: "/customer/account", icon: UserIcon },
    { label: "My bookings", href: "/customer/bookings", icon: BagIcon },
    { label: "Checklist & budget", href: "/customer/planning", icon: BagIcon },
    { label: "Profile", href: "/customer/profile", icon: UserIcon },
    { label: "Logout", icon: LogoutIcon },
  ];
}
