import { createContext, useContext, useEffect, useState } from "react";
import { useUserDatabase } from "../../database/useUsersDatabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

export const Role = {
  SUPER: "SUPER",
  ADM: "ADM",
  USER: "USER"
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    autenticated: false,
    user: null,
    role: null
  });


  const { authUser } = useUserDatabase();

 useEffect(() => {
    const loadStorageData = async () => {
      const storageUser = await AsyncStorage.getItem("@payment:user");

      if (storageUser) {
        setUser({
          autenticated: true,
          user: JSON.parse(storageUser),
          role: JSON.parse(storageUser).role,
        });
      }
    };
    setUser({
      autenticated: false,
      user: null,
      role: null,
    });
    loadStorageData();
  }, []);
    
  


  const signIn = async ({ email, password }) => {
    const response = await authUser({ email, password });
    console.log(!response);


    if (!response){
      setUser({
        autenticated: false,
        user: null,
        role: null,
      })
      throw new Error("Usuário ou senha inválidos");
      ;
    }

    await AsyncStorage.setItem("@payment:user", JSON.stringify(response));


    setUser({
      autenticated: true,
      user: response,
      role: response.role,
    });


  };

  const signOut = async () => {
    await AsyncStorage.removeItem("@payment:user");
    setUser({
      autenticated: false,
      user: null,
      role: null,
    });
  };


  useEffect(() => {
    console.log("AuthProvider: ", user);
  }, [user]);

  if (user.autenticated === null) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 28, marginTop: 15 }}>
              Carregando Dados do Usuário
              </Text>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    );
}


  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}


