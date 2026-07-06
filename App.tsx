import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { useAuthListener } from "./src/hooks/useAuthListener";

export default function App() {
  useAuthListener();

  return <AppNavigator />;
}