import { ScrollView } from "react-native-gesture-handler";
import { DashboardHeader } from "../../components/home/dashboard/dashboard-header";
import { ManageUserMeds } from "../../components/medicine/manage";
import {Background} from "../../components/globals/background";
import {colors} from "../../utils/settings";

export const MedicineListScreen = () => {

    return (
        <Background colors={[colors.primary2,colors.background]}>
            <DashboardHeader />
            <ScrollView style={{ flex: 1 }}>
                <ManageUserMeds delMed={false} history={false} />
            </ScrollView>
        </Background>
    )
}