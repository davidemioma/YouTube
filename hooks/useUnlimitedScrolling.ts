import axios from "axios";
import { useRef } from "react";
import { PostProps } from "@/types";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Props {
  key: string;
  query: string;
  initialData: any;
}

const useUnlimitedScrolling = ({ key, query, initialData }: Props) => {
  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [key],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(`${query}&page=${pageParam}`);

      return data as PostProps[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialData], pageParams: [1] },
    }
  );

  return {
    ref,
    entry,
    data,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useUnlimitedScrolling;
