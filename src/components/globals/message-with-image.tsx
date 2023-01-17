import {FBox} from "./fbox";
import {Image, ImageSourcePropType} from "react-native";
import {Button, Text, useTheme} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {colors, RootParamList} from "../../utils/settings";

interface Props {
    imageUrl: ImageSourcePropType;
    title: string;
    buttonText: string;
    navigationPath: keyof RootParamList,
    buttonMode?:"text" | "outlined" | "contained" | "elevated" | "contained-tonal"
    description?:string
}

export const MessageWithImage = (props: Props) => {
    const theme = useTheme()
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>()
    return (
        <FBox style={{flex: 1, paddingHorizontal: 20, alignItems: "center", justifyContent: "center",paddingTop:20}}>
            <FBox style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <FBox style={{paddingVertical: 40}}>
                    <Image source={props.imageUrl}
                           style={{width: 240, height: 260}}/>
                </FBox>
                <Text style={{
                    color: theme.colors.primary,
                    textAlign: "center",
                    fontFamily: "Montserrat_700Bold",
                    fontSize: 24,
                    padding: 20,
                    fontWeight: "700"
                }}>{props.title}</Text>
                {props.description&&(
                    <Text variant={"bodySmall"} style={{color:colors.textSemiDark,padding:40,textAlign:"center"}}>{props.description}</Text>
                )}
            </FBox>
            <FBox style={{minHeight: 120, width: "100%", alignItems: "center", justifyContent: "center"}}>
                <Button theme={{roundness: 1}} mode={props.buttonMode??"contained"} onPress={() => {
                    nav.navigate(props.navigationPath)
                }}>{props.buttonText}</Button>
            </FBox>
        </FBox>
    )
}