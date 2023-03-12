import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme, Text, Button} from 'react-native-paper';
import {colors} from '../../utils/settings';
import {FBox} from '../globals/fbox';
import {useEffect} from 'react'

interface Props {
    nextStep: number;
    setStep: (val: number) => void
    navigation
}

export default function Wallet(props: Props) {
    const theme = useTheme()

    useEffect(() => {
        props.navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => {
                return (<></>)
            },
            headerRight: () => {
                return (
                    <Text style={{...styles.navText, color: theme.colors.onSurfaceDisabled}}>次へ</Text>
                )
            }
        });
    }, [props.nextStep]);

    return (
        <FBox style={styles.container}>
            <Text variant={"titleLarge"}
                  style={{...styles.text, fontWeight: '700', marginBottom: 20}}>新規でWalletを作りますか?</Text>
            <Button onPress={() => props.setStep(props.nextStep)}
                    labelStyle={styles.btnText} style={styles.button}>
                <TouchableOpacity style={styles.innerBTN}><Text
                    style={{...styles.text, color: theme.colors.onPrimary}}>おすすめ</Text></TouchableOpacity> 新規Wallet作成</Button>
            <Text style={{
                ...styles.text,
                color: theme.colors.onPrimary,
                marginTop: 10
            }}>テスト版の為すでにお持ちのアドレスではなく、DrugN専用のアドレスを作成し、ご利用されることをお勧めしています。</Text>

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
    text: {
        textAlign: 'center'
    },
    button: {
        borderColor: colors.primary2,
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        paddingVertical: 8,
    },
    innerBTN: {
        backgroundColor: colors.primary2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginRight: 10
    },
    btnText: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.primary2
    }
});