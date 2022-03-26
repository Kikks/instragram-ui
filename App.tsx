import { StatusBar } from "expo-status-bar";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Cards, { bigCardWidth } from "./src/components/cards";

const { width } = Dimensions.get("screen");

export default function App() {
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<Text style={styles.title}>Interactive Cards</Text>
				<View style={styles.flatlistContainer}>
					<Cards />
				</View>
				<StatusBar style='auto' />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center"
	},
	safeArea: {
		flex: 1
	},
	title: {
		fontSize: 40,
		color: "#6EC1B8",
		fontWeight: "800",
		marginLeft: 20
	},
	flatlistContainer: {
		height: bigCardWidth + 50,
		alignItems: "flex-end",
		justifyContent: "center",
		marginTop: 30,
		shadowColor: "#000",
		shadowOffset: {
			height: 10,
			width: 0
		},
		shadowRadius: 10,
		shadowOpacity: 0.2
	}
});
