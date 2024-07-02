import NextImage from "next/image";
import { Image } from "@nextui-org/react";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

type CardProps = {
  id: string;
  episodeId: string;
  image: string;
  title: string;
  overview: string;
  sub: string;
  createdAt: string;
  number: number;
};

export const EpisodeCard = ({
  id,
  episodeId,
  title,
  overview,
  image,
  sub,
  createdAt,
  number,
}: CardProps) => {
  const relativeTime = createdAt === "No date" ? "No Date" : timeAgo(createdAt);

  return (
    <Link href={`/watch/${id}?episodeId=${episodeId}&subType=${sub}`}>
      <motion.div
        className="flex items-start gap-4 group rounded-lg p-4"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative">
          <Image
            as={NextImage}
            src={image}
            alt={title}
            width={448}
            height={224}
            className="aspect-video object-cover rounded-lg min-h-[124px] min-w-[248px] max-h-[124px] max-w-[248px]"
          />
          <span className="absolute z-50 rounded-lg bg-black/75 text-xs text-foreground bottom-2 right-2 px-2 py-1">
            EP {number}
          </span>
        </div>
        <div className="flex-1 grid gap-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium line-clamp-1">{title}</h3>
            <span className="text-xs text-foreground-500">{relativeTime}</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-3">
            {overview}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};
