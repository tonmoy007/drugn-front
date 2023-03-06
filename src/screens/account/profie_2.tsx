import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {colors} from '../../utils/settings';
import {IconButton} from 'react-native-paper';
import {FBox} from '../../components/globals/fbox';
import UserProfileUpperTabs from "../../components/profile2/tab_2";
import UserProfileUpperSection from "../../components/profile2/profile-upper";
import UserProfileLowerListItem from "../../components/profile2/profile-lower-list-item";
import {useSelector} from "react-redux";
import {GlobalState} from "../../utils/store/global";

export default function UserProfile2({navigation}) {
    const user = useSelector((state: GlobalState) => state.user);
    const [profileListItem, setProfileListItem] = useState([
        {
            title: "Mail",
            subTitle: user?.email
        },
        {
            title: "Member Type",
            subTitle: "HARMACY SUPPOTER",
        },
        {
            title: "Activation Code",
            subTitle: "",
        },
        {
            title: "Total Take medicine’s Day (連続)",
            subTitle: "120days"
        },
        {
            title: "Total Take medicine’s Day (始めてから)",
            subTitle: "120days",
        },
        {
            title: "Chain Type ",
            subTitle: "Symbol",
        },
        {
            title: "Daily Donation",
            progress: .40
        },
        {
            title: "Fee Donation",
            progress: .60
        },
        {
            title: "Google Authenticateor"
        },
        {
            title: "利用規約"
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
    ]);
    useEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => (
                <IconButton icon={"close"} iconColor={colors.white} onPress={handleBackNav}/>
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
                <UserProfileUpperSection/>
                <UserProfileUpperTabs/>

                <FBox style={{paddingBottom: 40}}/>
                {profileListItem.map((item) => {
                    return <UserProfileLowerListItem item={item}/>;
                })}
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
