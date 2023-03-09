import { FBox } from "./fbox";
import { Text, useTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

export const NftProgress = ({ item, active }) => {
    const theme = useTheme();
    return (<>
        <FBox style={{ flex: 1, margin: 3 }}>
            <Text style={{ fontSize: 12, marginBottom: 2 }}>{item.name}</Text>
            <FBox style={{ width: '100%', height: 8, backgroundColor: theme.colors.surfaceDisabled, borderRadius: 10 }}>
                <LinearGradient
                    colors={active ? ['#1778dc', '#3493f5', '#3493f5', '#60aeff'] : []}
                    style={{ width: `${active ? item.value * 100 : 0}%`, height: 8, borderRadius: 10 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                </LinearGradient>
            </FBox>
        </FBox>
    </>)
}