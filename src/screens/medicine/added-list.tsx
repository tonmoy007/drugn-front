import { AddedMedicineList } from "../../components/medicine/added-medicine-list";
import { useState } from "react";
import { MessageWithImage } from "../../components/globals/message-with-image";

export const AddedList = ({ route, navigation }) => {
    const [submitted, setSubmitted] = useState(false)
    const { allMeds = {} } = route.params ?? {}

    return (
        <>
            {submitted ? (
                <MessageWithImage description={"お薬の登録が完了しました。\n" +
                    "登録したお薬はホーム画面の\n" +
                    "「薬の編集」か「お薬一覧」から\n" +
                    "閲覧/編集可能です。"} buttonMode={"text"} imageUrl={require("../../../assets/icons/first_nft.svg")} title={"You done!!"} buttonText={"登録完了"}
                    navigationPath={"dashboard"} />
            ) : (
                <AddedMedicineList setSubmitted={setSubmitted} navigation={navigation} medicines={allMeds} />
            )}
        </>
    )
}