import { Video } from "@imagekit/next";
import Link from "next/link";
import type { IVideo } from "@/models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200">
      <figure className="relative p-3 pb-0">
        <Link href={`/videos/${video._id}`} className="relative group w-full">
          <div
            className="relative w-full overflow-hidden rounded-xl bg-slate-950"
            style={{ aspectRatio: "16 / 9" }}
          >
            <Video
              src={video.videoUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video.controls}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </figure>

      <div className="p-5">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="text-lg font-bold text-slate-950">{video.title}</h2>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
          {video.description}
        </p>
      </div>
    </article>
  );
}
