import type { CepResponse, IAddress } from "@/commons/types";
import addressService from "@/services/address-service";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface AddressModalProps {
  visible: boolean;
  onHide: () => void;
  toast: React.RefObject<Toast | null>;
}

export default function AddressModal({
  visible,
  onHide,
  toast,
}: AddressModalProps) {
  const [address, setAddress] = useState<IAddress>();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<IAddress>({
    defaultValues: {
      street: "",
      number: "",
      cep: "",
      city: "",
      complement: "",
    },
  });

  const onSubmit = async (address: IAddress) => {
    const response = await addressService.save(address);
    if (response.status === 200 && response.data) {
      setAddress(response.data as IAddress);
      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Endereço cadastrado com sucesso!",
        life: 3000,
      });

      onHide();
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Falha ao salvar o endereço. Tente novamente.",
        life: 3000,
      });
    }
  };

  const buscaCep = async (cep: string) => {
    const response = await addressService.findByCep(cep);
    if (response.status === 200 && response.data) {
      const endereco = response.data as CepResponse;

      setValue("street", endereco.logradouro || "");
      setValue("city", endereco.localidade || "");
      setValue("complement", endereco.complemento || "");
      setValue("cep", endereco.cep || "");

      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "CEP encontrado com sucesso!",
        life: 3000,
      });
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Falha ao buscar o CEP. Tente novamente.",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    if (address) {
      reset({
        cep: address.cep || "",
        street: address.street || "",
        city: address.city || "",
        complement: address.complement || "",
        number: "",
      });
    }
  }, [address, reset]);

  return (
    <Dialog
      header="Novo endereço de Entrega"
      visible={visible}
      style={{ width: "40vw", backgroundColor: "#111827", overflow: "hidden" }}
      contentStyle={{ backgroundColor: "#111827", overflow: "hidden" }}
      headerStyle={{
        backgroundColor: "#111827",
        color: "#fff",
        borderBottom: "1px solid #374151",
      }}
      onHide={onHide}
      dismissableMask
      modal
    >
      <div className="bg-[#111827] w-full p-5 rounded-xl overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-fluid space-y-4 text-white"
        >
          <div>
            <label className="block mb-2">CEP</label>
            <div className="flex">
              <div className="w-120 mr-8">
                <Controller
                  name="cep"
                  control={control}
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field }) => (
                    <InputText
                      {...field}
                      className={classNames({ "p-invalid": errors.cep })}
                      placeholder="Ex: 00000-000"
                    />
                  )}
                />
                {errors.cep && (
                  <small className="p-error">{errors.cep.message}</small>
                )}
              </div>
              <Button
                icon="pi pi-search"
                type="button"
                className="mt-2"
                onClick={async () => {
                  const cepValue = getValues("cep");
                  if (cepValue) {
                    await buscaCep(cepValue);
                  } else {
                    toast.current?.show({
                      severity: "warn",
                      summary: "Atenção",
                      detail: "Por favor, preencha o CEP antes de buscar.",
                      life: 3000,
                    });
                  }
                }}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Rua</label>
            <Controller
              name="street"
              control={control}
              rules={{ required: "Campo obrigatório" }}
              render={({ field }) => (
                <InputText
                  {...field}
                  className={classNames({ "p-invalid": errors.street })}
                  placeholder="Ex: Rua das Neves"
                />
              )}
            />
            {errors.street && (
              <small className="p-error">{errors.street.message}</small>
            )}
          </div>

          <div>
            <label className="block mb-2">Número</label>
            <Controller
              name="number"
              control={control}
              rules={{ required: "Campo obrigatório" }}
              render={({ field }) => (
                <InputText
                  {...field}
                  className={classNames({ "p-invalid": errors.number })}
                  placeholder="Ex: 123"
                />
              )}
            />
            {errors.number && (
              <small className="p-error">{errors.number.message}</small>
            )}
          </div>

          <div>
            <label className="block mb-2">Cidade</label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "Campo obrigatório" }}
              render={({ field }) => (
                <InputText
                  {...field}
                  className={classNames({ "p-invalid": errors.city })}
                  placeholder="Ex: Curitiba"
                />
              )}
            />
            {errors.city && (
              <small className="p-error">{errors.city.message}</small>
            )}
          </div>

          <div>
            <label className="block mb-2">Complemento</label>
            <Controller
              name="complement"
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  className={classNames({ "p-invalid": errors.complement })}
                  placeholder="Ex: Apartamento 101"
                />
              )}
            />
            {errors.complement && (
              <small className="p-error">{errors.complement.message}</small>
            )}
          </div>

          <div className="mt-4">
            <Button
              label="Salvar endereço"
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
}
