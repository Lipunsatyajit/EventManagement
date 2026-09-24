"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/site-content";
import { clearAuthSession, readAuthSession, type AuthSession } from "@/lib/auth-session";
import { LogoutButton } from "@/app/_components/logout-button";
import styles from "./site-header.module.css";
import { useOverlayKeyboard } from "@/app/_components/use-overlay-keyboard";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [customerMenuOpen, setCustomerMenuOpen] = useState(false);
  const customerMenuRef = useRef<HTMLDivElement | null>(null);
  useOverlayKeyboard("mobile-navigation", menuOpen, () => setMenuOpen(false), true);
  useOverlayKeyboard("customer-account-menu", customerMenuOpen, () => setCustomerMenuOpen(false));

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
      document.body.style.overflow = "";
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!customerMenuRef.current) {
        return;
      }

      if (!customerMenuRef.current.contains(event.target as Node)) {
        setCustomerMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleToggleMenu() {
    setMenuOpen((current) => !current);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={closeMenu}>
          <Image
            src="/images/utkaleventslogo.svg"
            alt="Utkal Events"
            width={168}
            height={74}
            priority
            className={styles.logo}
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          {navigationItems.map((item) => (
            <Link key={item.label} href={item.href} className={styles.desktopNavLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {session?.role === "customer" ? (
            <div className={styles.customerMenu} ref={customerMenuRef}>
              <button
                type="button"
                className={styles.customerMenuButton}
                aria-expanded={customerMenuOpen}
                aria-controls="customer-account-menu"
                aria-label={`Open customer menu${session.displayName ? ` for ${session.displayName}` : ""}`}
                onClick={() => setCustomerMenuOpen((current) => !current)}
              >
                <AccountIcon />
                <ChevronDownIcon open={customerMenuOpen} />
              </button>

              <div
                id="customer-account-menu"
                className={`${styles.customerMenuDropdown} ${
                  customerMenuOpen ? styles.customerMenuDropdownOpen : ""
                }`}
              >
                <div className={styles.customerMenuItem}>{session.displayName ?? "Customer"}</div>
                <Link
                  href="/customer/account"
                  className={styles.customerMenuItem}
                  onClick={() => setCustomerMenuOpen(false)}
                >
                  <AccountIcon />
                  <span>My account</span>
                </Link>
                <Link
                  href="/customer/bookings"
                  className={styles.customerMenuItem}
                  onClick={() => setCustomerMenuOpen(false)}
                >
                  <BagIcon />
                  <span>My bookings</span>
                </Link>
                <Link href="/customer/planning" className={styles.customerMenuItem} onClick={() => setCustomerMenuOpen(false)}>Checklist & budget</Link>
                <Link
                  href="/customer/profile"
                  className={styles.customerMenuItem}
                  onClick={() => setCustomerMenuOpen(false)}
                >
                  <ProfileIcon />
                  <span>Profile</span>
                </Link>
                <button
                  type="button"
                  className={styles.customerLogoutItem}
                  onClick={() => {
                    clearAuthSession();
                    window.location.assign("/");
                  }}
                >
                  <LogoutMenuIcon />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : session ? (
            <LogoutButton compact />
          ) : (
            <>
              <Link
                href="/login?role=customer"
                className={`${styles.actionLink} ${styles.secondaryAction}`}
              >
                Login
              </Link>
              <Link href="/planners" className={`${styles.actionLink} ${styles.secondaryAction}`}>
                Explore planners
              </Link>
            </>
          )}
          <Link href="/#contact" className={`${styles.actionLink} ${styles.primaryAction}`}>
            Book consultation
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={handleToggleMenu}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <button
        type="button"
        className={`${styles.drawerBackdrop} ${menuOpen ? styles.drawerBackdropOpen : ""}`}
        aria-label="Close menu overlay"
        tabIndex={-1}
        onClick={closeMenu}
      />

      <aside
        id="mobile-navigation"
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className={styles.drawerHeader}>
          <Link href="/" className={styles.drawerBrand} onClick={closeMenu}>
            <Image
              src="/images/utkaleventslogo.svg"
              alt="Utkal Events"
              width={156}
              height={68}
              className={styles.logo}
            />
          </Link>

          <button
            type="button"
            className={styles.drawerClose}
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <CloseIcon />
          </button>
        </div>

        <div className={styles.drawerContent}>
          <nav className={styles.drawerNav} aria-label="Mobile primary">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={styles.drawerNavLink}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.drawerActions}>
            {session?.role === "customer" ? (
              <>
                <Link
                  href="/customer/account"
                  className={`${styles.actionLink} ${styles.drawerSecondaryAction}`}
                  onClick={closeMenu}
                >
                  My account
                </Link>
                <Link
                  href="/customer/bookings"
                  className={`${styles.actionLink} ${styles.drawerSecondaryAction}`}
                  onClick={closeMenu}
                >
                  My bookings
                </Link>
                <Link
                  href="/customer/profile"
                  className={`${styles.actionLink} ${styles.drawerSecondaryAction}`}
                  onClick={closeMenu}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  className={`${styles.actionLink} ${styles.drawerSecondaryAction} ${styles.drawerLogoutButton}`}
                  onClick={() => {
                    clearAuthSession();
                    window.location.assign("/");
                  }}
                >
                  Logout
                </button>
              </>
            ) : session ? (
              <LogoutButton className={styles.drawerLogout} label="Logout" />
            ) : (
              <>
                <Link
                  href="/login?role=customer"
                  className={`${styles.actionLink} ${styles.drawerSecondaryAction}`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  href="/planners"
                  className={`${styles.actionLink} ${styles.drawerSecondaryAction}`}
                  onClick={closeMenu}
                >
                  Explore planners
                </Link>
              </>
            )}

            <Link
              href="/#contact"
              className={`${styles.actionLink} ${styles.drawerPrimaryAction}`}
              onClick={closeMenu}
            >
              Book consultation
            </Link>
          </div>
        </div>
      </aside>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={styles.menuIcon}
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
      className={styles.menuIcon}
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

function AccountIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={styles.customerMenuIcon}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`${styles.customerChevronIcon} ${open ? styles.chevronIconOpen : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={styles.customerMenuIcon}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={styles.customerMenuIcon}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 21a8 8 0 0 1 16 0" />
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
    </svg>
  );
}

function LogoutMenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={styles.customerMenuIcon}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      <path d="M10 16l4-4-4-4" />
      <path d="M14 12H4" />
    </svg>
  );
}
