{/*function HomePage() {
  return <div>메인페이지입니다</div>;
}

export default HomePage;*/}

import { CardImage } from "@/components/cards/productCard" // CardImage가 저장된 실제 경로로 맞추세요!

function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold text-center">이벤트 목록</h1>

      {/* 카드를 예쁘게 배치하기 위한 그리드 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardImage />
        {/* 나중에 데이터를 받아오면 map을 돌려서 여러 개를 띄울 수 있어요 */}
      </div>
    </div>
  );
}

export default HomePage;
