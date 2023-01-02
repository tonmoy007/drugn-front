import {View} from "react-native";
import {Button, HelperText, Text, TextInput} from "react-native-paper";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {colors} from "../../utils/settings";

export const SignUpScreen = () => {
    const {handleSubmit, control, formState: {errors, isValid}, reset} = useForm({mode: "onBlur"})
    const onSubmit = (data) => {}
    return (
        <View style={{paddingHorizontal: 18, paddingVertical: 60}}>
            <View style={{display: "flex", flexDirection: "column"}}>
                <View style={{paddingBottom: 20}}>
                    <Text style={{fontFamily: "Montserrat_400Regular", fontSize: 16, marginBottom: 5}}>Account
                        Name</Text>
                    <Controller control={control}
                                rules={{
                                    required: "Name is required",
                                    minLength: {value: 4, message: "minimum 4 character"}
                                }}
                                render={(form) => {
                                    return (
                                        <>
                                            <TextInput error={Boolean(errors.name)} ref={form.field.ref}
                                                       onChange={form.field.onChange}
                                                       onBlur={form.field.onBlur}
                                                       mode={"outlined"}
                                                       placeholder={"You can use your nickname also"}/>
                                            <Text style={{color: colors.red}}>{errors.name?.message as string}</Text>
                                        </>
                                    )
                                }} name="name"/>


                </View>
                <View style={{paddingBottom: 20}}>
                    <Text style={{fontFamily: "Montserrat_400Regular", fontSize: 16, marginBottom: 5}}>Email</Text>
                    <Controller rules={{
                        required: "Email is required",
                        pattern: {value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, message: "Invalid email address"}
                    }} render={(form) => {
                        return (<>
                            <TextInput error={Boolean(errors.email)} mode={"outlined"} onChange={form.field.onChange}
                                       onBlur={form.field.onBlur}
                                       ref={form.field.ref} placeholder={"youremail@medicine.com"}/>

                            <Text style={{color: colors.red}}>{errors.email?.message as string}</Text>

                        </>)
                    }} name={"email"} control={control}/>

                </View>
                <View style={{paddingTop: 60}}>

                    <Button mode="contained" onPress={() => {

                    }}
                            disabled={!isValid}
                            style={{width: "100%", marginBottom: 12, borderRadius: 5}}>Sign Up</Button>
                </View>


            </View>

        </View>
    )
}