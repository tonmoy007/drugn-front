import {Dimensions} from "react-native";
import { colors } from "./settings";

const {width, height} = Dimensions.get("window")
export const ScreenWidth = width
export const ScreenHeight = height;
export const medIcons = {
    1: colors.white,
    2: colors.primary2,
    3: colors.primary,
    4:  colors.textSemiDark,
    5: colors.red,
    6: colors.onBackgroundSpace
}
export const medTime = {
   1: { label: "朝：食直後", value: "朝：食直後", id: 1 },
    2: { label: "朝：食後", value: "朝：食後" , id: 2},
   3: { label: "食間(午前）", value: "食間(午前）" , id: 3},
    4:{ label: "昼：食前", value: "昼：食前" , id: 4},
    5:{ label: "昼：食直前", value: "昼：食直前" , id: 5},
    6: { label: "昼：食直後", value: "昼：食直後", id: 6 },
   7: { label: "昼：食後", value: "昼：食後" , id: 7},
   8: { label: "食間(午後）", value: "食間(午後）", id: 8 },
   9: { label: "夜：食前", value: "夜：食前", id: 9 },
    10: { label: "夜：食直前", value: "夜：食直前", id: 10 },
    11:{ label: "夜：食直後", value: "夜：食直後", id: 11 },
   12: { label: "夜：食後", value: "夜：食後", id: 12 },
   13: { label: "起床時", value: "起床時", id: 13 },
   14: { label: "寝る前", value: "寝る前" , id: 14},
    15:{ label: "頓服", value: "頓服", id: 15 },
   16: { label: "発熱時", value: "発熱時", id: 16 },
}
export const jpTime = {
    morning: '朝',
    afternoon: '昼',
    night: '夜',
    any: '発熱時'
}