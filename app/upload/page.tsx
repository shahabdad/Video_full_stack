import AppShell from "../components/AppShell";
import VideoUploadForm from "../components/VideoUploadForm";

export default function UploadPage() { return <AppShell><main className="page-content"><div className="page-heading"><div><h1>Upload video</h1><p>Add a video to your workspace and publish it when it is ready.</p></div></div><VideoUploadForm /></main></AppShell>; }
