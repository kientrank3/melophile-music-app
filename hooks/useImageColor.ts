import { useEffect, useState } from "react";
import { Image } from "react-native";
import ColorGrabber from "react-native-color-grabber";

interface ColorResult {
  colors: string[];
}

const useImageColors = (imageUri: string | null) => {
  const [colors, setColors] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchColors = async () => {
    try {
      const result: ColorResult = await ColorGrabber.getColorsFromUrl(
        imageUri!,
        {
          palette: true,
        }
      );
      setColors(result.colors);
    } catch (err) {
      setError("Lỗi khi lấy màu từ hình ảnh");
      console.error(err);
    }
  };

  useEffect(() => {
    if (imageUri) {
      fetchColors();
    }
  }, [imageUri]);

  return { colors, error };
};

export default useImageColors;
