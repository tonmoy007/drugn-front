import {Text} from "react-native-paper"
import {FBox} from "../../components/globals/fbox";
import {DashboardSlider} from "../../components/home/dashboard/dashboard-slider";
import {LinearGradient} from "expo-linear-gradient";
import {colors} from "../../utils/settings";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {DashboardHeader} from "../../components/home/dashboard/dashboard-header";
import {useCallback, useMemo, useRef} from "react";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import {StyleSheet} from "react-native";
import {DashboardActions} from "../../components/home/dashboard/dashboard-actions";
import {DashboardNft} from "../../components/home/dashboard/dashboard-nft";

export const Home = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    return (
        <LinearGradient style={{flex: 1, justifyContent: "space-between"}} colors={[colors.primary2, colors.background]}
                        start={{x: 0.1, y: 0.3}}
                        end={{x: 0.6, y: 0.5}} locations={[.1, .6]}>
            <FBox>
                <DashboardHeader title={"Laura Brooke"} wallet={300}/>
                <DashboardSlider/>
                <DashboardActions/>
            </FBox>
            <DashboardNft/>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});