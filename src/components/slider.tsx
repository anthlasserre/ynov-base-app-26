import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface SliderItem {
  id: string;
  imageUrl: string;
  title: string;
}

interface SliderProps {
  items: SliderItem[];
  onComplete: () => void;
}

const WINDOW_WIDTH = Dimensions.get("window").width;

export function Slider({ items, onComplete }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setCurrentIndex(
      Math.round(event.nativeEvent.contentOffset.x / WINDOW_WIDTH),
    );
  };

  return (
    <>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        data={items}
        renderItem={({ item, index }) => (
          <View
            key={item.id}
            className="flex-1 w-full h-full"
            style={{ width: WINDOW_WIDTH }}
          >
            <Animated.View
              entering={FadeIn.delay(index * 800)}
              className="absolute top-0 left-0 w-full h-full"
            >
              <Image
                source={{
                  uri: item.imageUrl,
                }}
                className="w-full h-full object-cover"
                resizeMode="cover"
              />
            </Animated.View>
            <LinearGradient
              colors={["rgba(1, 114, 178, 0.2)", "rgba(0, 22, 69, 1)"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 0, y: 1 }}
              style={{
                flexDirection: "column",
                flex: 1,
              }}
            >
              <View className="flex-1 justify-center items-center gap-[40px]">
                <Image
                  source={require("../../assets/logo.png")}
                  className="w-[157px] h-[55px] object-contain"
                />
                <Text className="text-white text-lg text-center font-bold">
                  {item.title}
                </Text>
                {index === items.length - 1 && (
                  <TouchableOpacity onPress={onComplete}>
                    <View className="bg-white px-8 py-4 rounded-md">
                      <Text className="text-black text-lg text-center font-bold">
                        {"Get Started"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </LinearGradient>
          </View>
        )}
      />
      <View className="flex-row pb-8 justify-center items-center gap-4 absolute bottom-0 left-0 right-0">
        {items.map((_, index) => (
          <Animated.View
            entering={FadeIn.duration(1000)}
            exiting={FadeOut.duration(1000)}
            key={`dot-${index}-${currentIndex}`}
            className={`w-2 h-2 rounded-full ${currentIndex === index ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </View>
    </>
  );
}
