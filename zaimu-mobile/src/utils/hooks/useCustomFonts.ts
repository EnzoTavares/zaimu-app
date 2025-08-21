import * as Font from "expo-font";
import { fontFamily } from "@/src/themes/typography"

import {useEffect, useState} from 'react'

export function useCustomFonts() {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        Font.loadAsync({
            [fontFamily.thin]: require("@/src/assets/fonts/LeagueSpartan-Thin.ttf"),
            [fontFamily.extraLight]: require("@/src/assets/fonts/LeagueSpartan-ExtraLight.ttf"),
            [fontFamily.light]: require("@/src/assets/fonts/LeagueSpartan-Light.ttf"),
            [fontFamily.regular]: require("@/src/assets/fonts/LeagueSpartan-Regular.ttf"),
            [fontFamily.medium]: require("@/src/assets/fonts/LeagueSpartan-Medium.ttf"),
            [fontFamily.semiBold]: require("@/src/assets/fonts/LeagueSpartan-SemiBold.ttf"),
            [fontFamily.bold]: require("@/src/assets/fonts/LeagueSpartan-Bold.ttf"),
            [fontFamily.extraBold]: require("@/src/assets/fonts/LeagueSpartan-ExtraBold.ttf"),
            [fontFamily.black]: require("@/src/assets/fonts/LeagueSpartan-Black.ttf"),
        }).then(() => setLoaded(true))
    }, [])

    return loaded
}