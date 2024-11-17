declare module "*.png";
declare module "*.jpg";
declare module "react-native-color-grabber" {
  export default class ColorGrabber {
    static getColorsFromUrl(
      url: string,
      options?: { palette?: boolean }
    ): Promise<{ colors: string[] }>;
  }
}

export type LibraryParamList = {
  index: undefined;
  "userLibrary/index": undefined;
  "userSettings/index": undefined;
};
