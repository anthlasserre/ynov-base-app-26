import {
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSearchRecipeWithDebounce } from "../../hooks/use-search-post";
import { Link } from "expo-router";
import { useState } from "react";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("Pizza");
  const { data, refetch, isRefetching } =
    useSearchRecipeWithDebounce(searchQuery);

  return (
    <View className="flex-1 pt-20 px-4 gap-2">
      <Text className="text-black text-2xl font-bold">Search</Text>
      <TextInput
        className="bg-gray-200 rounded-md px-2 py-4"
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => refetch()}
      />
      <FlatList
        data={data}
        contentContainerClassName="gap-4 flex-1"
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => refetch()}
          />
        }
        renderItem={({ item }) => (
          <Link href={`/details/${item.idMeal}`} asChild>
            <TouchableOpacity className="bg-blue-500 px-8 py-4 rounded-md">
              <Text className="text-white text-md font-bold">
                {item.strMeal}
              </Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}
