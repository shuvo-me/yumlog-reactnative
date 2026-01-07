import React from "react";
import { Text, View } from "react-native";

type FoodDetailsProps = {
  id: string | string[];
};

const FoodDetails: React.FC<FoodDetailsProps> = ({ id }) => {
  return (
    <View>
      <Text style={{ fontSize: 30, color: "white" }}>FoodDetails</Text>
    </View>
  );
};

export default FoodDetails;
