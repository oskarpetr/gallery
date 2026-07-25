import { StaticImageData } from "next/image";

export type IArtwork =
  | {
      type: "image";
      src: StaticImageData;
      description: string;
      needsBorder?: boolean;
      date: Date;
    }
  | {
      type: "video";
      src: string;
      aspectRatio: number;
      description: string;
      needsBorder?: boolean;
      date: Date;
    };

export interface IDisplayArtwork {
  artwork: IArtwork;
  index: number;
  displayIndex: number;
}
