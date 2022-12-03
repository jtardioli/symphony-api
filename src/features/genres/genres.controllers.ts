import { Request, Response } from "express";
import { prisma } from "../../config/prisma.config";

/* 
  Returns all generes with their corresponding number of deployed releases
*/
export const handleGetGenres = async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;
    const take = Number(req.query.take);
    const page = Number(req.query.page);

    const skip = (page - 1) * take;

    const genresWithReleaseCount = await prisma.genre.findMany({
      select: {
        name: true,
        id: true,
        _count: { select: { releases: { where: { isDeployed: true } } } },
      },
      where: {
        name: { startsWith: query, mode: "insensitive" },
      },
      orderBy: [{ releases: { _count: "asc" } }, { name: "asc" }],
      take: take,
      skip: skip,
    });

    const genres = genresWithReleaseCount.map((genre) => {
      const { id, name, _count } = genre;
      return { id, name, releaseCount: _count.releases };
    });

    res.send(genres);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
