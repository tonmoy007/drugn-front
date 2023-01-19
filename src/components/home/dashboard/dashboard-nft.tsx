import {FBox} from "../../globals/fbox";
import {Card,  Text, useTheme} from "react-native-paper";
import {colors} from "../../../utils/settings";
import {CustomIcon} from "../../../utils/custom-icon";
import {Dimensions, TouchableOpacity} from "react-native";
import {useState} from "react";
import {NftList} from "./nft-list";

export const DashboardNft = () => {
    const theme = useTheme()
    const {height: windowHeight} = Dimensions.get('window');
    const [open, setOpen] = useState(false)
    return (
        <FBox style={{
            backgroundColor: theme.colors.background,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            zIndex: 10,
            position: open ? "absolute" : "relative",
            width: "100%",
            height: open ? "100%" : "auto",
            top: open ? 80 : 0,
        }}>
            <FBox style={{position:'absolute',
                top: 10,
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                width:'100%',
                left:0
            }}>
                <TouchableOpacity style={{
                    backgroundColor: colors.onBackgroundSpace,
                    width: 40,
                    height: 5,
                    borderRadius: 20,
                    zIndex:10
                }} onPress={() => setOpen(!open)}/>
            </FBox>
            <FBox style={{margin:18}}>
                <Text style={{fontFamily: "Montserrat_700Bold", paddingBottom: 20}}>NFT</Text>
                <Card theme={{elevation: 1}} style={{
                    backgroundColor: colors.navBackground,
                    borderRadius: 20,
                    marginBottom: 0
                }}>
                    <Card.Content>
                        <FBox style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            position: 'relative'
                        }}>
                            <FBox style={{flex: 1, alignItems: "center", flexDirection: "column"}}>
                                <CustomIcon color={colors.white} name={"nft-up"} size={windowHeight < 700 ? 20 : 40}/>
                                <Text style={{fontFamily: "Montserrat_700Bold", marginTop: 10, fontSize: 10}}>NFT売買</Text>
                            </FBox>
                            <FBox style={{width: 1, backgroundColor: colors.textDark, height: windowHeight<700?50:100}}></FBox>
                            <FBox style={{flex: 1, alignItems: "center", flexDirection: "column"}}>
                                <CustomIcon color={colors.white} name={"nft-down"} size={windowHeight < 700 ? 20 : 40}/>
                                <Text style={{fontFamily: "Montserrat_700Bold", marginTop: 10, fontSize: 10}}>NFT受取</Text>
                            </FBox>
                        </FBox>
                    </Card.Content>
                </Card>
            </FBox>
            {open && (
                <NftList/>
            )}
        </FBox>
    )
}