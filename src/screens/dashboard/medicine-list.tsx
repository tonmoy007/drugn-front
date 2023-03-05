import { DashboardHeader } from "../../components/home/dashboard/dashboard-header";
import { ManageUserMeds } from "../../components/medicine/manage";

export const MedicineListScreen = () => {

    return (
        <>
            <DashboardHeader />
            <ManageUserMeds delMed={false} />
        </>
    )
}