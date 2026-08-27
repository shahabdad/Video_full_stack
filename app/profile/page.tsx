"use client";

import { useSession } from "next-auth/react";
import AppShell from "../components/AppShell";

export default function ProfilePage() { const { data } = useSession(); return <AppShell><main className="page-content"><div className="page-heading"><div><h1>Profile</h1><p>Manage your personal details and workspace identity.</p></div></div><section className="panel" style={{ maxWidth: 680, padding: 24 }}><h2 className="section-title">Account details</h2><p className="section-subtitle">Your account email is used for sign-in and notifications.</p><div className="field"><label>Email address</label><input value={data?.user?.email || ""} readOnly /></div><button className="button button-secondary" style={{ marginTop: 20 }}>Profile editing coming soon</button></section></main></AppShell>; }
