import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";

type CardProps = {
  title: string;
  imageUrl: string;
  bgColor: string;
};
export const TrackListGenre: React.FC<CardProps> = ({
  title,
  imageUrl,
  bgColor,
}) => {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: bgColor }]}>
      <Text style={styles.title}>{title}</Text>

      <Image
        className="shadow-lg"
        source={{ uri: imageUrl }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 90,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    overflow: "hidden",
  },
  title: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  image: {
    width: 70,
    height: 70,
    marginEnd: -20,
    alignSelf: "flex-end",
    borderRadius: 5,
    transform: [{ rotate: "24deg" }],
  },
});
