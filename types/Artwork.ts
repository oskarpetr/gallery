export interface IArtwork {
  src: any;
  description: string;
  isVideo?: boolean;
  needsBorder?: boolean;
}

export interface IDisplayArtwork {
  artwork: IArtwork;
  index: number;
  displayIndex: number;
}
