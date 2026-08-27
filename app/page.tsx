"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AppShell from "./components/AppShell";
import VideoTable, { type VideoRecord } from "./components/VideoTable";

export default function DashboardPage() {
  const [videos, setVideos] = useState<VideoRecord[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { fetch("/video").then((response) => { if (!response.ok) throw new Error(); return response.json(); }).then(setVideos).catch(() => setError("We could not load your video library. Please try again.")).finally(() => setLoading(false)); }, []);
  const uploadedThisMonth = useMemo(() => videos.filter((video) => video.createdAt && new Date(video.createdAt).getMonth() === new Date().getMonth()).length, [videos]);
  return <AppShell><main className="page-content"><div className="page-heading"><div><h1>Dashboard</h1><p>Manage uploads, monitor your library, and publish new videos.</p></div><Link href="/upload" className="button button-primary">Upload video</Link></div><section className="stats-grid" aria-label="Video overview"><div className="stat-card"><span className="stat-label">Videos in library</span><strong className="stat-value">{loading ? "—" : videos.length}</strong><span className="stat-detail">All videos in your workspace</span></div><div className="stat-card"><span className="stat-label">Uploaded this month</span><strong className="stat-value">{loading ? "—" : uploadedThisMonth}</strong><span className="stat-detail">Based on upload date</span></div><div className="stat-card"><span className="stat-label">Storage provider</span><strong className="stat-value" style={{ fontSize: 20 }}>ImageKit</strong><span className="stat-detail">Cloud delivery is configured</span></div></section>{error && <p className="form-error">{error}</p>}<section className="panel"><header className="panel-header"><div><h2 className="section-title">Recent videos</h2><p className="section-subtitle">Your most recently uploaded media</p></div><Link href="/videos" className="text-link" style={{ fontSize: 13 }}>View all</Link></header>{loading ? <div style={{ padding: 40, color: "#78716C", fontSize: 14 }}>Loading your videos…</div> : <VideoTable videos={videos} compact />}</section></main></AppShell>;
}
