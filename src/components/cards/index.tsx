import {
	Animated,
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	View
} from "react-native";
import React, { useRef } from "react";
import { plantsData } from "./data";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("screen");

export const bigCardWidth = 0.6 * width;
export const smallCardWidth = 0.2 * width;

const Cards = () => {
	const scrollX = useRef(new Animated.Value(0)).current;

	return (
		<Animated.FlatList
			style={styles.flatlist}
			contentContainerStyle={styles.contentContainer}
			horizontal
			inverted
			onScroll={Animated.event(
				[{ nativeEvent: { contentOffset: { x: scrollX } } }],
				{ useNativeDriver: false }
			)}
			showsHorizontalScrollIndicator={false}
			data={plantsData}
			keyExtractor={item => item.name}
			decelerationRate='fast'
			snapToInterval={0.2 * width}
			renderItem={({ item, index }) => {
				const inputRange = [
					(index - 2) * 0.2 * width,
					(index - 1) * 0.2 * width,
					index * 0.2 * width,
					(index + 1) * 0.2 * width,
					(index + 3) * 0.2 * width
				];

				const animatedWidth = scrollX.interpolate({
					inputRange,
					outputRange: [
						0.2 * width,
						0.2 * width,
						0.6 * width,
						0.2 * width,
						0.2 * width
					]
				});

				const scale = scrollX.interpolate({
					inputRange,
					outputRange: [1, 1, 1.1, 1, 1]
				});

				const translateY = scrollX.interpolate({
					inputRange,
					outputRange: [100, 100, 0, 100, 100]
				});

				const translateX = scrollX.interpolate({
					inputRange,
					outputRange: [
						-0.6 * width,
						-0.6 * width,
						0,
						-0.2 * width,
						-0.2 * width
					]
				});

				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0, 0, 1, 0, 0]
				});

				const rotate = scrollX.interpolate({
					inputRange,
					outputRange: ["-90deg", "-90deg", "-0deg", "-90deg", "-90deg"]
				});

				return (
					<Animated.View style={[styles.card, { width: animatedWidth }]}>
						<Image source={item.image} style={styles.image} />
						<LinearGradient
							colors={["rgba(0,0,0,0.8)", "#rgba(0,0,0,0)"]}
							start={{
								x: 0.5,
								y: 1
							}}
							end={{
								x: 0.5,
								y: 0
							}}
							style={styles.linearGradient}
						>
							<Animated.Text
								style={[styles.title, { transform: [{ rotate }] }]}
							>
								{item.name}
							</Animated.Text>
							<Animated.Text
								style={[
									styles.description,
									{ opacity, transform: [{ translateY }] }
								]}
							>
								{item.description}
							</Animated.Text>
						</LinearGradient>
					</Animated.View>
				);
			}}
		/>
	);
};

export default Cards;

const styles = StyleSheet.create({
	flatlist: {
		height: bigCardWidth + 20
	},
	contentContainer: {
		justifyContent: "center",
		alignItems: "center",
		paddingRight: 0.2 * width
	},
	card: {
		marginHorizontal: 10,
		borderRadius: 15,
		height: bigCardWidth,
		overflow: "hidden"
	},
	image: {
		...StyleSheet.absoluteFillObject
	},
	linearGradient: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "flex-end",
		alignItems: "center",
		padding: 20
	},
	title: {
		fontSize: 15,
		width: "100%",
		fontWeight: "bold",
		textTransform: "uppercase",
		color: "#f7f7f7",
		marginBottom: 10,
		textAlign: "center",
		position: "absolute",
		left: "10%",
		bottom: "35%"
	},
	description: {
		fontSize: 10,
		textTransform: "capitalize",
		color: "#f7f7f7",
		textAlign: "center",
		height: "20%",
		position: "absolute",
		width: "100%",
		left: "10%",
		bottom: "15%"
	}
});
