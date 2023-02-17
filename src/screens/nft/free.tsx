import { useEffect, useState, Fragment } from 'react';
import { Image, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../utils/settings';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { FBox } from '../../components/globals/fbox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ClaimNFT from '../../components/nft/claimNFT';

const drugImage = require('../../../assets/icons/pills/blue_primary_eye.svg')
const waterImage = require('../../../assets/icons/account_create_success.svg')
const drugBoxImage = require('../../../assets/icons/store_location_icon.svg')

const nfts = {
    drug: {
        data: Array.apply(null, Array(20)).map((v, i) => {
            return { id: i, image: drugImage, name: 'テストユーザー限定', free: true };
        }),
        name: "Drug"
    },
    water: {
        data: Array.apply(null, Array(3)).map((v, i) => {
            return { id: i, image: waterImage, name: 'water name' };
        }),
        name: "Water"
    },
    drugBox: {
        data: Array.apply(null, Array(6)).map((v, i) => {
            return { id: i, image: drugBoxImage, name: 'drug box name' };
        }),
        name: "Drug Box"
    },

}
export default function FreeNFT({ navigation }) {
    const [curTab, setCurTab] = useState<string>('drug')
    const [confirmation, setConfirmation] = useState(null)

    const theme = useTheme();

    useEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center'
        });
    }, []);


    const renderList = ({ item }) => {
        return (
            <FBox style={{
                flex: 1, margin: 3, justifyContent: 'center', alignItems: 'center',
                backgroundColor: colors.background2, borderRadius: 10
            }} key={`${curTab}-${item.id}`}>
                <TouchableOpacity style={{ alignItems: 'center', padding: 10, }}
                    onPress={() => setConfirmation(item)}>
                    <Image source={item.image} style={{ width: 100, height: 100 }} />
                    <Text style={styles.itemText}>{item.name}</Text>
                    {item.free && <Text variant='titleMedium' style={{ ...styles.itemText, fontWeight: '700' }}>You can get it for FREE!</Text>}
                </TouchableOpacity>
            </FBox>
        );
    };

    return (
        <FBox style={styles.container}>
            {confirmation ?
                <ClaimNFT nft={confirmation} navigation={navigation} setConfirmation={setConfirmation} />
                :
                <>
                    <Card theme={{ elevation: 1 }} style={styles.card}>
                        <Card.Content style={{ padding: 0 }}>
                            <FBox style={styles.tabs}>
                                {Object.keys(nfts).map((key, index) =>
                                    <Fragment key={key}>
                                        <Button style={{
                                            ...styles.tabContainer, backgroundColor: key === curTab ? theme.colors.primary : 'inherit',
                                            borderRadius: key === curTab ? 10 : 0
                                        }}
                                            onPress={() => setCurTab(key)}>
                                            <Text style={{ ...styles.tabText, color: theme.colors.onPrimary }}>{nfts[key].name}</Text>
                                        </Button>
                                        {index < Object.keys(nfts).length - 1 && key !== curTab && <FBox style={styles.cardDivider}></FBox>}
                                    </Fragment>
                                )}

                            </FBox>
                        </Card.Content>
                    </Card>
                    <FBox style={{ ...styles.subContainer }}>
                        <FlatList
                            data={nfts[curTab].data}
                            renderItem={renderList}
                            numColumns={2}
                            keyExtractor={(item, index) => `${curTab}-${index}`}
                        />
                    </FBox>
                </>
            }
        </FBox >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        marginHorizontal: 10
    },
    subContainer: {
        marginTop: 10,
        flex: 1
    },
    card: {
        backgroundColor: colors.background2,
        borderRadius: 10
    },
    tabs: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: 'relative',

    },
    tabContainer: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 5
    },
    cardDivider: {
        width: 1,
        backgroundColor: colors.textDark,
        opacity: 0.7,
        height: 20
    },
    tabLabelText: {
        fontSize: 16,
        opacity: 0.9,
        margin: '0px',
    },
    tabText: {
        marginTop: 2,
        fontSize: 20,
    },
    itemText: {
        textAlign: 'center'
    }
});