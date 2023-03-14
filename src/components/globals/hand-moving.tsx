import {Animated, Easing, Image, StyleSheet} from "react-native"
import {ReactNode, useEffect, useRef} from "react";
import {RippleCircle} from "./ripple-circle";

interface HandMovingProps {
    children?: ReactNode;
    duration?: number;
    distance?: number;
    pref?: any;
}

export const HandMoving = ({children, duration, distance}: HandMovingProps) => {
    const position = useRef(new Animated.ValueXY({x: 0, y: -35}))
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
        <>
            <RippleCircle position={"absolute"} maxScale={3}>
                <Animated.View
                    style={{
                        ...styles.cursor,
                        transform: [{translateX: position.current.x}, {translateY: position.current.y}, {rotateX: "20deg"}]
                    }}>
                    <Image source={require("../../../assets/images/cursor-hand-icon.svg")}
                           style={{width: 42, height: 50}}/>
                </Animated.View>
            </RippleCircle>
            {children}
        </>
    )
}
const styles = StyleSheet.create({
    cursor: {
        //@ts-ignore
        position: "relative",
        zIndex: 2
    }
})