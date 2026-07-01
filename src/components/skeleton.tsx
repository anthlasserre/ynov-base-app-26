import { useEffect } from "react";
import Animated, {
  interpolateColor,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";

interface SkeletonProps {
  className?: string;
  colors?: [string, string];
}

export function Skeleton({
  className,
  colors = ["#E1E1E1", "#F0F0F0"],
}: SkeletonProps) {
  const animatedProps = useSharedValue(0);

  useEffect(() => {
    animatedProps.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true,
    );
  }, []);

  const styles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(animatedProps.value, [0, 1], colors),
    };
  });
  return (
    <Animated.View
      className={`bg-gray-200 rounded-md p-4 ${className}`}
      style={styles}
    />
  );
}
