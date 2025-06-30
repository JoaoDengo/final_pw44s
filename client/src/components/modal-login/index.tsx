import type { AuthenticationResponse, IUserLogin } from "@/commons/types";
import { useAuth } from "@/context/hooks/use-auth";
import AuthService from "@/services/auth-service";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

interface ModalLoginProps {
  visible: boolean;
  onHide: () => void;
}

export default function ModalLogin({ visible, onHide }: ModalLoginProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserLogin>({ defaultValues: { email: "", password: "" } });
  const navigate = useNavigate();
  const { login } = AuthService;
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth();

  const onSubmit = async (userLogin: IUserLogin) => {
    setLoading(true);
    try {
      const response = await login(userLogin);
      if (response.status === 200 && response.data) {
        const authenticationResponse = response.data as AuthenticationResponse;

        toast.current?.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Login efetuado com sucesso.",
          life: 3000,
        });

        setTimeout(() => {
          handleLogin(authenticationResponse);
          onHide();
          navigate("/");
        }, 1000);
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "Falha ao efetuar login. Verifique suas credenciais.",
          life: 3000,
        });
      }
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Ocorreu um problema ao tentar fazer login.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />

      <Dialog
        visible={visible}
        modal
        onHide={onHide}
        dismissableMask
        content={({ hide }) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="flex flex-col px-8 py-5 gap-4 w-100"
              style={{ borderRadius: "12px", background: "#1E2939" }}
            >
              <div className="flex justify-center">
                <img src="public/img/Logo.png" className="size-20" alt="Logo" />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-white">
                  E-mail
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Informe o email" }}
                  render={({ field }) => (
                    <InputText
                      id="email"
                      {...field}
                      className={errors.email ? "p-invalid w-full" : "w-full"}
                    />
                  )}
                />
                {errors.email && (
                  <small className="p-error">{errors.email.message}</small>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-white">
                  Senha
                </label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Informe a senha" }}
                  render={({ field }) => (
                    <Password
                      id="password"
                      {...field}
                      toggleMask
                      feedback={false}
                      className={
                        errors.password ? "p-invalid w-full" : "w-full"
                      }
                      inputClassName="w-82"
                    />
                  )}
                />
                {errors.password && (
                  <small className="p-error">{errors.password.message}</small>
                )}
              </div>

              <div className="flex align-items-center gap-2 mt-4">
                <Button
                  label="Sign-In"
                  type="submit"
                  text
                  className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                  loading={loading || isSubmitting}
                  disabled={loading || isSubmitting}
                />
                <Button
                  label="Cancelar"
                  text
                  onClick={onHide}
                  className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                />
              </div>

              <div className="text-center">
                <small className="text-white">
                  Não tem uma conta?{" "}
                  <Link
                    to="/register"
                    className="text-blue-500"
                    onClick={onHide}
                  >
                    Criar conta
                  </Link>
                </small>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
}
