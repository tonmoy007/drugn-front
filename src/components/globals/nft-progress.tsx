import { FBox } from "./fbox";
import { ProgressBar, Text, useTheme } from "react-native-paper";

export const NftProgress = ({ item, active }) => {
    const theme = useTheme();
    const barColors = {
        'Efficiency': theme.colors.scrim,
        'Luck': theme.colors.primary,
        'Comfort': '#FF0080',
        'Resilience': '#8a00c2'
    }
    return (<>
        <FBox style={{ flex: 1, margin: 5 }}>
            <Text style={{ fontSize: 12, marginBottom: 2 }}>{item.name}</Text>
            <ProgressBar style={{ height: 5, borderRadius: 20 }} progress={active ? item.value : 0}
                color={active ? barColors[item.name] : theme.colors.onBackground} />
        </FBox>
    </>)
}
