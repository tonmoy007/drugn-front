import {FBox} from "../../components/globals/fbox";
import {OtpInput} from "../../components/auth/otp-input";
import {Text} from "react-native-paper";

export const OtpScreen = () => {
    return (
        <FBox style={{flex: 1, alignItems: "center", justifyContent: "flex-start", padding: 20}}>
            <FBox style={{flexDirection: "column", paddingTop: 80}}>
                <Text variant={"titleMedium"} style={{marginBottom: 20}}>確認コードの入力</Text>
                <Text variant={"bodySmall"}
                      style={{marginBottom: 50}}>4桁の確認コードをお知らせするテキストメッセージを入力したEmailに送信しました。</Text>

                <FBox style={{marginBottom: 20}}>
                    <OtpInput onChange={(data) => {
                        console.log(data)
                    }} maximumLength={4} setIsPinReady={(ok) => {
                        console.log(ok?"Pin Is ready":"Pin Not Ready")
                    }}/>
                </FBox>
                <Text variant={"bodySmall"}>
                    確認コードが届いていない場合は、コードを再送信することが
                    できます。
                    Emailが間違っている場合は修正してください。
                </Text>
            </FBox>
        </FBox>
    )
}