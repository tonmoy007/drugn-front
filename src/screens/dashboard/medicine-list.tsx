import { ScrollView } from "react-native-gesture-handler";
import { DashboardHeader } from "../../components/home/dashboard/dashboard-header";
import { ManageUserMeds } from "../../components/medicine/manage";

export const MedicineListScreen = () => {

    return (
        <>
            <DashboardHeader />
            <ScrollView style={{ flex: 1 }}>
                <ManageUserMeds delMed={false} />
            </ScrollView>
        </>
    )
}