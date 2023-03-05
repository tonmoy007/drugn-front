import { LinearGradient } from "expo-linear-gradient";
import { DashboardHeader } from "../../components/home/dashboard/dashboard-header";
import { DashboardNft } from "../../components/home/dashboard/dashboard-nft";
import { colors } from "../../utils/settings";

export const NftScreen = ({ navigation }) => {
    return (
        <>
            <LinearGradient style={{ flex: 1, }} colors={[colors.primary2, colors.background]}
                start={{ x: 0.1, y: 0.3 }}
                end={{ x: 0.6, y: 0.5 }} locations={[.1, .6]}>
                <DashboardHeader />
                <DashboardNft hideHeader={true} />
            </LinearGradient>
        </>
    )
}