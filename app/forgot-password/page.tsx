"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() { const [email, setEmail] = useState(""); const [sent, setSent] = useState(false); const submit = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); }; return <main className="auth-page"><section className="auth-card"><Link className="brand" href="/"><span className="brand-mark">▶</span>Vidrivo</Link><h1 className="auth-title">Reset your password</h1><p className="auth-subtitle">Enter your email and we’ll send reset instructions if an account exists.</p><form onSubmit={submit}><div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" /></div>{sent && <p className="form-success" role="status">If an account exists for that email, reset instructions are on their way.</p>}<button className="button button-primary full-button">Send reset instructions</button></form><p className="form-note"><Link href="/login" className="text-link">Back to sign in</Link></p></section></main>; }
