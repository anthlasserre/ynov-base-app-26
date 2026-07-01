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
import Animated, { FadeInDown } from "react-native-reanimated";
import { Skeleton } from "../../components/skeleton";

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
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => refetch()}
          />
        }
        contentContainerClassName={`gap-4 p-4 pt-20`}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 80)}>
            <Link href={`/details/${item.id}`} asChild>
              <TouchableOpacity className="bg-blue-500 px-8 py-4 rounded-md">
                <Text className="text-white text-md font-bold">
                  {item.title}
                </Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        )}
        ListEmptyComponent={
          <View className="flex-1 gap-4">
            {new Array(10).fill(0).map((_, index) => (
              <Skeleton className="h-[49px]" key={index} />
            ))}
          </View>
        }
      />
    </View>
  );
}
