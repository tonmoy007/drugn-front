import {useState} from "react";
import {Button, Dialog, IconButton, Modal, Portal, Text} from "react-native-paper";
import {colors} from "../../utils/settings";
import {StyleSheet} from "react-native";
import {TextInfoModal} from "../globals/text-info-modal";

export const WhatIsWallet = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <Button mode={"text"} textColor={colors.textDark} onPress={() => setShow(true)}>? wallet（ウォレット）とは？</Button>
            <TextInfoModal title={"? wallet（ウォレット）とは？"} text={"Walletは、ブロックチェーンと呼ばれる分散型台帳技術で管理されています。ウォレットがあるとDrugNで得られるポイントを貯めることができるようになります。また一般的には、自身で所有する仮想通貨のアドレスや、秘密鍵が格納されます。この秘密鍵を使うことで、あなたのウォレットにアクセスし、仮想通貨の送金や受取りなどの管理を行うことができます。"}
                           onDismiss={setShow} show={show}/>
        </>
    )
}

