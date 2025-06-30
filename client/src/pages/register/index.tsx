import type { IUserRegister } from "@/commons/types";
import ModalLogin from "@/components/modal-login";
import AuthService from "@/services/auth-service";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<IUserRegister>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cpf: "",
    },
  });

  const { signup } = AuthService;
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data: IUserRegister) => {
    setLoading(true);
    try {
      const response = await signup(data);
      if (response.status === 200 && response.data) {
        toast.current?.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Usuário cadastrado com sucesso.",
          life: 3000,
        });
        setTimeout(() => {
          setShowModal(true);
        }, 2000);
      } else {
        if (response.data && (response.data as any).validationErrors) {
          console.log(response.data);
          const validationErrors = (response.data as any).validationErrors;
          Object.entries(validationErrors).forEach(([field, message]) => {
            setError(field as keyof IUserRegister, {
              type: "server",
              message: message as string,
            });
          });
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Erro",
            detail: response.message || "Falha ao cadastrar usuário.",
            life: 3000,
          });
        }
      }
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Falha ao cadastrar usuário.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white">
      <Toast ref={toast} />

      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-cyan-300 to-indigo-700">
        <div className="text-center">
          <img
            src="public/img/logo.png"
            alt="logo"
            className="w-100 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold mb-4">Segurança e Inovação.</h1>
          <p className="text-gray-200 max-w-md">
            Junte-se à plataforma de cripto mais confiável do mercado.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-12 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2">Crie sua Conta</h2>

          <div className="flex items-center gap-2 mb-6">
            <p className="text-sm m-0">Já tem uma conta?</p>
            <Button
              label="Entrar"
              onClick={() => setShowModal(true)}
              className="p-0 m-0 text-cyan-500 bg-transparent border-none shadow-none hover:underline"
            />
            <ModalLogin
              visible={showModal}
              onHide={() => setShowModal(false)}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field }) => (
                    <InputText
                      {...field}
                      placeholder="Nome"
                      className={classNames("w-full", {
                        "p-invalid": errors.firstName,
                      })}
                    />
                  )}
                />
                {errors.firstName && (
                  <small className="p-error">{errors.firstName.message}</small>
                )}
              </div>
              <div className="w-1/2">
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field }) => (
                    <InputText
                      {...field}
                      placeholder="Sobrenome"
                      className={classNames("w-full", {
                        "p-invalid": errors.lastName,
                      })}
                    />
                  )}
                />
                {errors.lastName && (
                  <small className="p-error">{errors.lastName.message}</small>
                )}
              </div>
            </div>

            <div>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <InputText
                    {...field}
                    placeholder="E-mail"
                    className={classNames("w-full", {
                      "p-invalid": errors.email,
                    })}
                  />
                )}
              />
              {errors.email && (
                <small className="p-error">{errors.email.message}</small>
              )}
            </div>
            <div>
              <Controller
                name="cpf"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <InputText
                    {...field}
                    placeholder="CPF"
                    className={classNames("w-full", {
                      "p-invalid": errors.cpf,
                    })}
                  />
                )}
              />
              {errors.cpf && (
                <small className="p-error">{errors.cpf.message}</small>
              )}
            </div>

            <div className="w-full">
              <Controller
                name="password"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <Password
                    {...field}
                    toggleMask
                    feedback={false}
                    placeholder="Senha"
                    className={classNames({
                      "p-invalid": errors.password,
                    })}
                    inputStyle={{ width: "100%" }}
                    style={{ width: "100%" }}
                  />
                )}
              />
              {errors.password && (
                <small className="p-error">{errors.password.message}</small>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" className="text-sm">
                Eu concordo com os{" "}
                <span className="text-cyan-500 font-semibold">
                  Termos de Serviço
                </span>
              </label>
            </div>

            <Button
              type="submit"
              label="Criar Conta"
              className="w-full bg-pink-600 border-none text-white"
              loading={loading || isSubmitting}
              disabled={loading || isSubmitting}
            />

            <div className="flex items-center justify-center gap-4 mt-4">
              <Button
                icon="pi pi-github"
                label="GitHub"
                className="w-1/2"
                style={{ backgroundColor: "#333", border: "none" }}
              />
              <Button
                icon="pi pi-google"
                label="Google"
                className="w-1/2"
                style={{
                  backgroundColor: "#fff",
                  border: "none",
                  color: "#000",
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
