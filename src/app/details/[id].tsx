import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { useGetPostById } from "../../hooks/use-get-post-by-id";
import { useUpdatePostById } from "../../hooks/use-update-post-by-id";

export default function Details() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { mutate: updatePost, isPending } = useUpdatePostById(id);
  const { data, isLoading, isError, error } = useGetPostById(id);

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Text className="text-black text-2xl font-bold text-center">
        Loading...
      </Text>
    );
  }

  if (isError) {
    return (
      <Text className="text-black text-2xl font-bold text-center">
        Error: {error.message}
      </Text>
    );
  }

  if (!data) {
    return (
      <Text className="text-black text-2xl font-bold text-center">No data</Text>
    );
  }

  return (
    <>
      <Stack.Screen options={{ animation: "slide_from_bottom" }} />
      <View className="flex-1 py-8 justify-center items-center">
        <Text className="text-black text-2xl font-bold text-center">
          {data.title}
        </Text>
        <TouchableOpacity
          onPress={() =>
            updatePost({
              id: data.id,
              title: "Updated Title",
              body: "Updated Body",
              userId: data.userId,
            })
          }
          disabled={isPending}
        >
          <Text className="text-blue-500 text-md font-bold">
            {"Update Post"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBack}>
          <Text className="text-blue-500 text-md font-bold">{"Back"}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
