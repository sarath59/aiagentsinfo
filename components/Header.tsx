import Link from "next/link";
import { SearchIcon } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import { SubmitToolButton } from "@/components/SubmitToolButton";
import { audiences } from "@/lib/site";
import { freeTools, toolCategories } from "@/lib/tools-catalog";

type NavLink = { href: string; label: string };
type NavGroup = { label?: string; links: readonly NavLink[] };
type NavMenu = { id: string; label: string; align?: "end"; wide?: boolean; groups: readonly NavGroup[] };

const researchMenu: NavMenu = {
  id: "research",
  label: "Research",
  groups: [
    {
      links: [
        { href: "/research", label: "Research" },
        { href: "/reports", label: "Reports" },
        { href: "/papers", label: "Papers" },
        { href: "/blog", label: "Blog" },
        { href: "/trackers", label: "Trackers" },
        { href: "/verified-revenue", label: "Verified revenue" },
      ],
    },
  ],
};

const toolsMenu: NavMenu = {
  id: "free-tools",
  label: "Free tools",
  align: "end",
  wide: true,
  groups: [
    ...toolCategories.map((category) => ({
      label: category,
      links: freeTools
        .filter((tool) => tool.category === category)
        .map((tool) => ({ href: tool.href, label: tool.title })),
    })),
    { links: [{ href: "/tools", label: "All free tools" }] },
  ],
};

const guidesMenu: NavMenu = {
  id: "guides",
  label: "Guides",
  align: "end",
  groups: [
    {
      links: [
        { href: "/glossary", label: "Glossary" },
        { href: "/topics", label: "Topics" },
        { href: "/best", label: "Best AI agents" },
      ],
    },
    {
      label: "Audiences",
      links: audiences.map((audience) => ({ href: audience.href, label: audience.title })),
    },
    { links: [{ href: "/mcp", label: "MCP" }] },
  ],
};

const menus = [researchMenu, toolsMenu, guidesMenu] as const;

const headerScript = `
(function () {
  if (window.__aaiHeader) return;
  window.__aaiHeader = true;
  var header = document.querySelector("header[data-site-header]");
  if (!header) return;

  function openMenus() {
    return Array.prototype.slice.call(header.querySelectorAll("details[open]"));
  }

  function closeMenus(except) {
    openMenus().forEach(function (details) {
      if (details === except) return;
      details.open = false;
      labelMenu(details);
    });
  }

  function labelMenu(details) {
    var summary = details.querySelector("summary");
    if (!summary || !summary.hasAttribute("data-menu-toggle")) return;
    summary.setAttribute("aria-label", details.open ? "Close menu" : "Open menu");
  }

  header.querySelectorAll("details").forEach(function (details) {
    var summary = details.querySelector("summary");
    if (summary) {
      summary.addEventListener("click", function () {
        var willOpen = !details.open;
        if (willOpen) closeMenus(details);
        if (summary.hasAttribute("data-menu-toggle")) {
          summary.setAttribute("aria-label", willOpen ? "Close menu" : "Open menu");
        }
      });
    }
    details.addEventListener("toggle", function () {
      labelMenu(details);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    var open = openMenus();
    if (!open.length) return;
    var active = document.activeElement;
    var current = open[open.length - 1];
    for (var i = 0; i < open.length; i++) {
      if (open[i].contains(active)) current = open[i];
    }
    event.preventDefault();
    closeMenus();
    var summary = current.querySelector("summary");
    if (summary) summary.focus();
  });

  document.addEventListener("pointerdown", function (event) {
    var target = event.target;
    openMenus().forEach(function (details) {
      if (!details.contains(target)) details.open = false;
    });
  });

  header.addEventListener("click", function (event) {
    var target = event.target;
    if (target && target.closest && target.closest("a")) closeMenus();
  });

  function onScroll() {
    header.toggleAttribute("data-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
})();
`;

function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" className="nav-chevron" aria-hidden="true">
      <path
        d="M3.5 6.2 L8 10.4 L12.5 6.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 20 20" className="menu-icon-open" aria-hidden="true">
      <path d="M3.5 5.5h13M3.5 10h13M3.5 14.5h13" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" className="menu-icon-close" aria-hidden="true">
      <path d="M5.2 5.2 L14.8 14.8M14.8 5.2 L5.2 14.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function NavGroups({ groups, linkClass }: { groups: readonly NavGroup[]; linkClass: string }) {
  return groups.map((group) => (
    <div key={group.label ?? group.links[0]?.href} className="nav-group">
      {group.label ? <p className="menu-label">{group.label}</p> : null}
      <ul>
        {group.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ));
}

function DesktopMenu({ menu }: { menu: NavMenu }) {
  return (
    <details className="nav-disclosure" data-align={menu.align} data-wide={menu.wide ? "" : undefined}>
      <summary className="nav-link focus-ring" aria-controls={`${menu.id}-menu`}>
        {menu.label}
        <ChevronIcon />
      </summary>
      <div id={`${menu.id}-menu`} className="menu-panel">
        <NavGroups groups={menu.groups} linkClass="menu-link focus-ring" />
      </div>
    </details>
  );
}

export function Header() {
  return (
    <header className="site-header" data-site-header>
      <div className="site-header-bar">
        <Link href="/" className="site-logo focus-ring" aria-label="AI Agents Info home">
          <Logo />
        </Link>
        <nav aria-label="Primary" className="primary-nav">
          <Link href="/directory" className="nav-link focus-ring">
            Directory
          </Link>
          {menus.map((menu) => (
            <DesktopMenu key={menu.id} menu={menu} />
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/search" className="icon-button focus-ring" aria-label="Search">
            <SearchIcon className="search-icon" />
          </Link>
          <div className="header-cta">
            <SubmitToolButton size="nav" />
          </div>
          <details className="mobile-disclosure">
            <summary className="icon-button focus-ring" aria-controls="mobile-menu" data-menu-toggle aria-label="Open menu">
              <MenuIcon />
              <CloseIcon />
            </summary>
            <nav id="mobile-menu" aria-label="Mobile" className="mobile-panel">
              <div className="mobile-cta">
                <SubmitToolButton className="w-full" />
              </div>
              <div className="nav-group">
                <ul>
                  <li>
                    <Link href="/directory" className="mobile-link focus-ring">
                      Directory
                    </Link>
                  </li>
                </ul>
              </div>
              {menus.map((menu) => (
                <section key={menu.id} aria-labelledby={`mobile-${menu.id}`} className="mobile-section">
                  <p id={`mobile-${menu.id}`} className="menu-label">
                    {menu.label}
                  </p>
                  <NavGroups groups={menu.groups} linkClass="mobile-link focus-ring" />
                </section>
              ))}
              <div className="nav-group">
                <ul>
                  <li>
                    <Link href="/search" className="mobile-link focus-ring">
                      Search
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </details>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: headerScript }} />
    </header>
  );
}
