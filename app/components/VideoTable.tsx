"use client";

import { useState } from "react";

export type VideoRecord = { _id?: string; title: string; description: string; videoUrl: string; createdAt?: string; updatedAt?: string; };
const formatDate = (value?: string) => value ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value)) : "—";

export default function VideoTable({ videos, compact = false }: { videos: VideoRecord[]; compact?: boolean }) {
  const [message, setMessage] = useState("");
  const copyUrl = async (url: string) => { await navigator.clipboard.writeText(url); setMessage("Video URL copied to clipboard."); setTimeout(() => setMessage(""), 2500); };
  if (!videos.length) return <div style={{ padding: 40, textAlign: "center", color: "#78716C", fontSize: 14 }}>No videos have been uploaded yet.</div>;
  return <div className="table-wrap"><table className="video-table"><thead><tr><th>Video</th>{!compact && <th>Size</th>}<th>Uploaded</th><th>Status</th><th aria-label="Actions" /></tr></thead><tbody>{videos.slice(0, compact ? 5 : undefined).map((video) => <tr key={video._id || video.videoUrl}><td><div className="video-name"><span className="video-thumb">VIDEO</span><span>{video.title}</span></div></td>{!compact && <td>Stored in ImageKit</td>}<td>{formatDate(video.createdAt)}</td><td><span className="status">Ready</span></td><td><button className="action-menu" title="Copy video URL" aria-label={`Copy URL for ${video.title}`} onClick={() => copyUrl(video.videoUrl)}>⋯</button></td></tr>)}</tbody></table>{message && <p className="form-success" style={{ padding: "0 20px 16px" }}>{message}</p>}</div>;
}
