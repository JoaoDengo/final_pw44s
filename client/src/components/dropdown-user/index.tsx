import React, { useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/hooks/use-auth";
import ModalLogin from "../modal-login";

export default function DropdownUser() {
  const menu = useRef<Menu>(null);
  const navigate = useNavigate();
  const { authenticated, handleLogout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    handleLogout();
  };

  const items = [
    {
      label: useAuth().authenticatedUser?.username || "Usuário",
    },
    {
      label: "Perfil",
      icon: "pi pi-user",
    },
    {
      label: "Meus Pedidos",
      icon: "pi pi-shopping-bag",
      command: () => navigate("/user-sales"),
    },
    {
      label: "Sair",
      icon: "pi pi-sign-out",
      command: handleLogoutClick,
    },
  ];

  return (
    <div className="card flex justify-content-center">
      {authenticated ? (
        <>
          <Menu model={items} popup ref={menu} />
          <Button
            icon="pi pi-user"
            rounded
            aria-label="User"
            onClick={(e) => menu.current?.toggle(e)}
            style={{
              backgroundColor: "grey",
              border: "none",
              color: "white",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />
        </>
      ) : (
        <>
          <Button
            label="Login"
            icon="pi pi-user"
            rounded
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: "#38B3D4",
              border: "none",
              marginLeft: "1rem",
              marginRight: "1rem",
              color: "#fff",
            }}
          />
          <Button
            label="Registrar"
            icon="pi pi-user-plus"
            rounded
            onClick={() => navigate("/register")}
            style={{
              backgroundColor: "#CDE1EE",
              border: "none",
              color: "#38B3D4",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />
          <ModalLogin visible={showModal} onHide={() => setShowModal(false)} />
        </>
      )}
    </div>
  );
}
