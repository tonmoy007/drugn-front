import {FBox} from "../../components/globals/fbox";
import {OtpInput} from "../../components/auth/otp-input";
import {ActivityIndicator, Text} from "react-native-paper";
import {useCallback, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootParamList} from "../../utils/settings";
import {ConfirmCode} from "../../services/auth";
import {setNewUser} from "../../utils/store/user";
import {useDispatch} from "react-redux";
import {useConfirmCodeMutation} from "../../api/auth";

export const OtpScreen = ({route}) => {
    const sessionID = route.params.sessionID
    const [otp, setOtp] = useState<string>("")
    const dispatch = useDispatch();
    const [confirmCode, {isLoading}] = useConfirmCodeMutation()
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const onPinReady = useCallback((status) => {
        if (status) {
            confirmCode({code: otp, sessionID}).unwrap().then(res => {
                if (!res.error) {
                    dispatch(setNewUser({...res, new: route.params.redirectUri === "accountComplete"}))
                    if (route.params.redirectUri !== "dashboard") {
                        nav.navigate("dashboard", {redirectUri: route.params.redirectUri})
                    } else {
                        nav.navigate(route.params.redirectUri)
                    }
                } else
                    alert(res.message)
            }).catch(err => {
                alert(err.status + ' : ' + err.data?.message ?? err.message);
            })
        }
    }, [otp])
    return (
        <FBox style={{flex: 1, alignItems: "center", justifyContent: "flex-start", padding: 20}}>
            <FBox style={{flexDirection: "column", paddingTop: 80, maxWidth: 600, alignItems: "center"}}>
                <Text variant={"titleMedium"} style={{marginBottom: 20}}>確認コードの入力</Text>
                <Text variant={"bodySmall"}
                      style={{marginBottom: 50}}>4桁の確認コードをお知らせするテキストメッセージを入力したEmailに送信しました。</Text>

                <FBox style={{marginBottom: 20, width: "100%"}}>
                    <OtpInput code={otp} setCode={setOtp} maximumLength={4} setIsPinReady={onPinReady}/>
                </FBox>
                <Text variant={"bodySmall"}>
                    確認コードが届いていない場合は、コードを再送信することが
                    できます。
                    Emailが間違っている場合は修正してください。
                </Text>
                {isLoading && <ActivityIndicator/>}
            </FBox>
        </FBox>
    )
}