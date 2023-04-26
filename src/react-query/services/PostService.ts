import create from './ApiClient';

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export default create<Post>('/posts');
