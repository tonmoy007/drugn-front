import { StyleSheet, Image } from 'react-native';
import { useTheme, Text, TextInput, Card, Button } from 'react-native-paper';
import { colors } from '../../utils/settings';
import { FBox } from '../globals/fbox';
import { useState, useEffect } from 'react'
import { MessageWithImage } from '../globals/message-with-image';

interface Props {
    nft: { name: string, id: string, free: boolean, image: any };
    setConfirmation: (val: any) => void;
    navigation
}

export default function ClaimNFT(props: Props) {
    const [claimed, setClaimed] = useState<boolean>(false)

    const theme = useTheme()

    useEffect(() => {
        if (claimed)
            props.navigation.setOptions({
                headerTitleAlign: 'center',
                headerTitle: 'NFT Success'
            });
    }, [claimed]);

    if (claimed)
        return (
            <MessageWithImage description={""} buttonMode={"text"} imageUrl={props.nft.image} title={"Your got a NFT!"} buttonText={"ホーム画面へ"}
                navigationPath={"dashboard"} />
        )

    return (
        <FBox style={styles.container}>
            <FBox style={{ ...styles.card, borderColor: theme.colors.primary }}>
                <FBox style={{ flex: 1 }}>
                    <Text variant={"titleLarge"} style={{ ...styles.itemText, fontWeight: '700', marginVertical: 50, }}>Claim Drug?</Text>
                    <FBox style={{ marginTop: 50, alignItems: 'center' }}>
                        <Image source={props.nft.image} style={{ width: 200, height: 200 }} />
                    </FBox>
                    <Text style={{ ...styles.itemText, marginTop: 20 }}>{props.nft.name}</Text>
                    {props.nft.free && <Text variant='titleLarge' style={{ ...styles.itemText, marginTop: 10, fontWeight: '700' }}>You can get it for FREE!</Text>}
                </FBox>
                <Button style={{ ...styles.button, backgroundColor: theme.colors.primary }}
                    labelStyle={{ color: theme.colors.onPrimary }} onPress={() => setClaimed(true)}
                >NFT</Button>
            </FBox>
            <FBox>
                <Text style={{ ...styles.itemText, color: theme.colors.primary, marginBottom: 50, marginTop: 30 }}
                    onPress={() => props.setConfirmation(null)}>Go Back</Text>
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