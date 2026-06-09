import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

export default function DailyAttendanceScreen() {
  const [periodCount, setPeriodCount] =
    useState("");

  const [periods, setPeriods] =
  useState<number[]>([]);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
    >
      {!periods.length ? (
        <>
          <Text>
            Number of Periods Today
          </Text>

          <TextInput
            keyboardType="numeric"
            value={periodCount}
            onChangeText={setPeriodCount}
            style={{
              borderWidth: 1,
              padding: 10,
              marginVertical: 10,
            }}
          />

          <Button
  title="Generate"
  onPress={() => {
    const count =
      Number(periodCount);

    const generatedPeriods =
      Array.from(
        { length: count },
        (_, i) => i + 1
      );

    setPeriods(
      generatedPeriods
    );
  }}
/>
        </>
      ) : (
        <View>
  {periods.map(
    (period) => (
      <Text
        key={period}
        style={{
          marginVertical: 10,
        }}
      >
        Period {period}
      </Text>
    )
  )}
</View>
      )}
    </ScrollView>
  );
}