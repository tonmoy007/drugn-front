import {MessageWithImage} from "../../components/globals/message-with-image";

export const StoreRegistrationSuccess = () => {
    return <MessageWithImage description={"登録した店舗はあなたのアカウント から編集可能です。"} buttonMode={"text"} imageUrl={require("../../../assets/icons/first_nft.svg" )} title={"Your got a first NFT!"} buttonText={"ホーム画面へ"}
                             navigationPath={"dashboard"}/>
}