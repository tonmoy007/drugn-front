import {Dialog, IconButton, Portal, Text} from "react-native-paper";
import {StyleSheet} from "react-native";

export const TextInfoModal=({text,show,onDismiss,title})=>{
    return (
        <Portal>
            <Dialog visible={show} style={styles.modal} onDismiss={() => onDismiss(false)}>
                <Dialog.Title style={styles.title}>
                    <Text variant={"bodySmall"}>{title}</Text>
                    <IconButton style={{position: "absolute", right: 0, top: 0}} icon={"close"}
                                onPress={() => onDismiss(false)}/>
                </Dialog.Title>
                <Dialog.Content>
                    <Text variant={"titleSmall"}>
                        {text}
                    </Text>
                </Dialog.Content>
            </Dialog>
        </Portal>
    )
}
const styles = StyleSheet.create({
    modal: {
        borderRadius: 20,
    },
    title: {
        flexDirection: "row", alignItems: "flex-end", marginBottom: 16, width: "100%"
    }
})