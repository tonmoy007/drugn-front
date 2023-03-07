import {StyleProp, View, ViewProps, ViewStyle} from "react-native";
import {ReactNode, Ref} from "react";

export const FBox = (props: ViewProps&{ref?:Ref<any>}) => {
    return (
        <>
            <View {...props} />
        </>
    )
}