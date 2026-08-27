"use client";

import { upload, type UploadResponse } from "@imagekit/next";
import { useRef, useState } from "react";

type Props = { onSuccess: (file: UploadResponse) => void; onProgress?: (progress: number) => void; };
const size = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(bytes > 10 * 1024 * 1024 ? 0 : 1)} MB`;

export default function FileUpload({ onSuccess, onProgress }: Props) {
  const inputRef = useRef<HTMLInputElement>(null); const abortRef = useRef<AbortController | null>(null);
  const [file, setFile] = useState<File | null>(null); const [progress, setProgress] = useState(0); const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error" | "cancelled">("idle"); const [error, setError] = useState(""); const [dragging, setDragging] = useState(false);
  const startUpload = async (selected: File) => {
    if (!selected.type.startsWith("video/")) { setError("Choose a valid video file."); setStatus("error"); return; }
    if (selected.size > 100 * 1024 * 1024) { setError("Video files must be 100 MB or smaller."); setStatus("error"); return; }
    setFile(selected); setError(""); setProgress(0); setStatus("uploading"); const controller = new AbortController(); abortRef.current = controller;
    try {
      const authResponse = await fetch("/api/imagekit-auth"); const auth = await authResponse.json(); if (!authResponse.ok) throw new Error(auth.error || "ImageKit authentication failed");
      const result = await upload({ file: selected, fileName: selected.name, folder: "/vidrivo/videos", publicKey: auth.publicKey, signature: auth.authenticationParameters.signature, expire: auth.authenticationParameters.expire, token: auth.authenticationParameters.token, abortSignal: controller.signal, onProgress: (event) => { if (event.lengthComputable) { const value = Math.round(event.loaded / event.total * 100); setProgress(value); onProgress?.(value); } } });
      if (!result.url) throw new Error("Upload completed without a video URL.");
      setProgress(100); setStatus("success"); onProgress?.(100); onSuccess(result);
    } catch (uploadError) { if (controller.signal.aborted) { setStatus("cancelled"); setError(""); } else { setStatus("error"); setError(uploadError instanceof Error ? uploadError.message : "Upload failed. Please try again."); } } finally { abortRef.current = null; }
  };
  const choose = (selected?: File) => { if (selected) void startUpload(selected); };
  return <div><input ref={inputRef} className="hidden-input" type="file" accept="video/*" onChange={(event) => choose(event.target.files?.[0])} /><div className={`dropzone ${dragging ? "dragging" : ""}`} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); choose(event.dataTransfer.files[0]); }}><div><div className="upload-icon" style={{ margin: "0 auto" }}>↑</div><h2>Drop your video here</h2><p>MP4, MOV, WebM or AVI · Maximum file size 100 MB</p><button type="button" className="button button-secondary" style={{ marginTop: 18 }} onClick={() => inputRef.current?.click()} disabled={status === "uploading"}>Choose video</button></div></div>{file && <div className="selected-file"><div className="file-preview">MP4</div><div className="file-meta"><strong>{file.name}</strong><span>{size(file.size)} · {status === "success" ? "Uploaded successfully" : status === "cancelled" ? "Upload cancelled" : status === "error" ? "Upload failed" : "Uploading"}</span></div>{status === "uploading" && <button type="button" className="button button-danger" onClick={() => abortRef.current?.abort()}>Cancel</button>}{status === "success" && <span className="status">Uploaded</span>}</div>}{status === "uploading" && <div style={{ marginTop: 12 }}><div className="progress-track"><div className="progress-value" style={{ width: `${progress}%` }} /></div><div style={{ display: "flex", justifyContent: "space-between", marginTop: 7, color: "#78716C", fontSize: 12 }}><span>Uploading to ImageKit</span><span>{progress}%</span></div></div>}{error && <p className="form-error">{error}</p>}</div>;
}
