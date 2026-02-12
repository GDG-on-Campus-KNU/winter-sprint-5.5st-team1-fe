import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export const QuantitySelector = ({
  quantity,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) => {
  const decrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">수량</span>
      <div className="flex items-center border rounded">
        <button
          onClick={decrease}
          disabled={quantity <= min}
          className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
        >
          <Minus size={16} />
        </button>

        <input
          type="number"
          value={quantity}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          className="w-16 text-center border-x outline-none"
        />

        <button
          onClick={increase}
          disabled={quantity >= max}
          className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};
