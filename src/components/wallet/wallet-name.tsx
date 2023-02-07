import { StyleSheet, Image } from 'react-native';
import { useTheme, Text, TextInput } from 'react-native-paper';
import { colors } from '../../utils/settings';
import { FBox } from '../globals/fbox';
import { useState, useEffect } from 'react'

interface Props {
    nextStep: number;
    setStep: (val: number) => void
    navigation
}

export default function WalletName(props: Props) {
    const [walletName, setWalletName] = useState<string>('')

    const theme = useTheme()

    useEffect(() => {
        props.navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => {
                return (<></>)
            },
            headerRight: () => {
                return (
                    <Text style={{ ...styles.navText, color: walletName.length > 0 ? theme.colors.primary : theme.colors.onSurfaceDisabled }}
                        onPress={handleNextNav}>完了</Text >
                )
            }
        });
    }, [props.nextStep, walletName]);

    const handleNextNav = () => {
        props.setStep(props.nextStep)
    }

    return (
        <FBox style={styles.container}>
            <Text variant={"titleLarge"} style={{ fontWeight: '700', marginBottom: 20 }}>Enter wallet name</Text>
            <TextInput
                style={{ width: '100%' }}
                onChangeText={setWalletName}
                mode={"outlined"}
                value={walletName}
                placeholder={"Wallet name"}
                right={walletName.length > 0 ? <TextInput.Icon icon={"check"} size={12} iconColor={colors.primary} />
                    : <></>}
            />
            <Text style={{ color: theme.colors.onPrimary, marginTop: 10 }}>A very very very very long text</Text>
            <Text style={{ color: theme.colors.onPrimary }}>A very long text</Text>
            <Text style={{ color: theme.colors.onPrimary }}>short text</Text>

            <FBox style={{ marginTop: 50 }}>
                <Image source={require("../../../assets/icons/first_nft.svg")} style={{ width: 100, height: 100 }} />
            </FBox>
        </FBox>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    navText: {
        justifyContent: 'center',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },
});