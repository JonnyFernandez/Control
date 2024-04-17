import { useContext  } from "react";
import { AuthContex } from "./AuthContext";

export const useAuth = () => useContext(AuthContex)