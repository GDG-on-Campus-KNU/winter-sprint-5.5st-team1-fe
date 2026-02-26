import { useMyInfo } from "@/hooks/useMyPage";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Loading } from "@/components/loading";

export default function MyInfo() {
  const { data, isLoading } = useMyInfo();

  if (isLoading) {
    return <Loading />;
  }

  if (!data) return null;

  const infoItems = [
    { icon: <User className="h-5 w-5" />, label: "이름", value: data.name },
    { icon: <Mail className="h-5 w-5" />, label: "이메일", value: data.email },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "전화번호",
      value: data.phone,
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "주소",
      value: data.address,
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "가입일",
      value: new Date(data.created_at).toLocaleDateString("ko-KR"),
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-[24px] font-bold text-gray-500 mb-6">내 정보</h2>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-200">
          <User className="h-8 w-8 text-pink-500" />
        </div>
        <div>
          <p className="text-[20px] font-bold text-gray-500">{data.name}</p>
          <p className="text-[14px] text-gray-300">{data.email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {infoItems.map(({ icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 text-gray-400">
            <span className="text-pink-500">{icon}</span>
            <span className="w-20 text-[14px] text-gray-300">{label}</span>
            <span className="text-[15px] font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
