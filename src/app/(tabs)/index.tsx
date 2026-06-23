import { Link, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 py-8 justify-center items-center gap-4">
      <Text className="text-black text-2xl font-bold">Home</Text>
      <Link href="/details" asChild>
        <TouchableOpacity className="bg-blue-500 px-8 py-4 rounded-md">
          <Text className="text-white text-md font-bold">{"Details"}</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
