import { useState } from 'react';
import usePosts from './hooks/usePostsPagination';

const PostList = () => {
    const pageSize = 10;
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const {
        data: posts,
        error,
        isLoading,
    } = usePosts({ userId: selectedUser, page, pageSize });

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
                {posts?.map((post) => (
                    <li key={post.id} className="list-group-item">
                        {post.title}
                    </li>
                ))}
            </ul>
            <div className="button-group my-3">
                <button
                    disabled={page === 1}
                    className="btn btn-primary"
                    onClick={() => setPage((prevState) => prevState - 1)}
                >
                    Previous
                </button>
                <button
                    className="btn btn-primary ms-3"
                    onClick={() => setPage((prevState) => prevState + 1)}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default PostList;
