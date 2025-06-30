import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import "./style.css";
import DropdownUser from "../dropdown-user";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleCategoryClick = async (idCategory: number) => {
    navigate(`/products?category=${idCategory}`);
  };

  const mainItemTemplate = (item: MenuItem) => (
    <a className="flex align-items-center p-menuitem-link font-bold">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
    </a>
  );

  const items: MenuItem[] = [
    {
      label: "Hard Wallets",
      icon: "pi pi-angle-down",
      template: mainItemTemplate,
      items: [
        {
          label: "Bitcoin-Only",
          icon: "pi pi-bitcoin",
          command: () => handleCategoryClick(5),
        },
        {
          label: "Multi-currency",
          icon: "pi pi-ethereum",
          command: () => handleCategoryClick(3),
        },
        {
          label: "DIY",
          icon: "pi pi-wrench",
          command: () => handleCategoryClick(6),
        },
        {
          label: "Air-Gapped",
          icon: "pi pi-ban",
          command: () => handleCategoryClick(2),
        },
        {
          label: "Mobile Compatible",
          icon: "pi pi-mobile",
          command: () => handleCategoryClick(1),
        },
        {
          label: "Open Source",
          icon: "pi pi-github",
          command: () => handleCategoryClick(4),
        },
        {
          label: "Biometric",
          icon: "pi pi-user",
          command: () => handleCategoryClick(7),
        },
        { separator: true },
      ],
    },
    {
      label: "Quem Somos",
      icon: "pi pi-star",
      template: mainItemTemplate,
      command: () => {
        navigate("/about-us");
      },
    },
    {
      label: "Suporte",
      template: mainItemTemplate,
      icon: "pi pi-headphones",
    },
  ];

  const start = (
    <img
      alt="logo"
      src="public/img/logo.png"
      className="mr-4 ml-15 size-25"
      onClick={() => navigate("/")}
    />
  );

  const end = (
    <div className="flex items-center gap-2">
      <DropdownUser />
    </div>
  );

  return (
    <div className="card ">
      <Menubar
        model={items}
        start={start}
        end={end}
        style={{ backgroundColor: "#000000" }}
      />
    </div>
  );
}
