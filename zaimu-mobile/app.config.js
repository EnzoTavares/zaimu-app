import 'dotenv/config';

export default {
    "expo": {
        "name": "zaimu-mobile",
        "slug": "zaimu-mobile",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/images/icon.png",
        "scheme": "zaimumobile",
        "userInterfaceStyle": "automatic",
        "newArchEnabled": true,
        "ios": {
            "supportsTablet": true
        },
        "extra": {
            apiUrl: process.env.API_URL,
        }
    },
    "android": {
        "adaptiveIcon": {
            "foregroundImage": "./assets/images/adaptive-icon.png",
            "backgroundColor": "#ffffff"
        },
        "edgeToEdgeEnabled": true
    },
    "web": {
        "bundler": "metro",
        "output": "static",
        "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
        "expo-router",
        [
            "expo-splash-screen",
            {
                "image": "./assets/images/splash-icon.png",
                "imageWidth": 200,
                "resizeMode": "contain",
                "backgroundColor": "#ffffff"
            }
        ]
    ],
    "experiments": {
        "typedRoutes": true
    }
};
