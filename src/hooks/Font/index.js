import { useFonts } from "expo-font";
import { createContext, useContext } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const FontContext = createContext({});

export function FontProvider({ children }) {
    const [loaded, error] = useFonts({
        regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
        bold:   require("../../assets/fonts/Montserrat-Bold.ttf"),
        black:  require("../../assets/fonts/Montserrat-Black.ttf"), 
        semibold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
        ligth: require("../../assets/fonts/Montserrat-Light.ttf"),
        medium: require("../../assets/fonts/Montserrat-Medium.ttf"),
        thim: require("../../assets/fonts/Montserrat-Thin.ttf"),
        extraligth: require("../../assets/fonts/Montserrat-ExtraLight.ttf"),
        italic: require("../../assets/fonts/Montserrat-Italic.ttf"),
        bolditalic: require("../../assets/fonts/Montserrat-BoldItalic.ttf"),
        blackitalic: require("../../assets/fonts/Montserrat-BlackItalic.ttf"),
    });


    if (!loaded && !error) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 28, marginTop: 15 }}>Carregando as Fontes</Text>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    
    return (<FontContext.Provider value={{ loaded }}>{children}</FontContext.Provider>)
}

export function useFont() {
    const context = useContext(FontContext)
    if (!context) {
        throw new Error("useFont must be used within a FontProvider");
    }
    return context;
}
