
import type { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoComponent key={video._id?.toString()} video={video} />
      ))}

      {videos.length === 0 && (
        <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/60 py-14 text-center">
          <p className="text-lg font-semibold text-slate-800">No videos yet</p>
          <p className="mt-2 text-slate-500">Be the first creator to publish one.</p>
        </div>
      )}
    </div>
  );
}
