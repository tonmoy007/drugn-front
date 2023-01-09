import {Button, Dialog, Divider, List, Portal, Text, TextInput, useTheme} from "react-native-paper";
import {Dimensions, ScrollView, StyleProp, ViewStyle} from "react-native";
import {useEffect, useRef, useState} from "react";
import {useAppTheme} from "react-native-paper/lib/typescript/core/theming";
import {AppTheme} from "../../utils/theme";
import {FBox} from "./fbox";

export type SelectItem = {
    label: string;
    value: string;
}

interface Props {
    title: string;
    selectItems: SelectItem[];
    onChange: (item: SelectItem) => void;
    placeholder?: string;
    outlineColor?: string;
    outlineStyle?: StyleProp<ViewStyle>
    selectedItem: SelectItem | null
    mode?: "flat" | "outlined"

}

export const FPaperSelect = (props: Props) => {
    const [val, setVal] = useState<string | undefined>()
    const [selectedItem, setSelectedItem] = useState<SelectItem | undefined>()
    const [visible, setVisible] = useState<boolean>(false)
    const theme = useTheme()
    const onChange = (val) => {
        console.log(val)
    }
    const onFocus = () => {
        setVisible(true)
    }
    const onDismiss = () => {
        setVisible(false)
    }
    const onSelect = (item: SelectItem) => {
        setVal(item.value)
        setSelectedItem(item)
        setVisible(false)
    }
    const onCancel = () => {
        setVisible(false)
    }
    const onOk = () => {
        setVisible(false)
    }
    useEffect(() => {
        if (selectedItem) {
            props.onChange(selectedItem)
        }
    }, [val])
    return <>
        <TextInput placeholder={props.placeholder ?? props.title} onChangeText={setVal} value={val}
                   outlineColor={props.outlineColor}
                   outlineStyle={props.outlineStyle} onFocus={onFocus} mode={props.mode}
                   right={<TextInput.Icon icon={"chevron-down"}/>} disabled={visible}/>
        <Portal>
            <Dialog visible={visible} dismissable={true} onDismiss={onDismiss}>
                <Dialog.Content style={{padding: 0}}>
                    <List.Subheader>{props.title}</List.Subheader>
                    <ScrollView style={{maxHeight: Dimensions.get("window").height - 200}}>
                        <List.Section>
                            {props.selectItems.map((item, index) => {
                                return (
                                    <FBox key={`select_index_${index}`}>

                                        <List.Item
                                            style={{paddingHorizontal: 10}}

                                            left={props => selectedItem?.value === item.value ?
                                                <List.Icon color={theme.colors.primary} icon={"check"}/> :
                                                <FBox style={{width: 24}}></FBox>}
                                            titleStyle={selectedItem?.value == item.value ? {color: theme.colors.primary} : {}}
                                            title={item.label} onPress={() => {
                                            onSelect(item)
                                        }}/>
                                        {<Divider/>}
                                    </FBox>
                                )
                            })}

                        </List.Section>
                    </ScrollView>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button mode={"text"} onPress={onCancel}>Cancel</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    </>

}