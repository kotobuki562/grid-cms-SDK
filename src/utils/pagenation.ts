import { Pagenation } from "../type";

export const pagenation = <T>({
  contents,
  limit,
  offset,
}: Pagenation & { contents: T[] | any[] }) => {
  const resultContents: T[] | any[] = contents.slice(
    offset * limit,
    offset * limit + limit
  );
  return resultContents;
};
