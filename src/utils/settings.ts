export type RootParamList = {
    landing: undefined,
    dashboard: { redirectUri?: string },
    signup: any,
    signin: any,
    otp: { redirectUri: string, sessionID: string },
    accountComplete: any,
    passcode: { redirectUri: string },
    storeRegistration: any
    storeRegistrationSuccess: any,
    addMedicine: any,
    editMedicine: any,
    manageMedicine: any,
    recordMedicine: any,
    deleteMedicine: any
    profile: any,
    wallet: any,
    freeNFT: any,
    addedMed: any,
    Home: any,
    Nft: any,
    Account: any,
    MedicineList: any,
    TermsAndCondition:any
}
export type BottomTab = {
    Home: any;
    Account: any;
    Nft: any;
    MedicineList: any
}
export const ourTheme = {
    "colors": {
        "primary": "rgb(148, 204, 255)",
        "onPrimary": "rgb(0, 51, 82)",
        "primaryContainer": "rgb(0, 75, 116)",
        "onPrimaryContainer": "rgb(205, 229, 255)",
        "secondary": "rgb(185, 200, 218)",
        "onSecondary": "rgb(35, 50, 64)",
        "secondaryContainer": "transparent",
        "onSecondaryContainer": "rgb(212, 228, 246)",
        "tertiary": "rgb(210, 191, 231)",
        "onTertiary": "rgb(56, 42, 74)",
        "tertiaryContainer": "rgb(79, 64, 97)",
        "onTertiaryContainer": "rgb(237, 220, 255)",
        "error": "rgb(255, 180, 171)",
        "onError": "rgb(105, 0, 5)",
        "errorContainer": "rgb(147, 0, 10)",
        "onErrorContainer": "rgb(255, 180, 171)",
        "background": "rgb(26, 28, 30)",
        "onBackground": "rgb(226, 226, 229)",
        "surface": "rgb(26, 28, 30)",
        "onSurface": "rgb(226, 226, 229)",
        "surfaceVariant": "rgb(66, 71, 78)",
        "onSurfaceVariant": "rgb(194, 199, 207)",
        "outline": "rgb(88, 88, 88)",
        "outlineVariant": "rgb(45, 43, 60)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "#d4d600",
        "inverseSurface": "rgb(226, 226, 229)",
        "inverseOnSurface": "rgb(47, 48, 51)",
        "inversePrimary": "rgb(0, 99, 153)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(12,10,30)",
            "level2": "rgb(13,11,43)",
            "level3": "rgb(22, 19, 54)",
            "level4": "rgb(41, 49, 57)",
            "level5": "rgb(43, 53, 62)"
        },
        "surfaceDisabled": "rgba(226, 226, 229, 0.12)",
        "onSurfaceDisabled": "rgba(226, 226, 229, 0.38)",
        "backdrop": "rgba(43, 49, 55, 0.1)",
    }
}
export const colors = {
    white: "#FFFFFF",
    mutedWhite: "#F8F4F4",
    black: '#000000',
    primary: "#48A8EF",
    background: "#0A062B",
    background2: '#1B2036',
    text: "#FFFFFF",
    textDark: "rgba(255, 255, 255, 0.301961)",
    textDarker: "rgba(0, 0, 0, 0.46)",
    red: "#FF3633",
    blue: "#2222DD",
    grayBorder: "#585858",
    primaryBorder: "#47C3E8",
    textInputIconBackground: "#1B192E",
    textSemiDark: "#C1C1C1",
    navBackground: "#131426",
    inactive: "rgb(112,112,112)",
    primary2: "#4BA9BE",
    onBackgroundSpace: "#293658",
    grey_background: "#1C2037"
}