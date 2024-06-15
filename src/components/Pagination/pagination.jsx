import { useEffect, useRef } from "react";
import "./pagination.scss";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";

const posts = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
  { id: 3, title: "post 3" },
  { id: 4, title: "post 4" },
  { id: 5, title: "post 5" },
  { id: 6, title: "post 6" },
];

const fetchPost = async (page) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return posts.slice((page - 1) * 2, page * 2);
};

const Pagination = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["query"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchPost(pageParam);
      return response;
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialData: {
      pages: [posts.slice(0, 2)],
      pageParams: [1], 
    },
  });

  const lastPostRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  const _posts = data?.pages.flatMap((page) => page);

  return (
    <div>
      Posts:{" "}
      {_posts?.map((post, i) => {
        if (i === _posts.length - 1)
          return (
            <div ref={ref} key={post.id}>
              {post.title}
            </div>
          );

          return <div key={post.id}>{post.title}</div>
      })}
      {/* <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
        {isFetchingNextPage
          ? "Loading more..."
          : (data?.pages.length ?? 0) < 3
          ? "Load More"
          : "Nothing more to load"}
      </button> */}
    </div>
  );
};

export default Pagination;
