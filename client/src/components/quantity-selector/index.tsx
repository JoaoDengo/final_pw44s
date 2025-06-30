interface QuantitySelectorProps {
  value: number;
  onChange: (newValue: number) => void;
}

export const QuantitySelector = ({
  value,
  onChange,
}: QuantitySelectorProps) => {
  const increase = () => onChange(value + 1);
  const decrease = () => onChange(value > 0 ? value - 1 : 0);

  return (
    <div className="flex items-center space-x-1 bg-gray-700 text-white rounded px-1 py-0.5 text-xs w-fit">
      <button
        onClick={decrease}
        className="px-2 py-1 hover:bg-gray-600 rounded"
      >
        -
      </button>
      <span className="px-2 w-[24px] text-center inline-block">{value}</span>
      <button
        onClick={increase}
        className="px-2 py-1 hover:bg-gray-600 rounded"
      >
        +
      </button>
    </div>
  );
};
