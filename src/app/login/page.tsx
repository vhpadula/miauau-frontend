"use client";
import { TitleLogo, Input, Button } from "@/components";
import { register, login } from "@/services/authService";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Login() {
  const router = useRouter();
  const { login: contextLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [tryingToLogin, setTryingToLogin] = useState(false);
  const [tryingToRegister, setTryingToRegister] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState("");

  const isMobile = window.innerWidth < 768;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email é obrigatório");
    } else if (!password) {
      setPasswordError("Senha é obrigatória");
    } else {
      setEmailError("");
      setPasswordError("");
      setTryingToLogin(true);
      try {
        const response = await login({
          login: email,
          password: password,
        });
        contextLogin(response.token);
        router.push("/"); //ajustar pro lugar correto
        setRegisterSuccessMessage("Login realizado com sucesso!");
      } catch (error) {
        console.log(error);
        setRegisterErrorMessage(
          "Erro ao fazer login. Verifique as suas credenciais."
        );
      } finally {
        setTryingToLogin(false);
      }
    }
  };

  const handleRegister = async () => {
    setRegisterErrorMessage("");
    setRegisterSuccessMessage("");

    if (!email || !password) {
      setRegisterErrorMessage("Preencha todos os campos");
      return;
    }

    setTryingToRegister(true);

    try {
      const response = await register({
        login: email,
        password: password,
      });
      setRegisterSuccessMessage(
        "Cadastro realizado com sucesso! Prossiga com o login."
      );
    } catch (error) {
      setRegisterErrorMessage("Erro ao cadastrar. Tente novamente.");
    } finally {
      setTryingToRegister(false);
    }
  };

  return (
    <>
      <main className="h-screen">
        <div className="flex flex-col items-center h-screen bg-gray-100 pt-24">
          <TitleLogo size="l" ongTextColor="primary" />
          <div className="flex flex-col bg-white border border-gray-400 rounded-lg m-2 max-h-screen px-11 pt-5 pb-14 w-4/5 sm:w-2/3 md:w-1/4">
            <form onSubmit={handleSubmit} className="grid gap-5">
              <Input
                labelIconSrc="/icons/mail.svg"
                label="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                placeholder="email@email.com"
                className="text-black"
                variant="login"
                required
              />
              <Input
                labelIconSrc="/icons/lock.svg"
                label="Senha"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                placeholder="Digite sua senha"
                type="password"
                className="text-black"
                variant="login"
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <Button
                  label={tryingToRegister ? "Carregando..." : "Cadastrar"}
                  variant="outline"
                  type="button"
                  disabled={tryingToLogin || tryingToRegister}
                  onClick={handleRegister}
                />
                <Button
                  label={tryingToLogin ? "Carregando..." : "Login"}
                  variant="primary"
                  type="submit"
                  disabled={tryingToLogin || tryingToRegister}
                  onClick={() => router.push("/animals")}
                />
              </div>
              {registerErrorMessage && (
                <p className="text-error text-sm text-center">
                  {registerErrorMessage}
                </p>
              )}
              {registerSuccessMessage && (
                <p className="text-success text-sm text-center">
                  {registerSuccessMessage}
                </p>
              )}
            </form>
            <Button label="Esqueceu a senha?" variant="link" />
          </div>
        </div>
      </main>
    </>
  );
}
