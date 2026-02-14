import { CartItem } from "@/stores/cart.store";

export const MOCK_CART_ITEMS: CartItem[] = [
  {
    productId: 1,
    name: "먼작귀 키보드",
    price: 89000,
    quantity: 2,
    imageUrl:
      "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/bc67/dd296cd139e78c8bd041a26c7b8a20d1eb84b43a43981cbc7c6c2b85f792.jpg",
  },
  {
    productId: 2,
    name: "키티 마우스",
    price: 55000,
    quantity: 1,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ZO0q2FWKjvdStLBxc1ikGs5rJubpIUTn-A&s",
  },
  {
    productId: 3,
    name: "망그러진 곰 장패드",
    price: 150000,
    quantity: 5,
    imageUrl:
      "https://www.wishbucket.io/_next/image?url=https%3A%2F%2Fd2gfz7wkiigkmv.cloudfront.net%2Fpickin%2F2%2F1%2F2%2FfBpW_CdLRLW8krkt30IhbQ&w=1080&q=75",
  },
];
