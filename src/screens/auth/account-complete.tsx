import { MessageWithImage } from "../../components/globals/message-with-image";

export const AccountComplete = (props) => {
    return (
        <MessageWithImage
            imageUrl={require("../../../assets/icons/account_create_success.svg")} title={"Your Account has been created"}
            buttonText={"次はWalletを作りましょう"} navigationPath={"wallet"}  />
    )

}