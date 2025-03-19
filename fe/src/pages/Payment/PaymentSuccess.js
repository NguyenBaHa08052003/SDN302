import { useSearchParams } from "react-router-dom";
import { Card, Typography, Button, Result } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="shadow-xl rounded-lg w-full max-w-3xl text-center p-8">
        <Result
          status="success"
          title="Thanh toán thành công!"
          subTitle="Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi."
          icon={<CheckCircleOutlined style={{ color: "#52c41a", fontSize: "3rem" }} />}
        />
        <div className="mt-4 text-left space-y-2">
          <Title level={4}>Chi tiết giao dịch</Title>
          <Text><strong>Số tiền:</strong> {searchParams.get("amount")} VND</Text><br />
          <Text><strong>Mã giao dịch:</strong> {searchParams.get("apptransid")}</Text><br />
          <Text><strong>Phương thức thanh toán:</strong><span style={{ color: "red", fontWeight: "bold" }}> ZaloPay</span></Text><br />
          <Text><strong>Trạng thái:</strong> <span style={{ color: "#52c41a", fontWeight: "bold" }}>Thành công</span></Text>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <Button type="primary" href="/" size="large" block>Quay về Trang Chủ</Button>
          <Button href="/quan-ly/nap-tien" size="large" block>Đăng ký gói mới</Button>
        </div>
      </Card>
    </div>
  );
}
