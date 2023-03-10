import { linking } from "../utils/routes";
import { navTheme } from "../utils/theme";
import { GlobalState } from "../utils/store/global";
import { colors, RootParamList } from "../utils/settings";
import { Dashboard } from "./dashboard";
import { UnAuthLanding } from "./auth/unauth-landing";
import { StoreRegistration } from "./account/store-registration";
import { StoreRegistrationSuccess } from "./account/store-registration-success";
import { SignUpScreen } from "./auth/sign-up";
import { StepOf } from "../components/globals/step-of";
import { OtpScreen } from "./auth/otp";
import { DevicePasscode } from "./auth/passcode";
import { AccountComplete } from "./auth/account-complete";
import { SignInScreen } from "./auth/sign-in";
import AddMedicine from "./medicine/add";
import { EditMedicine } from "./medicine/edit";
import ManageMedicine from "./medicine/manage";
import { DeleteMedicine } from "./medicine/delete";
import { NewWallet } from "./wallet";
import FreeNFT from "./nft/free";
import RecordMedicine from "./medicine/record";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AddedList } from "./medicine/added-list";
import { TermsAndConditions } from "./account/terms-and-conditions";
import { MedicineHistory } from "./medicine/history";


const Stack = createNativeStackNavigator<RootParamList>();
export const AppNavigation = () => {
    const user = useSelector((state: GlobalState) => state.user)

    return (
        <NavigationContainer linking={linking} theme={navTheme}>
            <Stack.Navigator
                initialRouteName={user.loggedIn ? 'dashboard' : 'landing'}
                screenOptions={{
                    statusBarColor: colors.background,
                    headerStyle: { backgroundColor: colors.background },
                    headerTitleStyle: { fontFamily: "Montserrat_700Bold" },
                    animation: "fade_from_bottom",
                    headerBackImageSource: require("../../assets/icons/back.svg")
                }}>
                {user.loggedIn ? (
                    <>
                        <Stack.Screen component={Dashboard} name="dashboard" navigationKey={"dashboard"}
                            options={{ title: "Dashboard", headerShown: false }} />

                        <Stack.Screen name={"storeRegistration"} component={StoreRegistration}
                            options={{ headerShown: false, title: "Store Registration" }} />
                        <Stack.Screen name={"storeRegistrationSuccess"} component={StoreRegistrationSuccess}
                            options={{ headerShown: false, title: "Store registration success" }} />
                        <Stack.Screen name={"passcode"} component={DevicePasscode}
                            navigationKey={"passcode"}
                            options={{
                                title: "NFT????????????Wallet?????????",
                            }} />
                        <Stack.Screen name={"accountComplete"} component={AccountComplete}
                            navigationKey={"account-complete"} options={{ headerShown: false }} />
                        <Stack.Screen component={AddMedicine} name="addMedicine"
                            navigationKey={"addMedicine"}
                            options={{
                                title: "??????????????????",
                                headerRight: () => {
                                    return (
                                        <StepOf total={3} current={1} />
                                    )
                                }
                            }} />
                        <Stack.Screen name={"editMedicine"} component={EditMedicine}
                            options={{ title: "??????????????????" }} />
                        <Stack.Screen name={"manageMedicine"} component={ManageMedicine}
                            options={{ title: "????????????" }} />
                        <Stack.Screen name={"deleteMedicine"} component={DeleteMedicine}
                            options={{ title: "????????????" }} />
                        <Stack.Screen component={RecordMedicine} name="recordMedicine"
                            options={{ title: '???????????????' }} />
                        <Stack.Screen component={MedicineHistory} name="medicineHistory"
                            options={{ title: '??????' }} />
                        <Stack.Screen name={"wallet"} options={{ title: "NFT????????????Wallet?????????" }} component={NewWallet}
                        />
                        <Stack.Screen name={"freeNFT"} component={FreeNFT} options={{ title: "???????????????????????????" }} />
                        <Stack.Screen name={"addedMed"} component={AddedList}
                            options={{ headerShown: false, title: "Added Medicines" }} />
                    </>
                ) : (
                    <>


                        <Stack.Screen component={UnAuthLanding} name="landing"
                            options={{ headerShown: false }} />
                        <Stack.Screen component={SignUpScreen} name="signup" navigationKey={"signup"}
                            options={{
                                title: "DrugN???????????????????????????",
                                headerRight: () => {
                                    return (
                                        <StepOf total={2} current={1} />
                                    )
                                }
                            }} />
                        <Stack.Screen name={"signin"} component={SignInScreen} options={{ title: "??????????????????" }} />
                        <Stack.Screen name={"otp"} component={OtpScreen} navigationKey={"otp"} options={{
                            title: "DrugN???????????????????????????",
                            headerRight: () => {
                                return <StepOf total={2} current={2} />
                            },
                        }} />
                    </>
                )}
                <Stack.Screen name={"TermsAndCondition"} component={TermsAndConditions} options={{ title: "??????????????????????????????????????????????????????" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}