import {FBox} from "../../globals/fbox";
import {Card, Text, useTheme} from "react-native-paper";
import {colors} from "../../../utils/settings";
import {CustomIcon} from "../../../utils/custom-icon";
import {Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import {useState} from "react";
import {NftList} from "./nft-list";
import {
    PanGestureHandler,
} from "react-native-gesture-handler";

const {height: windowHeight} = Dimensions.get('window');

const smallScreen = windowHeight < 680
const styles = StyleSheet.create({
    container: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 10,
        width: "100%",
    },
    handle_container: {
        position: 'absolute',
        top: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        left: 0
    },
    handle: {
        backgroundColor: colors.onBackgroundSpace,
        width: 40,
        height: 5,
        borderRadius: 20,
        zIndex: 10
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
    cardIcon: {flex: 1, alignItems: "center", flexDirection: "column"},
    cardIconDivider: {width: 1, backgroundColor: colors.textDark, height: smallScreen ? 50 : 100},
    cardIconText: {
        fontFamily: "Montserrat_700Bold",
        marginTop: 10,
        fontSize: smallScreen ? 10 : 14
    }
})
export const DashboardNft = ({hideHeader}: { hideHeader?: boolean }) => {
    const theme = useTheme()

    const [open, setOpen] = useState(hideHeader)
    const onSwipe = (event) => {
        if (event.nativeEvent.velocityY > 0) {
            setOpen(false)
        }
        if (event.nativeEvent.velocityY < 0) {
            setOpen(true)
        }
    }
    return (
        <FBox style={{
            ...styles.container,
            backgroundColor: theme.colors.background,
            position: open ? "absolute" : "relative",
            height: open ? "100%" : "auto",
            top: open ? 80 : 0,
        }}>
            {!hideHeader ? (<TouchableOpacity style={styles.handle_container}>
                <PanGestureHandler onEnded={onSwipe}>
                    <TouchableOpacity activeOpacity={.8} style={styles.handle} onPress={() => setOpen(!open)}/>
                </PanGestureHandler>
            </TouchableOpacity>) : null}
            <FBox style={{margin: 18}}>
                {!hideHeader ? <Text
                    style={{fontFamily: "Montserrat_700Bold", paddingBottom: smallScreen ? 10 : 20}}>NFT</Text> : null}
                <Card theme={{elevation: 1}} style={styles.card}>
                    <Card.Content>
                        <FBox style={styles.cardWrapper}>
                            <FBox style={styles.cardIcon}>
                                <CustomIcon color={colors.white} name={"nft-up"} size={smallScreen ? 20 : 60}/>
                                <Text style={styles.cardIconText}>NFT売買</Text>
                            </FBox>
                            <FBox style={styles.cardIconDivider}></FBox>
                            <FBox style={{flex: 1, alignItems: "center", flexDirection: "column"}}>
                                <CustomIcon color={colors.white} name={"nft-down"} size={smallScreen ? 20 : 60}/>
                                <Text style={styles.cardIconText}>NFT受取</Text>
                            </FBox>
                        </FBox>
                    </Card.Content>
                </Card>
            </FBox>
            {open ? (
                <NftList/>
            ) : null}
        </FBox>
    )
}