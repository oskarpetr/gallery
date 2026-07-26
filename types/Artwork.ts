import { StaticImageData } from "next/image";

export type IArtwork = (
  | {
      type: "image";
      src: StaticImageData;
    }
  | {
      type: "video";
      src: string;
      aspectRatio: number;
    }
) & {
  title: string;
  description: string;
  needsBorder?: boolean;
  date: Date;
};

export interface IDisplayArtwork {
  artwork: IArtwork;
  index: number;
  displayIndex: number;
}
