import Login from "@/components/Auth/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Komal Shrestha",
};

export default function LoginPage() {
  return <Login />;
}
