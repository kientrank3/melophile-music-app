import unknownArtistImage from "@/assets/images/unknown_artist.png";
import unknownTrackImage from "@/assets/images/unknown_track.png";
import { Image } from "react-native";

export const unknownTrackImageUri =
  Image.resolveAssetSource(unknownTrackImage).uri;
export const unknownArtistImageUri =
  Image.resolveAssetSource(unknownArtistImage).uri;
