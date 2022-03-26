import {
	Animated,
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	View
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { plantsData } from "./data";
import { LinearGradient } from "expo-linear-gradient";
import {
	Directions,
	FlingGestureHandler,
	State
} from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");

export const bigCardWidth = 0.5 * width;
export const smallCardWidth = 0.15 * width;

const Cards = () => {
	const scrollXIndex = useRef(new Animated.Value(0)).current;
	const scrollX = useRef(new Animated.Value(0)).current;
	const [index, setIndex] = useState(0);

	useEffect(() => {
		Animated.spring(scrollX, {
			toValue: scrollXIndex,
			useNativeDriver: false,
			bounciness: 1
		}).start();
	});

	const setActiveIndex = useCallback(
		activeIndex => {
			setIndex(activeIndex);
			scrollXIndex.setValue(activeIndex);
		},
		[index]
	);

	return (
		<FlingGestureHandler
			key='right'
			direction={Directions.RIGHT}
			onHandlerStateChange={event => {
				if (event.nativeEvent.state === State.END) {
					if (index === 0) {
						return;
					}

					setActiveIndex(index - 1);
				}
			}}
		>
			<FlingGestureHandler
				key='left'
				direction={Directions.LEFT}
				onHandlerStateChange={event => {
					if (event.nativeEvent.state === State.END) {
						if (index === plantsData.length - 1) {
							return;
						}

						setActiveIndex(index + 1);
					}
				}}
			>
				<Animated.FlatList
					style={styles.flatlist}
					contentContainerStyle={styles.contentContainer}
					horizontal
					scrollEnabled={false}
					showsHorizontalScrollIndicator={false}
					data={plantsData}
					keyExtractor={item => item.name}
					decelerationRate='fast'
					snapToInterval={0.2 * width}
					renderItem={({ item, index }) => {
						const inputRange = [
							index - 2,
							index - 1,
							index,
							index + 1,
							index + 2
						];

						const animatedWidth = scrollX.interpolate({
							inputRange,
							outputRange: [
								smallCardWidth,
								smallCardWidth,
								bigCardWidth,
								smallCardWidth,
								smallCardWidth
							]
						});

						const scale = scrollX.interpolate({
							inputRange,
							outputRange: [1, 1, 1.07, 1, 1]
						});

						const translateY = scrollX.interpolate({
							inputRange,
							outputRange: [100, 100, 0, 100, 100]
						});

						const bottom = scrollX.interpolate({
							inputRange,
							outputRange: [40, 40, 55, 40, 40]
						});

						const opacity = scrollX.interpolate({
							inputRange,
							outputRange: [0, 0, 1, 0, 0]
						});

						const marginHorizontal = scrollX.interpolate({
							inputRange,
							outputRange: [5, 5, 10, 5, 5]
						});

						const rotate = scrollX.interpolate({
							inputRange,
							outputRange: ["-90deg", "-90deg", "-0deg", "-90deg", "-90deg"]
						});

						return (
							<Animated.View
								style={[
									styles.card,
									{
										width: animatedWidth,
										marginHorizontal,
										transform: [{ scale }]
									}
								]}
							>
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
										style={[styles.title, { bottom, transform: [{ rotate }] }]}
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
			</FlingGestureHandler>
		</FlingGestureHandler>
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
		paddingRight: 0.2 * width,
		marginLeft: 5
	},
	card: {
		borderRadius: 15,
		height: bigCardWidth,
		overflow: "hidden",
		position: "relative"
	},
	image: {
		position: "absolute",
		height: "100%",
		width: "100%",
		resizeMode: "cover"
	},
	linearGradient: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "flex-end",
		alignItems: "center",
		padding: 20
	},
	title: {
		fontSize: 13,
		fontWeight: "bold",
		width: bigCardWidth,
		textTransform: "uppercase",
		color: "#f7f7f7",
		marginBottom: 10,
		textAlign: "center",
		position: "absolute"
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
		bottom: 25
	}
});
