import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts`,
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function useGetPosts() {
  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });
}
