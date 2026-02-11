{/*function HomePage() {
  return <div>메인페이지입니다</div>;
}

export default HomePage;*/}

import { ProductCard } from "@/components/cards/productCard";
import { CouponCard } from "@/components/cards/couponCard";
import { OrderInfoCard } from "@/components/cards/orderInfoCard";

function HomePage() {
  return (
    <div className="w-full py-10 px-4 flex flex-col items-center">
      <h1 className="mb-16 text-3xl font-black text-gray-900">컴포넌트 레이아웃</h1>

      {/* 1층: 상품/쿠폰 카드는 적당한 너비로 묶기 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mb-12">
        <ProductCard />
        <CouponCard />
      </div>

      {/* 2층: 주문 카드는 훨씬 더 넓은 너비로 배치 */}
      <div className="w-full max-w-7xl">
        <OrderInfoCard />
      </div>
    </div>
  );
}
export default HomePage;