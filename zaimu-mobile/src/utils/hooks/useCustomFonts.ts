import * as Font from "expo-font";
import { fontFamily } from "@/src/themes/typography"

import {useEffect, useState} from 'react'

export function useCustomFonts() {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        Font.loadAsync({
            [fontFamily.thin]: require("@/assets/fonts/LeagueSpartan-Thin.ttf"),
            [fontFamily.extraLight]: require("@/assets/fonts/LeagueSpartan-ExtraLight.ttf"),
            [fontFamily.light]: require("@/assets/fonts/LeagueSpartan-Light.ttf"),
            [fontFamily.regular]: require("@/assets/fonts/LeagueSpartan-Regular.ttf"),
            [fontFamily.medium]: require("@/assets/fonts/LeagueSpartan-Medium.ttf"),
            [fontFamily.semiBold]: require("@/assets/fonts/LeagueSpartan-SemiBold.ttf"),
            [fontFamily.bold]: require("@/assets/fonts/LeagueSpartan-Bold.ttf"),
            [fontFamily.extraBold]: require("@/assets/fonts/LeagueSpartan-ExtraBold.ttf"),
            [fontFamily.black]: require("@/assets/fonts/LeagueSpartan-Black.ttf"),
        }).then(() => setLoaded(true))
    }, [])

    return loaded
}