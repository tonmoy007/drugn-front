import { MessageWithImage } from "../../components/globals/message-with-image";
import {WhatIsWallet} from "../../components/account/what-is-wallet";

export const AccountComplete = () => {
    return (
        <MessageWithImage
            imageUrl={require("../../../assets/icons/account_create_success.svg")} title={"Your Account has been created"}
            buttonText={"次はWalletを作りましょう"} navigationPath={"wallet"} bottomExtra={<WhatIsWallet/>}  />
    )

}