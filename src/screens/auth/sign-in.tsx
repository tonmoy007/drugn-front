import {FBox} from "../../components/globals/fbox";
import {AuthForm} from "../../components/auth/auth-form";
import {useState} from "react";
import {Link, useNavigation} from "@react-navigation/native";
import {Text} from "react-native-paper";
import {colors, RootParamList} from "../../utils/settings";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export const SignInScreen = () => {
    const [submitting, setSubmitting] = useState(false)
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const handleSubmit = (data) => {
        setSubmitting(true)
        nav.navigate("otp", {redirectUri: 'dashboard'})
    }

    return (
        <>
            <AuthForm submitText={"ログイン"} onSubmit={handleSubmit} submitting={submitting} extra={(
                <Text style={{textAlign: "center", padding: 10}}>アカウントをお持ちですか？ <Link
                    style={{fontFamily: "Montserrat_700Bold"}} to={"/sign-up"}><Text
                    style={{color: colors.primary}}>サインアップ</Text></Link></Text>
            )
            }
            />
        </>
    )
}