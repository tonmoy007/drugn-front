import { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../utils/settings';
import { IconButton } from 'react-native-paper';
import { FBox } from '../../components/globals/fbox';
import UserProfileUpperTabs from "../../components/profile2/tab_2";
import UserProfileUpperSection from "../../components/profile2/profile-upper";
import UserProfileLowerListItem from "../../components/profile2/profile-lower-list-item";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../utils/store/global";
import { logout } from "../../utils/store/user";
import { toastMessage } from "../../utils/toast";

interface ProfileListItem {
    title: string;
    subTitle?: string;
    progress?: number,
    onPress?: () => void,
    type?: string;
}

export default function UserProfile2({ navigation }) {
    const user = useSelector((state: GlobalState) => state.user);
    const dispatch = useDispatch();

    const [profileListItem, setProfileListItem] = useState<ProfileListItem[]>([
        {
            title: "Mail",
            subTitle: user?.email
        },
        {
            title: "Member Type",
            subTitle: "DrugnN Pilot",
        },
        {
            title: "Activation Code",
            subTitle: "",
        },
        {
            title: "連続服用日数",
            subTitle: "未実装"
        },
        {
            title: "総服用日数",
            subTitle: "未実装",
        },
        {
            title: "Chain Type ",
            subTitle: "Symbol",
        },
        {
            title: "Daily Donation",
            progress: 0,
            onPress: async () => {
                await toastMessage({ msg: "Coming Soon" })
            }
        },
        {
            title: "Fee Donation",
            progress: 0,
            onPress: async () => {
                await toastMessage({ msg: "Coming Soon" })
            }
        },
        {
            title: "Google Authenticateor",
            onPress: async () => {
                await toastMessage({ msg: "Google Authenticator（Google認証システム）とは、Googleが提供する二段階認証（二要素認証）を行うためのトークンソフトウェア（アプリ）です。" })
            }
        },
        {
            title: "利用規約（特定商取引法に基づく表示）",
            onPress: () => {
                navigation.navigate("TermsAndCondition")
            }
        },
        {
            title: "プライバシーポリシー"
        },
        {
            title: "オープンデータ"
        },
        {
            title: "バージョン"
        },
        {
            title: "Logout",
            type: "button",
            onPress: () => {
                dispatch(logout())
            }
        }
    ]);
    useEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => (
                <IconButton icon={"close"} iconColor={colors.white} onPress={handleBackNav} />
            )
        });
    }, []);

    const handleBackNav = () => {
        if (navigation.canGoBack())
            navigation.goBack()
        else
            navigation.replace('dashboard')
    }

    return (
        <FBox style={styles.rowContainer}>
            <ScrollView>
                <UserProfileUpperSection />
                <UserProfileUpperTabs />
                <FBox style={{ paddingBottom: 40 }} />
                <FlatList keyExtractor={(item) => item.title} data={profileListItem} renderItem={({ item, index }) => {
                    return <UserProfileLowerListItem item={item} />
                }} />
            </ScrollView>
        </FBox>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        display: 'flex'
    },
    subContainer: {
        width: '94%',
        margin: 'auto',
        marginTop: 10
    }
});
