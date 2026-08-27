"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "../components/AppShell";
import VideoTable, { type VideoRecord } from "../components/VideoTable";

export default function VideosPage() { const [videos, setVideos] = useState<VideoRecord[]>([]); const [loading, setLoading] = useState(true); useEffect(() => { fetch("/video").then((r) => r.ok ? r.json() : []).then(setVideos).finally(() => setLoading(false)); }, []); return <AppShell><main className="page-content"><div className="page-heading"><div><h1>My videos</h1><p>Browse and manage every video in your workspace.</p></div><Link href="/upload" className="button button-primary">Upload video</Link></div><section className="panel"><header className="panel-header"><div><h2 className="section-title">All videos</h2><p className="section-subtitle">{loading ? "Loading library…" : `${videos.length} video${videos.length === 1 ? "" : "s"} in your library`}</p></div></header>{loading ? <div style={{ padding: 40, color: "#78716C" }}>Loading your videos…</div> : <VideoTable videos={videos} />}</section></main></AppShell>; }
