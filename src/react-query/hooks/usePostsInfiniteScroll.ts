import { useInfiniteQuery } from '@tanstack/react-query';
import PostService, { type Post } from '../services/PostService';

export interface PostQuery {
    userId: string | undefined;
    pageSize: number;
}

const usePosts = (query: PostQuery) => {
    const fetchEntities = (pageParam: number) => {
        const config = {
            params: {
                userId: query.userId,
                _limit: query.pageSize,
                _start: (pageParam - 1) * query.pageSize,
            },
        };
        return PostService.getAll(config).request();
    };

    return useInfiniteQuery<Post[], Error>({
        queryKey: ['posts', query],
        queryFn: ({ pageParam = 1 }) => fetchEntities(pageParam),
        staleTime: 1000 * 10, // 10 seconds
        keepPreviousData: true,
        getNextPageParam: (lastPage, allPages) => {
            // this parameter calculates the next page for infinite query
            // the calculation depends on how the backend is implemented
            // last page is a Post[] and allpages is a Post[][]
            // for jsonplaceholder if we have reached the last page
            // the next fetch will return an empty array so we know we
            // are at end of data.  Since  allPages holds the data for
            // all pages it means we just add 1 to the length of allPages
            // to get the next page.
            // when we hit load more button this funtion is called
            // and passed to the qyery function as "pageParam"
            // destructure it there.
            return lastPage.length > 0 ? allPages.length + 1 : undefined;
        },
    });
};

export default usePosts;
