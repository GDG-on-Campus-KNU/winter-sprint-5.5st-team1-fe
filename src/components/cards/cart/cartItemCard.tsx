import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/stores/cart.store";
import { Card, CardContent } from "@/components/ui/card";

interface CartItemProps {
  item: CartItemType;
  isChecked: boolean;
  onCheck: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartItem({
  item,
  isChecked,
  onCheck,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <CardContent className="flex items-center gap-4 p-4">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheck(item.productId)}
          className="h-5 w-5 accent-pink-500 cursor-pointer"
        />

        <div className="h-20 w-20 flex-shrink-0 rounded-xl bg-pink-100 overflow-hidden">
          <div className="h-full w-full flex items-center justify-center text-pink-300">
            No Image
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-1">
          <p className="font-semibold text-gray-700 text-16">
            {item.name}
          </p>
          <p className="text-pink-500 font-bold text-20">
            {item.price.toLocaleString()}원
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-gray-100 px-3 py-1 bg-white">
            <button
              onClick={() =>
                item.quantity > 1 &&
                onUpdateQuantity(item.productId, item.quantity - 1)
              }
              disabled={item.quantity <= 1}
              className="text-gray-300 hover:text-pink-500 disabled:opacity-30 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center font-semibold text-gray-600 text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                onUpdateQuantity(item.productId, item.quantity + 1)
              }
              className="text-gray-300 hover:text-pink-500 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.productId)}
            className="text-gray-400 hover:text-red transition-colors p-1"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
