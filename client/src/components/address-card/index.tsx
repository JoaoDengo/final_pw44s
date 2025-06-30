import type { IAddress } from "@/commons/types";

interface IAddressCardProps {
  address: IAddress;
}

export default function AddressCard({ address }: IAddressCardProps) {
  return (
    <div className="w-[600px] max-w-full">
      <div className="bg-[#1F2937] p-4 rounded-lg shadow-md mb-4 w-full">
        <h2 className="text-white text-lg font-semibold mb-2 truncate">
          {address.street}, {address.number}
        </h2>
        <p className="text-gray-300 mb-1 truncate">{address.city}</p>
        <p className="text-gray-300 mb-1">CEP: {address.cep}</p>
      </div>
    </div>
  );
}
