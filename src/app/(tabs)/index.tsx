import { Link, useFocusEffect, useRouter } from "expo-router";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAsyncStorage } from "../../hooks/use-async-storage";
import { useCallback } from "react";
import { useGetPosts } from "../../hooks/use-get-posts";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function App() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [onboardingCompleted, _, onboardingCompletedLoading] = useAsyncStorage(
    "onboardingCompleted",
    false,
  );

  const { data, refetch, isRefetching } = useGetPosts();

  useFocusEffect(
    useCallback(() => {
      if (!onboardingCompleted && !onboardingCompletedLoading) {
        router.replace("/onboarding");
      }
    }, [onboardingCompleted, onboardingCompletedLoading]),
  );

  return (
    <View className="flex-1 bg-red-500" style={{ paddingTop: insets.top }}>
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => refetch()}
          />
        }
        className="bg-red-500"
        contentContainerClassName={`gap-4 p-4 pt-20`}
        renderItem={({ item }) => (
          <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity className="bg-blue-500 px-8 py-4 rounded-md">
              <Text className="text-white text-md font-bold">{item.title}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}
