import { useRouter } from "expo-router";
import { View } from "react-native";
import { useAsyncStorage } from "../hooks/use-async-storage";
import { Slider } from "../components/slider";

const items = [
  {
    id: "1",
    imageUrl:
      "https://images.pexels.com/photos/6723243/pexels-photo-6723243.jpeg",
    title: "Find Your Dream\nDestination With Us",
  },
  {
    id: "2",
    imageUrl:
      "https://images.pexels.com/photos/12931237/pexels-photo-12931237.jpeg",
    title: "Find the best deals\non flights and hotels",
  },
  {
    id: "3",
    imageUrl:
      "https://images.pexels.com/photos/19309707/pexels-photo-19309707.jpeg",
    title: "Find the best deals\non flights and hotels",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [_, setOnboardingCompleted] = useAsyncStorage(
    "onboardingCompleted",
    false,
  );

  const onComplete = () => {
    setOnboardingCompleted(true);
    router.replace("/");
  };

  return (
    <View className="flex-1 bg-[#001645]">
      <Slider items={items} onComplete={onComplete} />
    </View>
  );
}
