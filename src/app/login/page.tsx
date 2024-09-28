"use client";
import {
    HeaderGroup,
    TitleLogo,
	Input,
	Button
} from "@/components";
import { register, login } from "@/services/authService";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
export default function Login() {
	const router = useRouter();
    const { login: contextLogin } = useAuth();
	const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [tryingToLogin, setTryingToLogin] = useState(false);
    const [tryingToRegister, setTryingToRegister] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) {
		  	setEmailError("Email é obrigatório");
		} else if (!password) {
			setPasswordError("Senha é obrigatória")
		}
		else {
			setEmailError("");
			setPasswordError("");
            setTryingToLogin(true);
			try {
                const response = await login({ login: email, password: password });
				contextLogin(response.token);
				router.push('/'); //ajustar pro lugar correto
                setSuccessMessage("Login realizado com sucesso!");
            } catch (error) {
				console.log(error)
                setErrorMessage("Erro ao fazer login. Verifique suas credenciais.");
            } finally {
                setTryingToLogin(false);
            }
		}
	};

	const handleRegister = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (!email || !password) {
            setErrorMessage("Preencha todos os campos");
            return;
        }

        setTryingToRegister(true);

        try {
            const response = await register({ email, password });
            setSuccessMessage("Cadastro realizado com sucesso!");
        } catch (error) {
            setErrorMessage("Erro ao cadastrar. Tente novamente.");
        } finally {
            setTryingToRegister(false);
        }
    };

    return (
        <>
            <HeaderGroup
                className="fixed z-10"
            />

            <main className="h-screen">
                <div
                    className="flex flex-col items-center h-screen bg-gray-100 pt-24"
                >
                    <TitleLogo size="xl" ongTextColor="primary"/>
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
                                />
							</div>
							{errorMessage && <p className="text-red-500">{errorMessage}</p>}
							{successMessage && <p className="text-green-500">{successMessage}</p>}
						</form>
						<Button label="Esqueceu a senha?" variant="link"/>
                    </div>
                </div>
            </main>
        </>
    );
}
