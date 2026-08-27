"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;
const iconProps = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.8, viewBox: "0 0 24 24" };
const Home = (props: IconProps) => <svg {...iconProps} {...props}><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><path d="M9 21v-8h6v8" /></svg>;
const Video = (props: IconProps) => <svg {...iconProps} {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9 5 3-5 3z" /></svg>;
const Upload = (props: IconProps) => <svg {...iconProps} {...props}><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M5 20h14" /></svg>;
const UserRound = (props: IconProps) => <svg {...iconProps} {...props}><circle cx="12" cy="8" r="3" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>;
const Settings = (props: IconProps) => <svg {...iconProps} {...props}><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.4 1.4-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.4-1.4.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H7v-2h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.4-1.4.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h2v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.4 1.4-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v2h-.2a1.7 1.7 0 0 0-1.6 1Z" /></svg>;
const CircleHelp = (props: IconProps) => <svg {...iconProps} {...props}><circle cx="12" cy="12" r="9" /><path d="M9.7 9a2.4 2.4 0 1 1 4 1.8c-1 .7-1.7 1.2-1.7 2.7" /><path d="M12 17h.01" /></svg>;
const LogOut = (props: IconProps) => <svg {...iconProps} {...props}><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /><path d="M21 19V5a2 2 0 0 0-2-2h-5" /></svg>;
const Play = (props: IconProps) => <svg {...iconProps} {...props}><path d="m9 7 7 5-7 5z" /></svg>;

const items = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/videos", label: "My Videos", icon: Video },
  { href: "/upload", label: "Upload Video", icon: Upload },
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); const router = useRouter(); const { data: session } = useSession();
  const initial = session?.user?.email?.slice(0, 1).toUpperCase() || "U";
  return <div className="app-shell"><aside className="sidebar"><Link className="brand" href="/"><span className="brand-mark"><Play aria-hidden /></span>Vidrivo</Link><nav className="sidebar-nav" aria-label="Main navigation">{items.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`nav-link ${pathname === href ? "active" : ""}`}><Icon aria-hidden />{label}</Link>)}</nav><div className="sidebar-bottom"><Link href="/settings" className="nav-link"><CircleHelp aria-hidden />Help & support</Link><button className="nav-link logout" onClick={() => signOut({ callbackUrl: "/login" })}><LogOut aria-hidden />Logout</button></div></aside><div className="app-main"><header className="topbar"><span className="topbar-label">Media workspace</span><button className="avatar" aria-label="Open profile" onClick={() => router.push("/profile")}>{initial}</button></header>{children}</div></div>;
}
