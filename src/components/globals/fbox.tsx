import { View, ViewProps} from "react-native";
import { Ref} from "react";

export const FBox = (props: ViewProps&{ref?:Ref<any>}) => {
    return (
        <>
            <View {...props} />
        </>
    )
}