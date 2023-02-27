import {AuthForm} from "../../components/auth/auth-form";
import {Link, useNavigation} from "@react-navigation/native";
import {Text} from "react-native-paper";
import {colors, RootParamList} from "../../utils/settings";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useLoginMutation} from "../../api/auth";

export const SignInScreen = () => {
    const [login, {isLoading}] = useLoginMutation()
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const handleSubmit = async (data) => {
        login({...data}).unwrap().then(res => {
            if (res.error) return alert(res.message)
            nav.navigate("otp", {redirectUri: 'dashboard', sessionID: res.sessionID})
        }).catch(err => {
            alert(err.data?.message??"Server Error Response")
        })

    }

    return (
        <>
            <AuthForm submitText={"ログイン"} onSubmit={handleSubmit} submitting={isLoading} extra={(
                <Text style={{textAlign: "center", padding: 10}}>アカウントをお持ちですか？ <Link
                    style={{fontFamily: "Montserrat_700Bold"}} to={"/signup"}><Text
                    style={{color: colors.primary}}>サインアップ</Text></Link></Text>
            )
            }
            />
        </>
    )
}