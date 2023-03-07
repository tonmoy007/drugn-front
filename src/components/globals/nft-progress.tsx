import { FBox } from "./fbox";
import { ProgressBar, Text, useTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

export const NftProgress = ({ item, active }) => {
    const theme = useTheme();
    console.log(item)
    const barColors = {
        'Efficiency': theme.colors.scrim,
        'Luck': theme.colors.primary,
        'Comfort': '#FF0080',
        'Resilience': '#8a00c2'
    }
    return (<>
        <FBox style={{ flex: 1, margin: 3 }}>
            <Text style={{ fontSize: 12, marginBottom: 2 }}>{item.name}</Text>
            <FBox style={{ width: '100%', height: 8, backgroundColor: theme.colors.surfaceDisabled, borderRadius: 10 }}>
                <LinearGradient
                    colors={active ? ['red', 'yellow', 'green', '#3493f5', 'blue', 'purple'] : []}
                    style={{ width: `${active ? item.value * 100 : 0}%`, height: 8, borderRadius: 10 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                </LinearGradient>
            </FBox>

            {/* <ProgressBar style={{ height: 5, borderRadius: 20 }} progress={active ? item.value : 0}
                color={active ? barColors[item.name] : theme.colors.onBackground} /> */}
        </FBox>
    </>)
}