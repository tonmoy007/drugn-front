import {useState} from "react";
import {Button, Dialog, IconButton, Modal, Portal, Text} from "react-native-paper";
import {colors} from "../../utils/settings";
import {StyleSheet} from "react-native";

export const WhatIsWallet = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <Button mode={"text"} textColor={colors.textDark} onPress={() => setShow(true)}>? wallet（ウォレット）とは？</Button>
            <Portal>
                <Dialog visible={show} style={styles.modal} onDismiss={() => setShow(false)}>
                    <Dialog.Title style={styles.title}>
                        <Text variant={"bodySmall"}>? wallet（ウォレット）とは？</Text>
                        <IconButton style={{position: "absolute", right: 0, top: 0}} icon={"close"}
                                    onPress={() => setShow(false)}/>
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text variant={"titleSmall"}>
                            Walletは、ブロックチェーンと呼ばれる分散型台帳技術で管理されています。ウォレットがあるとDrugNで得られるポイントを貯めることができるようになります。また一般的には、自身で所有する仮想通貨のアドレスや、秘密鍵が格納されます。この秘密鍵を使うことで、あなたのウォレットにアクセスし、仮想通貨の送金や受取りなどの管理を行うことができます。
                        </Text>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </>
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