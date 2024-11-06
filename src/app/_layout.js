import { Slot, Stack, useSegments, router } from "expo-router";
import { AppProvider } from "../hooks";
import { useAuth } from "../hooks/Auth";
import { useEffect } from "react";


const StackLayout = () => {
  const { user } = useAuth();
  const segments = useSegments();

  useEffect(() => {

    if (!user?.autenticated){
      router.replace("signin")
    } else {
      router.replace("(protected)");
    }
  }, [user]);

  return (
    <Stack>
      <Stack.Screen name="signin" Options={{ herderShown: false }} />
      <Stack.Screen name="about" Options={{ herderShown: false }} />
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