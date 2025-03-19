"use client"
import { Card, Descriptions, Tag, Divider, Button, Space, Statistic } from "antd"
import { CheckCircleOutlined, ClockCircleOutlined, DollarOutlined, CreditCardOutlined } from "../../components/ui/icons"

export default function PaymentDetail({
  paymentId = "PAY-123456789",
  amount = 299.99,
  currency = "USD",
  status = "completed",
  date = "2023-05-15T14:30:00",
  paymentMethod = {
    type: "credit_card",
    last4: "4242",
    expiryDate: "05/25",
    name: "John Doe",
  },
  billingAddress = {
    name: "John Doe",
    address: "123 Main St",
    city: "San Francisco",
    country: "USA",
    postalCode: "94105",
  },
  items = [{ id: "item-1", name: "Product Subscription", quantity: 1, price: 299.99 }],
  onDownloadReceipt = () => console.log("Download receipt"),
}) {
  // Format date
  const formattedDate = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  // Get status tag
  const getStatusTag = () => {
    switch (status) {
      case "completed":
        return (
          <Tag color="success" icon={<CheckCircleOutlined />}>
            Completed
          </Tag>
        )
      case "pending":
        return (
          <Tag color="warning" icon={<ClockCircleOutlined />}>
            Pending
          </Tag>
        )
      case "failed":
        return <Tag color="error">Failed</Tag>
      default:
        return <Tag>Unknown</Tag>
    }
  }

  // Get payment method icon
  const getPaymentMethodIcon = () => {
    if (paymentMethod.type === "credit_card") {
      return <CreditCardOutlined className="text-lg mr-2" />
    }
    return <DollarOutlined className="text-lg mr-2" />
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card
        title={
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Payment Details</span>
            {getStatusTag()}
          </div>
        }
        className="shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Statistic
              title="Amount"
              value={amount}
              precision={2}
              prefix={currency === "USD" ? "$" : currency === "EUR" ? "€" : ""}
              className="mb-6"
            />

            <Descriptions title="Payment Information" column={1} bordered>
              <Descriptions.Item label="Payment ID">{paymentId}</Descriptions.Item>
              <Descriptions.Item label="Date">{formattedDate}</Descriptions.Item>
              <Descriptions.Item label="Status">{getStatusTag()}</Descriptions.Item>
            </Descriptions>
          </div>

          <div>
            <Descriptions title="Payment Method" column={1} bordered>
              <Descriptions.Item label="Type">
                <div className="flex items-center">
                  {getPaymentMethodIcon()}
                  <span className="capitalize">{paymentMethod.type.replace("_", " ")}</span>
                </div>
              </Descriptions.Item>
              {paymentMethod.last4 && (
                <Descriptions.Item label="Card Number">•••• •••• •••• {paymentMethod.last4}</Descriptions.Item>
              )}
              {paymentMethod.expiryDate && (
                <Descriptions.Item label="Expiry Date">{paymentMethod.expiryDate}</Descriptions.Item>
              )}
              {paymentMethod.name && <Descriptions.Item label="Card Holder">{paymentMethod.name}</Descriptions.Item>}
            </Descriptions>
          </div>
        </div>

        <Divider />

        <Descriptions title="Billing Address" column={1} bordered>
          <Descriptions.Item label="Name">{billingAddress?.name}</Descriptions.Item>
          <Descriptions.Item label="Address">{billingAddress?.address}</Descriptions.Item>
          <Descriptions.Item label="City">{billingAddress?.city}</Descriptions.Item>
          <Descriptions.Item label="Country">{billingAddress?.country}</Descriptions.Item>
          <Descriptions.Item label="Postal Code">{billingAddress?.postalCode}</Descriptions.Item>
        </Descriptions>

        <Divider />

        <div>
          <h3 className="text-lg font-medium mb-4">Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {currency === "USD" ? "$" : currency === "EUR" ? "€" : ""}
                      {item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {currency === "USD" ? "$" : currency === "EUR" ? "€" : ""}
                      {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">
                    Total
                  </td>
                  <td className="px-6 py-4 font-bold">
                    {currency === "USD" ? "$" : currency === "EUR" ? "€" : ""}
                    {amount.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Space>
            <Button type="primary" onClick={onDownloadReceipt}>
              Download Receipt
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  )
}

