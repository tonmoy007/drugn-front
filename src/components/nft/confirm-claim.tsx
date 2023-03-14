import { StyleSheet, Image } from 'react-native';
import { useTheme, Text, TextInput, Card, Button, ActivityIndicator } from 'react-native-paper';
import { colors } from '../../utils/settings';
import { FBox } from '../globals/fbox';
import { useState, useEffect } from 'react'
import { MessageWithImage } from '../globals/message-with-image';
import { useInitialNFTQuery } from '../../api/account';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../utils/store/global';
import { toastMessage } from '../../utils/toast';

interface Props {
    nft: { name: string, id: string, free: boolean, image: any };
    setConfirmation: (val: any) => void;
    setClaim: (val: boolean) => void;
    navigation
}

export default function ConfirmClaimNFT(props: Props) {
    const [claimed, setClaimed] = useState<boolean>(false)
    const user = useSelector((state: GlobalState) => state.user)
    const { data: claimNFT, isLoading, error } = useInitialNFTQuery({ address: user.address, user: user.id ?? 0 })

    const theme = useTheme()

    useEffect(() => {
        if (claimed)
            props.navigation.setOptions({
                headerTitleAlign: 'center',
                headerTitle: 'NFTを受け取る'
            });
    }, [claimed]);

    useEffect(() => {
        if (claimNFT) {
            setClaimed(true);
        }
    }, [claimNFT])

    useEffect(() => {
        if (error) {
            if ('data' in error) {
                toastMessage({ msg: error.data?.error });
            }
            props.setClaim(false)
        }
    }, [error])

    if (claimed)
        return (
            <MessageWithImage description={""} buttonMode={"text"} imageUrl={require("../../../assets/icons/nft_bag.svg")} title={"Your got a NFT!"} buttonText={"ホーム画面へ"}
                navigationPath={"dashboard"} />
        )
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
                {isLoading &&
                    <ActivityIndicator size={'large'} color={colors.primary} />}
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