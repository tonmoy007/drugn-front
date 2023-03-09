export const linking = {
    config: {
        screens: {
            landing: '/landing',
            dashboard: {
                path: "/dashboard",
                screens: {
                    Home: "/home",
                    Account: "/accounts",
                    Nft: "/nft",
                    MedicineList: "/medicine-list"
                }
            },
            signup: '/signup',
            signin: "/sign-in",
            otp: "/otp",
            accountComplete: "/account-complete",
            passcode: "/passcode",
            storeRegistration: "/store-registration",
            storeRegistrationSuccess: "/store-registration/success",
            addMedicine: "/add-medicine",
            editMedicine: "/edit-medicine",
            manageMedicine: "/manage-medicine",
            recordMedicine: "/record-medicine",
            medicineHistory: "/medicine-history",
            deleteMedicine: "/delete-medicine",
            profile: "/profile",
            wallet: "/wallet",
            freeNFT: "/free-nft",
            addedMed: "/added-medicine",
            TermsAndCondition: "/dashboard/accounts/terms-of-use",
        }
    },
    prefixes: []
}
export const DashboardLinking = {
    config: {
        screens: {
            Home: "/home",
            Account: "/account",
            Nft: "/nfg",
            MedicineList: "/medicine-list"
        }
    }
}