import {LinearGradient} from "expo-linear-gradient";
import { ReactNode} from "react";
import {ViewStyle} from "react-native";
interface BackgroundProp{
    children:ReactNode;
    colors:string[];
    style?:ViewStyle

}
export const Background=({children,colors,style}:BackgroundProp)=>{
    return (
        <LinearGradient style={{flex: 1, justifyContent: "space-between",...style}} colors={colors}
                        start={{x: 0.1, y: 0.3}}
                        end={{x: 0.6, y: 0.5}} locations={[.1, .6]}>
            {children}
        </LinearGradient>
    )
}