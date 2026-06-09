import {
  View,
  Text,
} from "react-native";

import { useSemesterStore }
from "../../store/semesterStore";

export default function DashboardScreen() {

  const semester =
    useSemesterStore(
      (state) => state.semester
    );

  return (
    <View
      style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      }}
    >
      <Text>
        {semester?.name ??
          "No Semester"}
      </Text>
    </View>
  );
}