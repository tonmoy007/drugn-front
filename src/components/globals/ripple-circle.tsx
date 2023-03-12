import {Animated, Easing, Platform, StyleSheet} from "react-native"
import {ReactNode, useEffect, useRef} from "react";
import {colors} from "../../utils/settings";

interface RippleProps {
    children?: ReactNode;
    maxScale?: number
    duration?: number
}

export const RippleCircle = ({children, maxScale, duration}: RippleProps) => {
    const scale = useRef(new Animated.Value(1))
    const scale2 = useRef(new Animated.Value(1))
    const opacity = useRef(new Animated.Value(1))
    const opacity2 = useRef(new Animated.Value(1))
    const runAnimation = () => {
        Animated.loop(
            Animated.stagger((duration ?? 1000) / 2, [
                Animated.parallel([
                    Animated.timing(opacity.current, {
                        useNativeDriver: false,
                        toValue: 0,
                        duration: duration ?? 1000
                    }),
                    Animated.timing(scale.current, {
                        useNativeDriver: false,
                        toValue: maxScale ?? 2,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease)
                    })
                ]),
                Animated.parallel([
                    Animated.timing(opacity2.current, {
                        useNativeDriver: false,
                        toValue: 0,
                        duration: duration ?? 1000
                    }),
                    Animated.timing(scale2.current, {
                        useNativeDriver: false,
                        toValue: maxScale ?? 2,
                        duration: duration ?? 1000,
                        easing: Easing.inOut(Easing.ease)
                    })
                ])])
        ).start()

    }
    useEffect(() => {
        runAnimation()
    }, [])
    return (

        <>
            <Animated.View style={{
                ...styles.ripple,
                transform: [{scaleX: scale.current}, {scaleY: scale.current}],
                opacity: opacity.current
            }}/>
            <Animated.View style={{
                ...styles.ripple,
                transform: [{scaleX: scale2.current}, {scaleY: scale2.current}],
                opacity: opacity2.current
            }}/>
            {children}
        </>
    )
}

const styles = StyleSheet.create({
    ripple: {
        borderWidth: 1,
        borderColor: colors.primary,
        width: 30,
        height: 30,
        // @ts-ignore
        position: Platform.OS === "web" ? "fixed" : "relative",
        borderRadius: 20,
    }
})