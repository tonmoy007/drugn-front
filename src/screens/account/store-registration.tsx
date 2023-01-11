import {FBox} from "../../components/globals/fbox";
import {Button, Text, TextInput} from "react-native-paper";
import {Controller, useForm} from "react-hook-form";
import {useState} from "react";
import {Image} from "react-native";
import {FPaperSelect, SelectItem} from "../../components/globals/select";
import {StoreList} from "../../components/account/store-list";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootParamList} from "../../utils/settings";

const data = [{value: "横浜市西区", label: "横浜市西区（16）"}, {
    label: "横浜市中央区（16）",
    value: "横浜市中央区"
}, {label: "藤沢市（3）", value: "藤沢市"}]
export const StoreRegistration = () => {
    const {handleSubmit, control, setValue} = useForm()
    const [selected, setSelected] = useState<SelectItem | undefined>()
    const [items, setItems] = useState(data)
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const [list, updateList] = useState([...Array(10).keys()].map((item) => {
        return {
            title: "ツルハドラッグ　川崎モアーズ店",
            description: "神奈川県 川崎市中原区 新丸子東3-1302 ららテラス 武蔵小杉1階",
            id: item,
            selected: false
        }
    }))
    const onLocationSelect = (index) => {
        const l = list.map(data => {
            return {...data, selected: false}
        })
        l[index].selected = true
        updateList(l)
        setValue("location", l[index])

    }
    const registerStore = (data) => {
        console.log(data)
        nav.navigate("storeRegistrationSuccess")

    }
    return (
        <FBox style={{
            flex: 1,
            paddingHorizontal: 18,
            paddingTop: 18,
            overflow: "hidden",
            position: "relative",
        }}>
            <FBox style={{position: "absolute", top: 0, right: 0, zIndex: 10}}>
                <Button mode={"text"} onPress={handleSubmit(registerStore)}>登録</Button>
            </FBox>

            <FBox style={{alignItems: "center", justifyContent: "center", paddingTop: 20, paddingBottom: 20}}>
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

                    <FPaperSelect name={"dist"} title={"Select Item"}
                                  selectItems={items}
                                  mode={"outlined"}
                                  onChange={(item) => setValue("dist", item)}
                                  outlineStyle={{backgroundColor: "rgba(255,255,255,.06)"}}
                                  outlineColor={"transparent"}
                                  selectedItem={selected}
                    />

                </FBox>
            </FBox>
            <StoreList list={list} onLocationSelect={onLocationSelect}/>
        </FBox>
    )
}