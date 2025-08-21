export const spacing = {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    mmd: 12,
    md: 16,
    lg: 24,
    xx: 32,
    xl: 40,
    xxl: 48,
    xxxl: 64,
} as const

export const fontSizes = {
    xs: 12,
    sm: 14,
    md: 18,
    lg: 24,
    xl: 32,
} as const

export const lineHeights = {
    tight: 14,
    snug: 18,
    normal: 20,
    middle: 24,
    relaxed: 28,
    loose: 50,
} as const

export const screenSpace = {
    padding: {
        paddingHorizontal: 24,
    },
    margin: {
        marginHorizontal: 24,
    },
}

// export const layouts = {
//     flexContainer: {
//         flex: 1,
//         flexDirection: 'column' as const,
//         justifyContent: 'flex-start' as const,
//         alignItems: 'stretch' as const,
//     },
//     flexRow: {
//         flexDirection: 'row' as const,
//         alignItems: 'center' as const,
//     },
//     flexCenter: {
//         flex: 1,
//         justifyContent: 'center' as const,
//         alignItems: 'center' as const,
//     },
//     flexBetween: {
//         flexDirection: 'row' as const,
//         justifyContent: 'space-between' as const,
//         alignItems: 'center' as const,
//     },
// }