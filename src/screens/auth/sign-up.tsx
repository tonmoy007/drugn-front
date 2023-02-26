import {Text} from "react-native-paper";
import {Link, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {colors, RootParamList} from "../../utils/settings";
import {AuthForm} from "../../components/auth/auth-form";
import {useSignupMutation} from "../../api/auth";

export const SignUpScreen = () => {
    const [signUp, {isLoading}] = useSignupMutation()
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const onSubmit = (data) => {
        signUp(data).unwrap().then(res => {
            if (res.error) {
                alert(res.message)
            } else {
                nav.navigate("otp", {redirectUri: "accountComplete", sessionID: res.sessionID})
            }
        }).catch(err => alert(err.status + ':' + err.data.message))

    }
    return (
        <AuthForm submitText={"上記の内容でアカウントを登録する"} extra={
            <Text style={{textAlign: "center", padding: 10}}>既に登録している方はこちら <Link
                style={{fontFamily: "Montserrat_700Bold"}} to={"/sign-in"}><Text
                style={{color: colors.primary}}>ログインする</Text> </Link></Text>
        } submitting={isLoading} onSubmit={onSubmit}/>
    )
}