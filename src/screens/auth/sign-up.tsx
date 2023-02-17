import {Button, HelperText, Text, TextInput, useTheme} from "react-native-paper";
import {Controller, useForm} from "react-hook-form";
import {FBox} from "../../components/globals/fbox";
import {useState} from "react";
import {Link, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {colors, RootParamList} from "../../utils/settings";
import {FormLabel} from "../../components/globals/form-label";
import {Image} from "react-native";
import {AuthForm} from "../../components/auth/auth-form";
import {SignUp} from "../../services/auth";

export const SignUpScreen = () => {
    const theme = useTheme()
    const [submitting, setSubmitting] = useState(false)
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const onSubmit = (data) => {
        setSubmitting(true)
        SignUp(data).then(res =>{
            if (res.error){
                alert(res.message)
            }else{
                nav.navigate("otp",{redirectUri:"accountComplete",sessionID:res.sessionID})
            }
        }).catch(err => alert(err)).finally(() => setSubmitting(false))

    }
    return (
        <AuthForm submitText={"上記の内容でアカウントを登録する"} extra={
            <Text style={{textAlign: "center", padding: 10}}>既に登録している方はこちら <Link
                style={{fontFamily: "Montserrat_700Bold"}} to={"/sign-in"}><Text
                style={{color: colors.primary}}>ログインする</Text> </Link></Text>
        } submitting={submitting} onSubmit={onSubmit}/>
    )
}