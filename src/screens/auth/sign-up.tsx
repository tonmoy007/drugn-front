import {Button, HelperText, Text, TextInput, useTheme} from "react-native-paper";
import {Controller, useForm} from "react-hook-form";
import {FBox} from "../../components/globals/fbox";
import {useState} from "react";
import {Link, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {colors, RootParamList} from "../../utils/settings";
import {FormLabel} from "../../components/globals/form-label";
import {Image} from "react-native";

export const SignUpScreen = () => {
    const theme = useTheme()
    const [submitting, setSubmitting] = useState(false)
    type FormData = {
        name: string,
        email: string
    }
    const {
        handleSubmit,
        control,
        formState: {errors, isValid},
    } = useForm<FormData>({mode: "onBlur", defaultValues: {name: "", email: ""}})
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const onSubmit = (data: FormData) => {
        setSubmitting(true)
        setTimeout(() => {
            console.log(data)
            setSubmitting(false)
            nav.navigate("otp")
        }, 1000)

    }
    return (
        <FBox style={{paddingHorizontal: 18, paddingVertical: 60}}>
            <FBox style={{display: "flex", flexDirection: "column"}}>
                <FBox style={{paddingBottom: 20}}>
                    <FormLabel title={"Account Name"}/>
                    <Controller control={control}
                                rules={{
                                    required: "Name is required",
                                    minLength: {value: 4, message: "minimum 4 character"}
                                }}
                                render={(form) => {
                                    return (
                                        <>
                                            <TextInput returnKeyType={"next"}
                                                       error={Boolean(errors.name)}
                                                       ref={form.field.ref}
                                                       onChangeText={(val) => form.field.onChange(val)}
                                                       onBlur={form.field.onBlur}
                                                       mode={"outlined"}
                                                       placeholder={"You can use your nickname also"}
                                                       value={form.field.value}
                                                       right={!Boolean(errors.name)&&form.fieldState.isTouched?<TextInput.Icon icon={"check"} size={12} iconColor={colors.primary}/>:<></>}
                                            />
                                            <HelperText type={"error"}>{errors.name?.message as string}</HelperText>
                                        </>
                                    )
                                }} name="name"/>


                </FBox>
                <FBox style={{paddingBottom: 20}}>
                    <FormLabel title={"Email"}/>
                    <Controller rules={{
                        required: "Email is required",
                        pattern: {value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, message: "Invalid email address"}
                    }} render={(form) => {
                        return (<>
                            <TextInput autoComplete={"email"}
                                       textContentType={"emailAddress"}
                                       autoCapitalize={"none"}
                                       keyboardType={"email-address"}
                                       value={form.field.value}
                                       error={Boolean(errors.email)}
                                       mode={"outlined"}
                                       onChangeText={(val) => form.field.onChange(val)}
                                       onBlur={form.field.onBlur}
                                       ref={form.field.ref}
                                       right={!Boolean(form.fieldState.error)&&form.fieldState.isTouched?<TextInput.Icon icon={"check"} size={12} iconColor={colors.primary}/>:<></>}
                                       placeholder={"youremail@medicine.com"}/>

                            <HelperText type={"error"}>{errors.email?.message as string}</HelperText>

                        </>)
                    }} name={"email"} control={control}/>

                </FBox>
                <FBox style={{paddingTop: 60}}>

                    <Button loading={submitting} mode="contained" onPress={handleSubmit(onSubmit)}
                            disabled={!isValid || submitting}
                            style={{width: "100%", marginBottom: 12, borderRadius: 5}}>Sign Up</Button>
                </FBox>
                <Text style={{textAlign: "center", padding: 10}}>Already Have an Account ? <Link
                    style={{fontFamily: "Montserrat_700Bold"}} to={"/sign-in"}>Log In</Link></Text>
            </FBox>

        </FBox>
    )
}