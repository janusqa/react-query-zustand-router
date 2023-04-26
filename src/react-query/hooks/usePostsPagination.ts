import { useQuery } from '@tanstack/react-query';
import PostService, { Post } from '../services/PostService';

export interface PostQuery {
    userId: string | undefined;
    page: number;
    pageSize: number;
}

const usePosts = (query: PostQuery) => {
    const fetchEntities = () => {
        const config = {
            params: {
                userId: query.userId,
                _limit: query.pageSize,
                _start: (query.page - 1) * query.pageSize,
            },
        };
        return PostService.getAll(config).request();
    };

    return useQuery<Post[], Error>({
        queryKey: ['posts', query],
        queryFn: fetchEntities,
        staleTime: 1000 * 10, // 10 seconds
        keepPreviousData: true,
    });
};

export default usePosts;
