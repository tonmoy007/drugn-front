import {Button, Dialog, Divider, List, Portal, TextInput, useTheme} from "react-native-paper";
import {Dimensions, ScrollView, StyleProp, ViewStyle} from "react-native";
import {useEffect, useState} from "react";
import {FBox} from "./fbox";
import {Control, Controller, FieldValue, useForm} from "react-hook-form";

export type SelectItem = {
    label: string;
    value: string;
}

interface Props {
    title: string;
    name: string;
    selectItems: SelectItem[];
    onChange: (item: SelectItem) => void;
    placeholder?: string;
    outlineColor?: string;
    outlineStyle?: StyleProp<ViewStyle>
    selectedItem?: SelectItem
    mode?: "flat" | "outlined"
    onBlur?: () => void;
}

export const FPaperSelect = (props: Props) => {
    const {control, setValue, reset} = useForm({defaultValues: {item: ""}})
    const [selectedItem, setSelectedItem] = useState<SelectItem | undefined>(props.selectedItem)
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
        setValue("item", item.value)
        setSelectedItem(item)
        props.onChange(item)
        setVisible(false)
    }
    const onCancel = () => {
        setVisible(false)
    }
    const onOk = () => {
        setVisible(false)
    }

    return (
        <Controller control={control} name={"item"} render={({field, fieldState, formState,}) => {
            return (
                <>
                    <TextInput placeholder={props.placeholder ?? props.title}
                               value={field.value}
                               onChange={field.onChange}
                               outlineColor={props.outlineColor}
                               outlineStyle={props.outlineStyle}
                               onFocus={onFocus}
                               mode={props.mode}
                               right={<TextInput.Icon icon={"chevron-down"}/>}
                               disabled={visible}
                               onBlur={field.onBlur}
                               error={Boolean(fieldState.error)}
                               ref={field.ref}
                    />
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
            )
        }
        }/>)

}