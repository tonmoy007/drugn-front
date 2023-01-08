import {FBox} from "../../components/globals/fbox";

import {Text, TextInput} from "react-native-paper";
import {Controller, useForm} from "react-hook-form";
import {PaperSelect} from "react-native-paper-select";
import {useState} from "react";
import StoreRegistrationIcon from "../../../assets/icons/store_location_icon.svg";
import {Image} from "react-native";

export const StoreRegistration = () => {
    const {handleSubmit, control} = useForm()
    const [selected, setSelected] = useState<any[]>([])
    return (
        <FBox style={{flex: 1, padding: 18}}>
            <FBox style={{alignItems: "center", justifyContent: "center", paddingTop: 80, paddingBottom: 20}}>
                <FBox style={{padding:0}}>
                    <Image  source={require("../../../assets/icons/store_location_icon.svg")}
                           style={{width: 100, height: 80}} />
                </FBox>

            </FBox>
            <Text style={{padding: 10}} variant={"titleMedium"}>お薬を受けて取る薬局を指定して、
                最初のNFTを受け取りましょう！</Text>
            <FBox>
                <Controller render={({field, fieldState, formState}) => {
                    return (
                        <TextInput mode={"outlined"}
                                   outlineStyle={{borderWidth: 0, backgroundColor: "rgba(255,255,255,.07)"}}
                                   onChangeText={field.onChange} onBlur={field.onBlur} value={field.value}
                                   ref={field.ref} error={Boolean(fieldState.error)} placeholder={"Search"}/>
                    )
                }} name={"query"} control={control}/>
                <Controller render={({field, fieldState, formState}) => {
                    return (
                        <PaperSelect label={""}
                                     arrayList={[
                                         {_id: "", value: "Null"},
                                         {_id: "1", value: "Hi"},
                                         {_id: "2", value: "Hello"}
                                     ]}
                                     selectedArrayList={selected} multiEnable={false}
                                     textInputBackgroundColor={"rgba(255,255,255,.07)"}

                                     errorText={fieldState.error?.message ?? ""}
                                     value={field.value}
                                     onSelection={(val) => {
                                         setSelected([val])
                                         // field.onChange(val.selectedList.pop())
                                     }}
                                     textInputMode={"outlined"}
                                     hideSearchBox={true}
                                     containerStyle={{backgroundColor: "transparent"}} outlineColor={"transparent"}
                        />
                    )
                }} name={"dist"} control={control}/>
            </FBox>
        </FBox>
    )
}