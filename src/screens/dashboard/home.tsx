import {FBox} from "../../components/globals/fbox";
import {DashboardSlider} from "../../components/home/dashboard/dashboard-slider";
import {LinearGradient} from "expo-linear-gradient";
import {colors} from "../../utils/settings";
import {DashboardHeader} from "../../components/home/dashboard/dashboard-header";
import {ScrollView, StyleSheet} from "react-native";
import {DashboardActions} from "../../components/home/dashboard/dashboard-actions";
import {DashboardNftHealth} from "../../components/home/dashboard/dashboard-nft-health";
import {useSelector} from "react-redux";
import {GlobalState} from "../../utils/store/global";

export const Home = () => {

    const user = useSelector((state: GlobalState) => state.user)
    console.log(user)
    return (
        <LinearGradient style={{flex: 1, justifyContent: "space-between"}} colors={[colors.primary2, colors.background]}
                        start={{x: 0.1, y: 0.3}}
                        end={{x: 0.6, y: 0.5}} locations={[.1, .6]}>
            <DashboardHeader/>
            <ScrollView style={{flex: 1}}>
                <DashboardNftHealth userID={user.id}/>
                <DashboardSlider id={user.id}/>
                <DashboardActions/>
            </ScrollView>
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