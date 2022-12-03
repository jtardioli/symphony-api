import { Release, Track } from "@prisma/client";

export interface IRelease extends Release {
  tracks: Track[];
}
