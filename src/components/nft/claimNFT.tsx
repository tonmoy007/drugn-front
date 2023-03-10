import { StyleSheet, Image } from 'react-native';
import { useTheme, Text, TextInput, Card, Button, ActivityIndicator } from 'react-native-paper';
import { colors, RootParamList } from '../../utils/settings';
import { FBox } from '../globals/fbox';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { GlobalState } from '../../utils/store/global';
import ConfirmClaimNFT from './confirm-claim';

interface Props {
    nft: { name: string, id: string, free: boolean, image: any };
    setConfirmation: (val: any) => void;
    navigation
}

export default function ClaimNFT(props: Props) {
    const user = useSelector((state: GlobalState) => state.user)
    const [claim, setClaim] = useState<boolean>(false)
    const theme = useTheme()

    if (claim)
        return (<ConfirmClaimNFT nft={props.nft} setConfirmation={props.setConfirmation} navigation={props.navigation} setClaim={setClaim} />);

    return (
        <FBox style={styles.container}>
            <FBox style={{ ...styles.card, borderColor: theme.colors.primary }}>
                <FBox style={{ flex: 1 }}>
                    <Text variant={"titleLarge"} style={{ ...styles.itemText, fontWeight: '700', marginVertical: 50, }}>購入しますか?</Text>
                    <FBox style={{ marginTop: 50, alignItems: 'center' }}>
                        <Image source={props.nft.image} style={{ width: 200, height: 200 }} />
                    </FBox>
                    <Text style={{ ...styles.itemText, marginTop: 20 }}>{props.nft.name}</Text>
                    {props.nft.free && <Text variant='titleLarge' style={{ ...styles.itemText, marginTop: 10, fontWeight: '700' }}>You can get it for FREE!</Text>}
                </FBox>
                <Button style={{ ...styles.button, backgroundColor: theme.colors.primary }}
                    labelStyle={{ color: theme.colors.onPrimary }} onPress={() => setClaim(true)}
                >購入する</Button>
            </FBox>
            <FBox>
                <Text style={{ ...styles.itemText, color: theme.colors.primary, marginBottom: 50, marginTop: 30 }}
                    onPress={() => props.setConfirmation(null)}>戻る</Text>
            </FBox>
        </FBox>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    card: {
        backgroundColor: colors.background2,
        borderRadius: 10,
        borderWidth: 2,
        width: '100%',
        padding: 10,
        flex: 2,
    },
    itemText: {
        textAlign: 'center'
    },
    button: {
        width: '100%',
        borderRadius: 5,
        padding: 5,
    },
});