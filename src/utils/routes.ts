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
            storeRegistration: "/store-registration",
            storeRegistrationSuccess: "store-registration/success",
            addMedicine: "add-medicine",
            manageMedicine: "manage-medicine"
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