import {Animated, Easing, Image, Platform, StyleSheet} from "react-native"
import {ReactNode, useEffect, useRef} from "react";

interface HandMovingProps {
    children: ReactNode;
    duration?: number;
    distance?: number;
}

export const HandMoving = ({children, duration, distance}: HandMovingProps) => {
    const position = useRef(new Animated.ValueXY({x: 0, y: 0}))
    const animate = () => {
        Animated.loop(Animated.timing(position.current, {
            toValue: {x: distance ?? 20, y: distance ?? 20},
            useNativeDriver: false,
            duration: duration ?? 1000,
            easing: Easing.inOut(Easing.ease)
        })).start()
    }
    useEffect(() => {
        animate()
    }, [])
    return (
        <Animated.View
            style={{
                ...styles.cursor,
                transform: [{translateX: position.current.x}, {translateY: position.current.y}, {rotateX: "45deg"}]
            }}>
            <Image source={require("../../../assets/images/cursor-hand-icon.svg")} style={{width: 40, height: 40}}/>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    cursor: {
        //@ts-ignore
        position: Platform.OS === "web" ? "fixed" : "absolute",
    }
})