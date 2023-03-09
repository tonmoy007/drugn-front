import { ScrollView } from "react-native-gesture-handler"
import { DashboardHeader } from "../../components/home/dashboard/dashboard-header"
import { ManageUserMeds } from "../../components/medicine/manage"

export const MedicineHistory = () => {

    return (
        <>
            {/* <DashboardHeader /> */}
            <ScrollView style={{ flex: 1 }}>
                <ManageUserMeds delMed={false} history={true} />
            </ScrollView>
        </>
    )
}