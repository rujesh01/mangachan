"use client";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MangaCoverImage from "../GLOBAL/MangaCoverImage";
import { Manga } from "@/types/types";

type Props = {
  data: Manga;
};

const MangaCardWrapper = ({ data }: Props) => {
  const { id, attributes, relationships } = data;

  const coverArt = relationships.find((rel) => rel.type === "cover_art");
  const title =
    attributes.altTitles?.find((alt) => alt.en)?.en ||
    attributes.title?.en ||
    "Untitled";

  const updatedAgo = formatDistanceToNow(new Date(attributes.updatedAt), {
    addSuffix: true,
  });

  return (
    <Link href={`/manga/${id}`} className="group block">
      <Card className="relative h-[440px] overflow-hidden rounded-xl border border-slate-700 bg-slate-950 text-white shadow-xl transition-transform duration-200 group-hover:scale-[1.02]">
        {/* Background Cover with Overlay */}
        {coverArt && (
          <div className="absolute inset-0 z-0">
            <MangaCoverImage mangaId={id} coverArt={coverArt} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          </div>
        )}

        {/* Bottom Content */}
        <CardContent className="absolute bottom-0 z-10 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 backdrop-blur-md space-y-2">
          <CardTitle className="text-lg font-semibold leading-tight line-clamp-2">
            {title}
          </CardTitle>
          {/* Status & Rating Badges */}

          <div className="flex gap-2 font-bold">
            {attributes.status && (
              <Badge className="text-xs font-medium px-2 py-1 bg-emerald-600/80 backdrop-blur-sm text-white shadow-md">
                {attributes.status}
              </Badge>
            )}
            {attributes.contentRating && (
              <Badge className="text-xs font-medium px-2 py-1 bg-red-600/90 text-white shadow-md">
                {attributes.contentRating}
              </Badge>
            )}
          </div>

          {/* Tags */}
          {attributes.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {attributes.tags.slice(0, 6).map((tag, i) => (
                <Badge
                  key={i}
                  className="text-[10px] font-medium bg-slate-800 text-slate-200 border border-slate-600 px-2 py-0.5"
                >
                  {tag.attributes.name.en}
                </Badge>
              ))}
            </div>
          )}

          {/* Updated Time */}
          <p className="text-xs text-right text-slate-300">
            Updated {updatedAgo}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MangaCardWrapper;
