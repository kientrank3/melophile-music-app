import { colors } from "@/constants/Tokens";
import { useEffect, useState } from "react";
import { getColors } from "react-native-image-colors";
import {
  IOSImageColors,
  AndroidImageColors,
  WebImageColors,
} from "react-native-image-colors/build/types";
import { Platform } from "react-native";

type ImageColors = IOSImageColors | AndroidImageColors | WebImageColors | null;

export const usePlayerBackground = (imageUrl: string) => {
  const [imageColors, setImageColors] = useState<ImageColors>(null);

  useEffect(() => {
    const fetchColors = async () => {
      if (Platform.OS === "web") {
        // Web-specific color handling with a default background color
        const webColors: WebImageColors = {
          dominant: colors.background,
          vibrant: colors.background,
          darkVibrant: colors.background,
          lightVibrant: colors.background,
          darkMuted: colors.background,
          lightMuted: colors.background,
          muted: colors.background,
          platform: "web",
        };
        setImageColors(webColors);
      } else {
        const colorsResult = await getColors(imageUrl, {
          fallback: colors.background,
          cache: true,
          key: imageUrl,
        });
        setImageColors(colorsResult as IOSImageColors | AndroidImageColors);
      }
    };

    fetchColors();
  }, [imageUrl]);

  return { imageColors };
};
