import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const getPostById = async (id: string): Promise<Post> => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function useGetPostById(id: string) {
  return useQuery<Post, Error>({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: Boolean(id),
  });
}
