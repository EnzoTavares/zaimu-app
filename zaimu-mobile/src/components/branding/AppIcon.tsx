import React from "react";
import {Image} from "expo-image";
import icons from "@/src/constants/icons";

type AppIconProps = {
    height: number,
    width: number,
}

const AppIcon = (props: AppIconProps) => {
    return (
        <Image
            source={icons['appIcon']}
            style={[
                {
                    height: props.height,
                    width: props.width,
                    borderRadius: (props.height) / 4,
                }
            ]}
        />
    );
}

export default AppIcon;
