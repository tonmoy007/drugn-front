import {FBox} from "../../components/globals/fbox";
import {List, Text, TextInput, useTheme} from "react-native-paper";
import {Controller, useForm} from "react-hook-form";
import {useState} from "react";
import {Dimensions, Image, ScrollView} from "react-native";
import {FPaperSelect, SelectItem} from "../../components/globals/select";

export const StoreRegistration = () => {
    const {handleSubmit, control} = useForm()
    const [selected, setSelected] = useState<SelectItem | null>(null)
    const theme = useTheme()
    const list = [...Array(10).keys()].map((item) => {
        return {
            title: "ツルハドラッグ　川崎モアーズ店",
            description: "神奈川県 川崎市中原区 新丸子東3-1302 ららテラス 武蔵小杉1階",
            id: item
        }
    })
    return (
        <FBox style={{flex: 1, paddingHorizontal: 18, paddingTop: 18, overflow: "scroll"}}>
            <FBox style={{alignItems: "center", justifyContent: "center", paddingTop: 80, paddingBottom: 20}}>
                <FBox style={{padding: 0}}>
                    <Image source={require("../../../assets/icons/store_location_icon.svg")}
                           style={{width: 100, height: 80}}/>
                </FBox>

            </FBox>
            <Text style={{padding: 10}} variant={"titleMedium"}>お薬を受けて取る薬局を指定して、
                最初のNFTを受け取りましょう！</Text>
            <FBox>
                <FBox style={{marginBottom: 10}}>
                    <Controller render={({field, fieldState, formState}) => {
                        return (
                            <TextInput mode={"outlined"}
                                       outlineStyle={{borderWidth: 0, backgroundColor: "rgba(255,255,255,.07)"}}
                                       onChangeText={field.onChange} onBlur={field.onBlur} value={field.value}
                                       ref={field.ref} error={Boolean(fieldState.error)} placeholder={"Search"}/>
                        )
                    }} name={"query"} control={control}/>
                </FBox>
                <FBox>
                    <Controller render={({field, fieldState, formState}) => {
                        return (
                            <FPaperSelect title={"Select Item"}
                                          selectItems={[{value: "OK", label: "OK"}, {
                                              label: "Not Ok",
                                              value: "Not Ok"
                                          }, {label: "Not Ok", value: "Not Ok"}, {
                                              label: "Not Ok",
                                              value: "Not Ok"
                                          }, {label: "Not Ok", value: "Not Ok"}, {
                                              label: "Not Ok",
                                              value: "Not Ok"
                                          }, {label: "Not Ok", value: "Not Ok"}, {
                                              label: "Not Ok",
                                              value: "Not Ok"
                                          }, {label: "Not Ok", value: "Not Ok"}, {
                                              label: "Not Ok",
                                              value: "Not Ok"
                                          }, {label: "Not Ok", value: "Not Ok"}, {
                                              label: "Not Ok",
                                              value: "Not Ok"
                                          }, {label: "Not Ok", value: "Not Ok"}, {
                                              label: "Not Ok",
                                              value: "Not Ok"
                                          }, {label: "Not Ok", value: "Not Ok"}, {label: "Not Ok", value: "Not Ok"}]}
                                          onChange={field.onChange} selectedItem={selected} mode={"outlined"}
                                          outlineStyle={{backgroundColor: "rgba(255,255,255,.06)"}}
                                          outlineColor={"transparent"}/>
                        )
                    }} name={"dist"} control={control}/>
                </FBox>
            </FBox>
            <FBox style={{paddingTop: 10, flex: 1, position: "relative"}}>
                <ScrollView style={{maxHeight: "100%"}}>
                    <List.Section>
                        {list.map(item => {
                            return <List.Item
                                key={`data_${item.id}`}
                                style={{
                                    padding: 10,
                                    borderWidth: 1,
                                    borderColor: theme.colors.outline,
                                    borderRadius: 5,
                                    marginBottom: 10
                                }}
                                title={item.title}
                                description={item.description}
                                left={props => <List.Image style={{
                                    borderRadius: 10,
                                    shadowColor: "rgba(0, 0, 0)",
                                    shadowOffset: {width: 4, height: 4},
                                    shadowOpacity: .25,
                                    shadowRadius: 4
                                }}
                                                           source={require("../../../assets/images/Drugn_logo_white.png")}/>}/>
                        })}
                    </List.Section>
                </ScrollView>
            </FBox>
        </FBox>
    )
}