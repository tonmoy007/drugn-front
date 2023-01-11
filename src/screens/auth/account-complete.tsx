import {MessageWithImage} from "../../components/globals/message-with-image";

export const AccountComplete = (props) => {
    return (
        <MessageWithImage
                          imageUrl={"icons/account_create_success.svg"} title={"Your Account has been created"}
                          buttonText={"お薬を受け取る薬局を指定します"} navigationPath={"storeRegistration"}/>
    )

}