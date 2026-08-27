"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "./FileUpload";

export default function VideoUploadForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const saveVideo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!videoUrl) {
      setError("Upload a video before publishing.");
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      const response = await fetch("/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, videoUrl, thumbnaiUrl: videoUrl }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to publish the video");
      router.push("/");
      router.refresh();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to publish the video");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={saveVideo} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
      <div>
        <label htmlFor="title" className="text-sm font-semibold text-slate-800">Title</label>
        <input id="title" value={title} onChange={(event) => setTitle(event.target.value)} required maxLength={100} placeholder="Give your video a memorable title" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" />
      </div>
      <div>
        <label htmlFor="description" className="text-sm font-semibold text-slate-800">Description</label>
        <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} required maxLength={500} rows={4} placeholder="Tell viewers what they are about to watch" className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-800">Video file</label>
        <p className="mt-1 text-sm text-slate-500">MP4, MOV, or another video format up to 100 MB.</p>
        <div className="mt-3"><FileUpload onProgress={setProgress} onSuccess={(file) => { if (file.url) { setVideoUrl(file.url); setProgress(100); setError(""); } }} /></div>
        {progress > 0 && <p className="mt-2 text-sm font-medium text-indigo-600">{progress === 100 ? "Upload complete" : `${progress}% uploaded`}</p>}
      </div>
      {error && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
      <button type="submit" disabled={isSaving || !videoUrl} className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none">
        {isSaving ? "Publishing…" : "Publish video"}
      </button>
    </form>
  );
}
