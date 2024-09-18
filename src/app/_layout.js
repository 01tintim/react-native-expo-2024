import { Slot, Stack, useSegments, router } from "expo-router";
import { AppProvider } from "../hooks";
import { useAuth } from "../hooks/Auth";
import { useEffect } from "react";


const StackLayout = () => {
  const { user } = useAuth();
  const segments = useSegments();

  useEffect(() => {

    if (user.autenticated === true) {
      router.replace("(protected)");
    } else {
      if (router.canGoBack()) {
        router.back();
        if (router.canGoBack()) router.back();
      } else {
        router.replace("/");
      }
    }
  }, [user]);

  return (
    <Stack>
      <Stack.Screen name="index" Options={{ herderShown: false }} />
      <Stack.Screen name="(protected)" Options={{ herderShown: false }} />
    </Stack>
  );

};

export default function Layout() {


  const StackRoot = () => {

    return (
      <AppProvider>
        <StackLayout />
      </AppProvider>
    );
  }

  return (
    <AppProvider>
      <StackRoot />
    </AppProvider>
  );
}