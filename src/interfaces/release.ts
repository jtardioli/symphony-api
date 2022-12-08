import { Genre, Release as DBRelease, Track } from "@prisma/client";

export interface Release extends DBRelease {
  tracks: Track[];
  genres: Genre[];
}
