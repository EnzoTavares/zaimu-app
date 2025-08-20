import colors from '@/src/themes/colors'
import {fontSizes, lineHeights} from "@/src/themes/dimensions";

export const fontFamily = {
    thin: 'LeagueSpartan_Thin',
    extraLight: 'LeagueSpartan_ExtraLight',
    light: 'LeagueSpartan_Light',
    regular: 'LeagueSpartan_Regular',
    medium: 'LeagueSpartan_Medium',
    semiBold: 'LeagueSpartan_SemiBold',
    bold: 'LeagueSpartan_Bold',
    extraBold: 'LeagueSpartan_ExtraBold',
    black: 'LeagueSpartan_Black',
} as const

export const fontStyles = {
    mark: {
        fontFamily: fontFamily.bold,
    },
    callout: {
        fontFamily: fontFamily.regular,
        fontSize: fontSizes.xl,
        lineHeight: lineHeights.loose,
        color: colors.black,
    },
    main: {
        fontFamily: fontFamily.medium,
        fontSize: fontSizes.lg,
        lineHeight: lineHeights.relaxed,
        color: colors.darkGrey,
    },
    assistanceMedium: {
        fontFamily: fontFamily.medium,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.normal,
        color: colors.darkGrey,
    },
    assistanceRegular: {
        fontFamily: fontFamily.regular,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.snug,
        color: colors.darkGrey,
    },
    example: {
        fontFamily: fontFamily.regular,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.normal,
        color: colors.greyLight,
    },
    smallest: {
        fontFamily: fontFamily.regular,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.tight,
        color: colors.black,
    },
    error: {
        fontFamily: fontFamily.medium,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.tight,
        color: colors.error,
    },
} as const