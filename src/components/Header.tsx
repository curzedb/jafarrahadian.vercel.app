"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Line, Row, ToggleButton } from "@once-ui-system/core";

import { routes, display, person, about, blog, work, gallery, certificates } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";
import { useLocale } from "@/i18n/client";

import { Home, User, LayoutGrid, ImageIcon, Moon, Sun, Award } from "lucide-react";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const { locale, t } = useLocale();

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.navContent}>

        <div className={`${styles.navSection} ${styles.navLeft}`}>
          <div className={styles.locationTime}>
            {display.time && <TimeDisplay timeZone={person.location} locale={locale === "id" ? "id-ID" : "en-GB"} />}
          </div>
        </div>

        <div className={`${styles.navSection} ${styles.navCenter}`}>
          <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>

            {routes["/"] && (
              <ToggleButton href="/" selected={pathname === "/"}>
                <Home size={16} />
              </ToggleButton>
            )}
            <Line background="neutral-alpha-medium" vert maxHeight="24" />

            {routes["/about"] && (
              <ToggleButton href="/about" selected={pathname === "/about"}>
                <Row as="span" s={{ hide: true }} gap="8" vertical="center">
                  <User size={16} />
                  <span>{t.nav.about}</span>
                </Row>
                <Row as="span" hide s={{ hide: false }} vertical="center">
                  <User size={16} />
                </Row>
              </ToggleButton>
            )}

            {routes["/work"] && (
              <ToggleButton href="/work" selected={pathname.startsWith("/work")}>
                <Row as="span" s={{ hide: true }} gap="8" vertical="center">
                  <LayoutGrid size={16} />
                  <span>{t.nav.projects}</span>
                </Row>
                <Row as="span" hide s={{ hide: false }} vertical="center">
                  <LayoutGrid size={16} />
                </Row>
              </ToggleButton>
            )}

            {routes["/certificates"] && (
              <ToggleButton href="/certificates" selected={pathname.startsWith("/certificates")}>
                <Row as="span" s={{ hide: true }} gap="8" vertical="center">
                  <Award size={16} />
                  <span>{t.nav.certificates}</span>
                </Row>
                <Row as="span" hide s={{ hide: false }} vertical="center">
                  <Award size={16} />
                </Row>
              </ToggleButton>
            )}

            {routes["/gallery"] && (
              <ToggleButton href="/gallery" selected={pathname.startsWith("/gallery")}>
                <Row as="span" s={{ hide: true }} gap="8" vertical="center">
                  <ImageIcon size={16} />
                  <span>{t.nav.gallery}</span>
                </Row>
                <Row as="span" hide s={{ hide: false }} vertical="center">
                  <ImageIcon size={16} />
                </Row>
              </ToggleButton>
            )}

            {display.themeSwitcher && (
              <>
                <Line background="neutral-alpha-medium" vert maxHeight="24" />
                <ThemeToggle />
              </>
            )}
          </Row>
        </div>

        <div className={`${styles.navSection} ${styles.navRight}`}>
          {display.location && <div className={styles.locationTime}>{person.location}</div>}
        </div>

      </div>
    </header>
  );
};
