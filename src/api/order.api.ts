import instance from "@/lib/axios";
import { OrderCompleteData } from "@/components/cards/order/orderCompleteListCard";

const USE_MOCK = false;

export interface OrderResponse {
    order: {
        id: number;
        order_status: string;
        recipient_name: string;
        recipient_phone: string;
        delivery_address: string;
        delivery_detail_address: string;
        delivery_message: string;
        final_price: number;
        created_at: string;
    };
    order_items: {
        product_name: string;
        quantity: number;
    }[];
}

const mockDelay = (ms = 500): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const fetchOrderFromMock = async (id: string): Promise<OrderCompleteData> => {
    await mockDelay(1000);

    return {
        orderNumber: id,
        status: "결제완료",
        orderDate: "2026년 2월 12일",
        address: "대구광역시 북구 대학로 80 (IT대학5호관)",
        recipient: "홍길동",
        phone: "010-1234-5678",
        deliveryMessage: "문 앞에 놔주세요.",
        items: [
            { name: "게이밍 키보드", quantity: 1 },
            { name: "무선 게이밍 마우스", quantity: 2 },
            { name: "장패드", quantity: 5 }
        ],
        totalPrice: 245000
    };
};

const fetchOrderFromAPI = async (order_id: string): Promise<OrderCompleteData> => {
    const response = await instance.get<{
        success: boolean;
        data: OrderResponse;
        message: string;
    }>(`/api/v1/orders/${order_id}`);
    
    const { order, order_items } = response.data.data;

    const dateObj = new Date(order.created_at);
    const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

    return {
        orderNumber: order.id.toString(),
        status: order.order_status === "PENDING" ? "결제완료" : order.order_status, 
        orderDate: formattedDate,
        address: `${order.delivery_address} ${order.delivery_detail_address}`.trim(),
        recipient: order.recipient_name,
        phone: order.recipient_phone,
        deliveryMessage: order.delivery_message,
        items: order_items.map(item => ({
            name: item.product_name,
            quantity: item.quantity
        })),
        totalPrice: order.final_price
    };
};

export const fetchOrderData = async (id: string): Promise<OrderCompleteData> => {
    if (USE_MOCK) {
        return fetchOrderFromMock(id);
    } else {
        return fetchOrderFromAPI(id);
    }
}