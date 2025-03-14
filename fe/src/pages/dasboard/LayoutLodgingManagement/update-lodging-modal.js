"use client"

import { useState, useEffect } from "react"
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Upload,
  Space,
  Divider,
  Typography,
  Row,
  Col,
  message,
  Spin,
} from "antd"
import { HomeOutlined, DollarOutlined, EnvironmentOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import axios from "axios"
const { Title, Text } = Typography
const { TextArea } = Input
const UpdateLodgingModal = ({ isVisible, onClose, selectedRecordUpdate, onUpdateSuccess }) => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const [amenities, setAmenities] = useState([])
  const [newAmenity, setNewAmenity] = useState("")
  console.log(selectedRecordUpdate);
  
  useEffect(() => {
    if (isVisible && selectedRecordUpdate) {
      form.setFieldsValue({
        name: selectedRecordUpdate.name,
        description: selectedRecordUpdate.description,
        price: selectedRecordUpdate.price,
        area: selectedRecordUpdate.area,
        address: selectedRecordUpdate.address,
        detail_address: selectedRecordUpdate.detail_address,
        rooms: selectedRecordUpdate.rooms || 1,
        bathrooms: selectedRecordUpdate.bathrooms || 1,
      })
      if (selectedRecordUpdate.images && selectedRecordUpdate.images.length > 0) {
        setPreviewImages(selectedRecordUpdate.images)
      } else {
        setPreviewImages([])
      }
      if (selectedRecordUpdate.amenities && selectedRecordUpdate.amenities.length > 0) {
        setAmenities(selectedRecordUpdate.amenities)
      } else {
        setAmenities([])
      }
    }
  }, [isVisible, selectedRecordUpdate, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      // Prepare form data for file upload
      const formData = new FormData()

      // Add form values to formData
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key])
      })

      // Add amenities
      formData.append("amenities", JSON.stringify(amenities))

      // Add existing images that weren't deleted
      formData.append("existingImages", JSON.stringify(previewImages))

      // Add new images
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj)
        }
      })

      // Send update request
      const response = await axios.put(`http://localhost:3000/api/lodgings/${selectedRecordUpdate._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.status === 200) {
        message.success("Cập nhật thông tin phòng trọ thành công!")
        onUpdateSuccess()
        onClose()

        // Reset states
        setFileList([])
        setPreviewImages([])
        setAmenities([])
        form.resetFields()
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error)
      message.error("Không thể cập nhật thông tin phòng trọ. Vui lòng thử lại sau.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setFileList([])
    onClose()
  }

  const handleDeleteExistingImage = (index) => {
    const newImages = [...previewImages]
    newImages.splice(index, 1)
    setPreviewImages(newImages)
  }

  const handleAddAmenity = () => {
    if (newAmenity && !amenities.includes(newAmenity)) {
      setAmenities([...amenities, newAmenity])
      setNewAmenity("")
    }
  }

  const handleRemoveAmenity = (item) => {
    setAmenities(amenities.filter((amenity) => amenity !== item))
  }

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      // Check file type
      const isImage = file.type.startsWith("image/")
      if (!isImage) {
        message.error("Chỉ chấp nhận file hình ảnh!")
        return Upload.LIST_IGNORE
      }

      // Check file size (5MB limit)
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        message.error("Hình ảnh phải nhỏ hơn 5MB!")
        return Upload.LIST_IGNORE
      }

      setFileList([...fileList, file])
      return false
    },
    fileList,
    listType: "picture-card",
  }

  return (
    <Modal
      title={
        <Space>
          <HomeOutlined />
          <span>Cập nhật thông tin phòng trọ</span>
        </Space>
      }
      open={isVisible}
      onCancel={handleCancel}
      width={800}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
          Cập nhật
        </Button>,
      ]}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            rooms: 1,
            bathrooms: 1,
          }}
        >
          <Divider orientation="left">
            <Title level={5}>Thông tin cơ bản</Title>
          </Divider>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Tên phòng trọ"
                rules={[{ required: true, message: "Vui lòng nhập tên phòng trọ!" }]}
              >
                <Input prefix={<HomeOutlined />} placeholder="Nhập tên phòng trọ" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}>
                <TextArea placeholder="Nhập mô tả chi tiết về phòng trọ" autoSize={{ minRows: 3, maxRows: 6 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="price"
                label="Giá thuê (VNĐ/tháng)"
                rules={[{ required: true, message: "Vui lòng nhập giá thuê!" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                  min={0}
                  placeholder="Nhập giá thuê"
                  prefix={<DollarOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="area"
                label="Diện tích (m²)"
                rules={[{ required: true, message: "Vui lòng nhập diện tích!" }]}
              >
                <InputNumber style={{ width: "100%" }} min={1} placeholder="Nhập diện tích" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="rooms" label="Số phòng">
                <InputNumber style={{ width: "100%" }} min={1} placeholder="Số phòng" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="bathrooms" label="Số phòng tắm">
                <InputNumber style={{ width: "100%" }} min={1} placeholder="Số phòng tắm" />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">
            <Title level={5}>Địa chỉ</Title>
          </Divider>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}>
                <Input
                  prefix={<EnvironmentOutlined />}
                  placeholder="Nhập địa chỉ (Phường/Xã, Quận/Huyện, Tỉnh/Thành phố)"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="detail_address" label="Địa chỉ chi tiết">
                <Input placeholder="Nhập địa chỉ chi tiết (Số nhà, tên đường, ...)" />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">
            <Title level={5}>Tiện ích</Title>
          </Divider>

          <div className="mb-4">
            <Space className="mb-2" style={{ width: "100%" }}>
              <Input
                placeholder="Thêm tiện ích (VD: WiFi, Máy lạnh, ...)"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onPressEnter={handleAddAmenity}
              />
              <Button type="primary" onClick={handleAddAmenity} icon={<PlusOutlined />}>
                Thêm
              </Button>
            </Space>

            <div className="mt-2">
              {amenities.map((item, index) => (
                <Button key={index} className="mr-2 mb-2" onClick={() => handleRemoveAmenity(item)}>
                  {item} <DeleteOutlined />
                </Button>
              ))}
              {amenities.length === 0 && <Text type="secondary">Chưa có tiện ích nào được thêm</Text>}
            </div>
          </div>

          <Divider orientation="left">
            <Title level={5}>Hình ảnh</Title>
          </Divider>

          <div className="mb-4">
            <Text type="secondary" className="mb-2 block">
              Hình ảnh hiện tại (Nhấn vào để xóa)
            </Text>

            <div className="flex flex-wrap gap-2 mb-4">
              {previewImages.length > 0 ? (
                previewImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative"
                    style={{
                      width: 104,
                      height: 104,
                      border: "1px solid #d9d9d9",
                      borderRadius: 8,
                      padding: 8,
                      marginBottom: 8,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`preview ${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                    <Button
                      type="primary"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        opacity: 0.8,
                      }}
                      onClick={() => handleDeleteExistingImage(index)}
                    />
                  </div>
                ))
              ) : (
                <Text type="secondary">Không có hình ảnh</Text>
              )}
            </div>

            <Text type="secondary" className="mb-2 block">
              Thêm hình ảnh mới (Tối đa 5MB/ảnh)
            </Text>

            <Upload {...uploadProps}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            </Upload>
          </div>
        </Form>
      </Spin>
    </Modal>
  )
}

export default UpdateLodgingModal

