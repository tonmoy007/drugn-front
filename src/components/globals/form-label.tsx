import {Text} from "react-native-paper";
import {TextProps} from "react-native";

interface Props extends TextProps {
    title: string;
    variant?: "displayLarge" | "displayMedium" | "displaySmall" | "headlineLarge" | "headlineMedium" | "headlineSmall" | "titleLarge" | "titleMedium" | "titleSmall" | "labelLarge" | "labelMedium" | "labelSmall" | "bodyLarge" | "bodyMedium" | "bodySmall" | undefined;
}

export const FormLabel = (props: Props) => {
    return (
        <Text {...props} variant={props.variant ?? "labelLarge"}
              style={props.style ?? {marginBottom: 5}}>{props.title}</Text>
    )
}