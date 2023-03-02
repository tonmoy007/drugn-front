import {FBox} from "../globals/fbox";
import {FormLabel} from "../globals/form-label";
import {Controller, useForm} from "react-hook-form";
import {Button, HelperText, Text, TextInput} from "react-native-paper";
import {colors} from "../../utils/settings";
import {ReactNode} from "react";

interface Props {
    onSubmit: (data) => void,
    submitting: boolean,
    submitText: string,
    extra: ReactNode,
    hideName?: boolean
}

export const AuthForm = ({onSubmit, submitting, submitText, extra, hideName}: Props) => {
    type FormData = {
        username: string,
        email: string
    }
    const {
        handleSubmit,
        control,
        formState: {errors, isValid},
    } = useForm<FormData>({mode: "onBlur", defaultValues: {username: "", email: ""}})
    return (
        <FBox style={{paddingHorizontal: 18, paddingVertical: 60}}>
            <FBox style={{display: "flex", flexDirection: "column"}}>
                {!hideName ? (
                    <FBox style={{paddingBottom: 20}}>
                        <FormLabel title={"好きな名前で登録できます(本名以外推奨)"}/>
                        <Controller control={control}
                                    rules={{
                                        required: "Name is required",
                                        minLength: {value: 4, message: "minimum 4 character"}
                                    }}

                                    render={(form) => {
                                        return (
                                            <>
                                                <TextInput returnKeyType={"next"}
                                                           error={Boolean(errors.username)}
                                                           ref={form.field.ref}
                                                           onChangeText={(val) => form.field.onChange(val)}
                                                           onBlur={form.field.onBlur}
                                                           mode={"outlined"}
                                                           value={form.field.value}
                                                           placeholder={"好きなニックネームを入力してください"}
                                                           right={!Boolean(errors.username) && form.fieldState.isTouched ?
                                                               <TextInput.Icon focusable={false} icon={"check"}
                                                                               size={12}
                                                                               iconColor={colors.primary}/> : <></>}
                                                />
                                                <HelperText
                                                    type={"error"}>{errors.username?.message as string}</HelperText>
                                            </>
                                        )
                                    }} name="username"/>
                    </FBox>
                ) : null}
                <FBox style={{paddingBottom: 20}}>
                    <FormLabel title={"Eメールアドレス"}/>
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
                                       right={!Boolean(form.fieldState.error) && form.fieldState.isTouched ?
                                           <TextInput.Icon icon={"check"} focusable={false} size={12}
                                                           iconColor={colors.primary}/> : <></>}
                                       placeholder={"メールを受け取れるアドレスを入力してください"}/>

                            <HelperText type={"error"}>{errors.email?.message as string}</HelperText>

                        </>)
                    }} name={"email"} control={control}/>

                </FBox>
                <FBox style={{paddingTop: 60}}>
                    <Button loading={submitting} mode="contained" onPress={handleSubmit(onSubmit)}
                            disabled={!isValid || submitting}
                            style={{width: "100%", marginBottom: 12, borderRadius: 5}}>{submitText}</Button>
                </FBox>
                {extra}
            </FBox>
        </FBox>
    )
}