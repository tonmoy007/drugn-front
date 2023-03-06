import {BottomTab, colors, RootParamList} from "../../utils/settings";
import {Home} from "./home";
import {MedicineListScreen} from "./medicine-list";
import {NftScreen} from "./nft";
import {AccountScreen} from "./account";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {CustomIcon} from "../../utils/custom-icon";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {updateUser} from "../../utils/store/user";
import {GlobalState} from "../../utils/store/global";

const Tab = createMaterialBottomTabNavigator<BottomTab>()
export const Dashboard = () => {
    const user = useSelector((state: GlobalState) => state.user);
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>()
    useEffect(() => {
        if (user.new) {
            navigation.navigate("accountComplete")
            dispatch(updateUser({new: false}))
        }
    }, [user])
    return <>
        <Tab.Navigator shifting={false} initialRouteName={"Home"} barStyle={{backgroundColor: colors.navBackground}}
                       inactiveColor={colors.inactive}>
            <Tab.Screen name={"Home"} component={Home} options={{
                title: "ホーム",
                tabBarIcon: (props) => <CustomIcon name={"home"} size={24} color={props.color}/>
            }}/>
            <Tab.Screen name={"MedicineList"} component={MedicineListScreen}
                        options={{
                            title: "お薬一覧",
                            tabBarIcon: (props) => <CustomIcon name={"pill"} size={24} color={props.color}/>
                        }}/>
            <Tab.Screen name={"Nft"} component={NftScreen}
                        options={{
                            title: "NFT",
                            tabBarIcon: (props) => <CustomIcon name={"nft"} size={24} color={props.color}/>
                        }}/>
            <Tab.Screen name={"Account"} component={AccountScreen}
                        options={{
                            title: "アカウント",
                            tabBarIcon: (props) => <CustomIcon name={"user"} size={24} color={props.color}/>
                        }}/>
        </Tab.Navigator>
    </>
}