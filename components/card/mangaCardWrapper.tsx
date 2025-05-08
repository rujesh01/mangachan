"use client";

import { MangaAttributes, MangaRelationship } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MangaCoverImage from "../GLOBAL/MangaCoverImage";
import { Badge } from "../ui/badge";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

type mangaDataProps = {
  id: string;
  attributes: MangaAttributes;
  relationships: MangaRelationship[];
  type: string;
};

type Props = {
  data: mangaDataProps;
};

const MangaCardWrapper = ({ data }: Props) => {
  const coverArt = data.relationships.find((rel) => rel.type === "cover_art");

  const englishAltTitle = data.attributes.altTitles?.find(
    (titleObj) => titleObj.en
  )?.en;

  return (
    <Link href={`/manga/${data.id}`}>
      <Card className="relative  rounded-lg h-[300px] overflow-hidden ">
        <div className="absolute inset-0 z-0">
          {coverArt && (
            <MangaCoverImage mangaId={data.id} coverArt={coverArt} />
          )}
          <div className="absolute inset-0 bg-black/40 z-0 transition-opacity duration-200 ease-in-out hover:bg-black/60" />

          <CardHeader className="absolute top-1 ">
            <div className="flex gap-2">
              <Badge variant={"green"}>{data.attributes.status}</Badge>
              <Badge variant={"destructive"}>{data.type}</Badge>
            </div>
          </CardHeader>
        </div>
        <CardContent className="absolute bottom-0 p-2 w-full bg-slate-800  ">
          <CardTitle className="">
            {englishAltTitle || data.attributes?.title?.en}
          </CardTitle>
          <h6 className="text-xs">
            <span>
              {formatDistanceToNow(new Date(data.attributes.updatedAt), {
                addSuffix: true,
              })}
            </span>
          </h6>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MangaCardWrapper;
