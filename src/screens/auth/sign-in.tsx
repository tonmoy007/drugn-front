import { AuthForm } from "../../components/auth/auth-form";
import { useState } from "react";
import { Link, useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";
import { colors, RootParamList } from "../../utils/settings";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SignIn } from "../../services/auth";

export const SignInScreen = () => {
    const [submitting, setSubmitting] = useState(false)
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const handleSubmit = (data) => {
        setSubmitting(true)
        SignIn(data).then(res => {
            if (res.error) {
                alert(res.message)
            } else {
                nav.navigate("otp", {redirectUri: 'dashboard', sessionID: res.sessionID})
            }
        }).catch(err => {
            alert(err)
        }).finally(() => setSubmitting(false))

    }

    return (
        <>
            <AuthForm submitText={"ログイン"} onSubmit={handleSubmit} submitting={submitting} extra={(
                <Text style={{ textAlign: "center", padding: 10 }}>アカウントをお持ちですか？ <Link
                    style={{ fontFamily: "Montserrat_700Bold" }} to={"/signup"}><Text
                        style={{ color: colors.primary }}>サインアップ</Text></Link></Text>
            )
            }
            />
        </>
    )
}