const postsApi = axios.create({
    baseURL: 'https://http://localhost:3001/api/',
  });
  
  export const getPostsRequest = async () => {
    const response = await postsApi.get('posts');
    return response.data;
  }
  
  export const deletePostRequest = async (id: number) => {
    const response = await postsApi.delete(`posts/${ id }`);
    return response.data;
  }
  
  export const createPostRequest = async (data: CreatePostRequestInterface) => {
    const response = await postsApi.post(`/posts`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  }
  
  export const updatePostRequest = async (data: UpdatePostRequestInterface) => {
    const response = await postsApi.put(`/posts/${ data.postId }`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  }