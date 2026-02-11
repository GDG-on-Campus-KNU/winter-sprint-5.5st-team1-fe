{/*function HomePage() {
  return <div>메인페이지입니다</div>;
}

export default HomePage;*/}

import { ProductCard } from "@/components/cards/productCard" // 아까 만든 상품 카드
import { CouponCard } from "@/components/cards/couponCard"   // 방금 만든 쿠폰 카드

function HomePage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="mb-10 text-3xl font-bold text-center text-gray-800">컴포넌트 크기 비교</h1>

      {/* gap-6으로 카드 사이 간격을 주고, md:grid-cols-2로 나란히 배치 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">

        {/* 왼쪽: 상품 카드 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-400 ml-1">Product Card</p>
          <ProductCard />
        </div>

        {/* 오른쪽: 쿠폰 카드 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-400 ml-1">Coupon Card</p>
          <CouponCard />
        </div>

      </div>
    </div>
  );
}

export default HomePage;