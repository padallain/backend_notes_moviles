import { View, Image, StyleSheet } from "react-native";
import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

const duration = 3700;
const delay1 = 600;
const delay2 = 1100;
const easing = Easing.bezier(0.10, -0.5, 0.25, 1);

export default function Loading({ onFinish }) {
    const sv1 = useSharedValue(0);
    const sv2 = useSharedValue(0);

    React.useEffect(() => {
        sv1.value = withDelay(delay1, withRepeat(withTiming(1, { duration, easing }), -1));
        sv2.value = withDelay(delay2, withRepeat(withTiming(1, { duration, easing }), -1));
        }, []);

    const LoadFlip1 = useAnimatedStyle(() => {
        const flip = sv1.value * 360;
        return {
          transform: [{ rotateY: `${flip}deg` }],
        };
      });
    
      const LoadFlip2 = useAnimatedStyle(() => {
        const flip = sv2.value * 360;
        return {
          transform: [{ rotateY: `${flip}deg` }],
        };
      });

    return (
            <View style = {[styles.view]}>
       {/* <Image source={require("../assets/images/Loading/LoadingBG.png")} style={{position: "absolute", width: "100%", height: "100%"}} />       */}
       <Animated.Image source={require("../assets/images/Loading/JokerShade.png")} style={[styles.Loading1, LoadFlip1]} />
       <Animated.Image source={require("../assets/images/Loading/TakeYourTimeShade.png")} style={[styles.Loading2, LoadFlip2]} />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "#080808",
    },
    Loading1: {
        position: "absolute",
        width: 180,
        height: 180,
        right: 10,
        bottom: 60,
      },
      Loading2: {
        position: "absolute",
        width: 160,
        height: 80,
        right: 15,
        bottom: -5,
      },
});