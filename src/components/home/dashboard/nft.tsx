import { Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../../../utils/settings';
import { Text, useTheme, ProgressBar } from 'react-native-paper';
import { FBox } from '../../../components/globals/fbox';

const drugImage = require('../../../../assets/icons/first_nft.svg')


const nfts = Array.apply(null, Array(20)).map((v, i) => {
    return {
        id: i, image: drugImage, name: 'drug name',
        bars: [{ 'name': 'Efficiency', 'value': 0.8 }, { 'name': 'Luck', 'value': 0.8 },
        { 'name': 'Comfort', 'value': 0.4 }, { 'name': 'Resilience', 'value': 0.6 }]
    };
});



export default function HomeNFT() {

    const theme = useTheme();

    const barColors = {
        'Efficiency': theme.colors.scrim,
        'Luck': theme.colors.primary,
        'Comfort': '#FF0080',
        'Resilience': '#8a00c2'
    }

    const progressBar = ({ item }) => {

        return (<>
            <FBox style={{ flex: 1, margin: 5 }}>
                <Text style={{ fontSize: 12 }}>{item.name}</Text>
                <ProgressBar style={{ height: 5, borderRadius: 20 }} progress={item.value} color={barColors[item.name]} />
            </FBox>
        </>)
    }

    const renderList = ({ item }) => {
        return (
            <FBox style={{
                flex: 1, margin: 3,
                borderColor: colors.grayBorder, borderRadius: 10, borderWidth: 1
            }} key={`${item.id}`}>
                <TouchableOpacity style={{ padding: 10 }}
                    onPress={() => { }}>
                    <FBox style={{ alignItems: 'center' }}>
                        <Text style={{ ...styles.itemText, fontWeight: '700', marginBottom: 10 }}>#333333333</Text>
                        <Image source={item.image} style={{ width: 100, height: 100 }} />
                    </FBox>
                    <FlatList
                        data={item.bars}
                        renderItem={progressBar}
                        numColumns={2}
                        keyExtractor={(item) => `${item.name}`}
                    />
                </TouchableOpacity>
            </FBox>
        );
    };

    return (
        <FBox style={styles.container}>
            <FlatList
                data={nfts}
                renderItem={renderList}
                numColumns={2}
                scrollEnabled
                keyExtractor={(item) => `${item.id}`}
            />
        </FBox >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        paddingBottom: 180
    },
    card: {
        backgroundColor: colors.navBackground,
        borderRadius: 20,
        marginBottom: 0
    },
    cardWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: 'relative'
    },
    cardIcon: { flex: 1, alignItems: "center", flexDirection: "column" },
    cardIconDivider: {
        width: 1,
        backgroundColor: colors.textDark,
        height: 50
    },
    cardIconText: {
        fontFamily: "Montserrat_700Bold",
        marginTop: 10,
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
        margin: 0,
    },
    tabText: {
        marginTop: 2,
        fontSize: 20,
    },
    itemText: {
        textAlign: 'center'
    }
});