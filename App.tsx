import React from "react";

import AppNavigator from "./src/navigation/AppNavigator";

import { useAuthListener } from "./src/hooks/useAuthListener";

import { useInitialData } from "./src/hooks/useInitialData";

export default function App() {
  useAuthListener();

  useInitialData();

  return <AppNavigator />;
}