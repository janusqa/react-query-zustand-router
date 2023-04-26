import { useState } from 'react';
import usePosts from './hooks/usePostsInfiniteScroll';
import React from 'react';

const PostList = () => {
    const pageSize = 10;
    const [selectedUser, setSelectedUser] = useState<string>('');
    // with infinite query no need to keep state of
    // where we are at in the pagination. It is done automatially for us.
    // const [page, setPage] = useState<number>(0);
    const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
        usePosts({ userId: selectedUser, pageSize });

    if (error) return <p>{error.message}</p>;

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <select
                onChange={(e) => setSelectedUser(e.target.value)}
                className="form-select mb-3"
                value={selectedUser}
            >
                <option value=""></option>
                <option value="1">User 1</option>
                <option value="2">User 2</option>
                <option value="3">User 3</option>
            </select>
            <ul className="list-group">
                {data.pages.map((page, index) => (
                    <React.Fragment key={index}>
                        {page.map((post) => (
                            <li key={post.id} className="list-group-item">
                                {post.title}
                            </li>
                        ))}
                    </React.Fragment>
                ))}
            </ul>
            <div className="button-group my-3">
                <button
                    disabled={isFetchingNextPage}
                    className="btn btn-primary ms-3"
                    onClick={() => fetchNextPage()}
                >
                    {isFetchingNextPage ? 'Loading...' : 'Load More'}
                </button>
            </div>
        </>
    );
};

export default PostList;
