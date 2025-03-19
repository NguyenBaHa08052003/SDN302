
import { useState, useEffect } from "react"
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Select,
  Modal,
  Card,
  Divider,
  Spin,
  message,
  notification,
} from "antd"
import {
  HomeOutlined,
  DollarOutlined,
  FileTextOutlined,
  AreaChartOutlined,
  EnvironmentOutlined,
  PictureOutlined,
  SaveOutlined,
  CloseOutlined,
  PlusOutlined,
  LoadingOutlined,
  EditOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons"
import { motion } from "framer-motion"
import axios from "axios"
import "antd/dist/reset.css"

// Assuming LocationUtil is a custom component that you have
import LocationUtil from "../../../components/LocationUtil"
import lodgingService from "../../../services/lodgingService.js/lodging.service"
import { toast } from "react-toastify"

const { TextArea } = Input
const { Option } = Select

const UpdateLodgingModal = ({ isVisible, onClose, selectedRecordUpdate, onUpdateSuccess }) => {
  const [form] = Form.useForm()
  const [location, setLocation] = useState("")
  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(false)
  const [lodgingTypes, setLodgingTypes] = useState([])
  const [previewImage, setPreviewImage] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)

  useEffect(() => {
    if (isVisible && selectedRecordUpdate) {
      form.setFieldsValue({
        name: selectedRecordUpdate?.name,
        title: selectedRecordUpdate?.title,
        type: selectedRecordUpdate?.type?._id,
        price: selectedRecordUpdate?.price,
        detail_address: selectedRecordUpdate?.detail_address,
        area: selectedRecordUpdate?.area,
        description: selectedRecordUpdate?.description,
      })
      setLocation(selectedRecordUpdate.address || "")
      setFileList(
        selectedRecordUpdate.images?.map((img, index) => ({
          uid: index.toString(),
          name: `image-${index}`,
          status: "done",
          url: img,
        })) || [],
      )
    }
  }, [selectedRecordUpdate, isVisible, form])

  useEffect(() => {
    const fetchLodgingTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/lodgings/lodging-types")
        setLodgingTypes(response.data)
      } catch (error) {
        console.error("Lỗi khi lấy danh sách loại chỗ ở:", error)
        message.error("Không thể tải danh sách loại chỗ ở")
      }
    }
    fetchLodgingTypes()
  }, [])

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(0, 5)) // Limit to 5 images
  }

  const handlePreview = (file) => {
    setPreviewImage(file.url || file.thumbUrl)
    setPreviewVisible(true)
  }

  const handleSubmit = async (values) => {
    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("price", values.price)
    formData.append("title", values.title)
    formData.append("description", values.description || "")
    formData.append("area", values.area)
    formData.append("detail_address", values.detail_address || "")
    formData.append("address", location)
    formData.append("type", values.type)
  // Nếu có ảnh cũ mà chưa bị xóa, thêm vào formData
    fileList.forEach((imgUrl) => {
        formData.append("existingImages", imgUrl.url);
    });
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj)
      }
    })
    setLoading(true)
    try {
      const response = await lodgingService.updateLodging(selectedRecordUpdate._id, formData)
      if (response.error) {
        toast.error(response.message || "Cập nhật thất bại")
        return
      }
      // Sử dụng notification thay vì toast
      toast.success({
        message: "Thành công",
        description: "Cập nhật chỗ ở thành công!",
        icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
        placement: "bottomRight",
        duration: 4,
      })

      toast.success("Cập nhật chỗ ở thành công!")
      onUpdateSuccess()
      onClose()
    } catch (error) {
      console.error("Lỗi khi cập nhật chỗ ở:", error)
      toast.error({
        message: "Thất bại",
        description: "Cập nhật chỗ ở thất bại. Vui lòng thử lại sau.",
        icon: <InfoCircleOutlined style={{ color: "#ff4d4f" }} />,
        placement: "bottomRight",
        duration: 4,
      })
    } finally {
      setLoading(false)
    }
  }

  const uploadButton = (
    <div className="upload-button">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Tải lên</div>
      </motion.div>
    </div>
  )

  return (
    <>
      <Modal
        title={
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center">
            <HomeOutlined className="mr-2 text-blue-500" />
            <span className="text-lg font-bold">Cập Nhật Chỗ Ở</span>
          </motion.div>
        }
        open={isVisible}
        onCancel={onClose}
        footer={null}
        width={800}
        className="lodging-update-modal"
        destroyOnClose
      >
        <Divider className="my-3" />

        <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
          <Form form={form} layout="vertical" onFinish={handleSubmit} className="lodging-form" requiredMark="optional">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="name"
                label={
                  <span className="flex items-center">
                    <HomeOutlined className="mr-2 text-blue-500" />
                    Tên Chỗ Ở
                  </span>
                }
                rules={[{ required: true, message: "Vui lòng nhập tên chỗ ở!" }]}
              >
                <Input
                  prefix={<HomeOutlined className="site-form-item-icon" />}
                  placeholder="Nhập tên chỗ ở"
                  className="custom-input"
                />
              </Form.Item>

              <Form.Item
                name="title"
                label={
                  <span className="flex items-center">
                    <EditOutlined className="mr-2 text-blue-500" />
                    Tiêu đề
                  </span>
                }
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
              >
                <Input
                  prefix={<EditOutlined className="site-form-item-icon" />}
                  placeholder="Nhập tiêu đề"
                  className="custom-input"
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="price"
                label={
                  <span className="flex items-center">
                    <DollarOutlined className="mr-2 text-blue-500" />
                    Giá (VND)
                  </span>
                }
                rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
              >
                <InputNumber
                  min={0}
                  className="w-full custom-input"
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  placeholder="Nhập giá"
                />
              </Form.Item>

              <Form.Item
                name="area"
                label={
                  <span className="flex items-center">
                    <AreaChartOutlined className="mr-2 text-blue-500" />
                    Diện tích (m²)
                  </span>
                }
                rules={[{ required: true, message: "Vui lòng nhập diện tích!" }]}
              >
                <InputNumber min={0} className="w-full custom-input" placeholder="Nhập diện tích" />
              </Form.Item>
            </div>

            <Form.Item
              name="description"
              label={
                <span className="flex items-center">
                  <FileTextOutlined className="mr-2 text-blue-500" />
                  Mô tả
                </span>
              }
            >
              <TextArea rows={4} placeholder="Nhập mô tả chi tiết về chỗ ở" className="custom-textarea" />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="detail_address"
                label={
                  <span className="flex items-center">
                    <EnvironmentOutlined className="mr-2 text-blue-500" />
                    Địa chỉ chi tiết
                  </span>
                }
              >
                <Input
                  prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                  placeholder="Nhập địa chỉ chi tiết"
                  className="custom-input"
                />
              </Form.Item>

              <Form.Item
                name="type"
                label={
                  <span className="flex items-center">
                    <HomeOutlined className="mr-2 text-blue-500" />
                    Loại Chỗ Ở
                  </span>
                }
                rules={[{ required: true, message: "Vui lòng chọn loại chỗ ở!" }]}
              >
                <Select placeholder="Chọn loại chỗ ở" className="custom-select">
                  {lodgingTypes?.map((type) => (
                    <Option key={type._id} value={type._id}>
                      {type.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              label={
                <span className="flex items-center">
                  <EnvironmentOutlined className="mr-2 text-blue-500" />
                  Địa chỉ
                </span>
              }
            >
              <Card className="location-card">
                <LocationUtil setLocation={setLocation} defaultAddress={selectedRecordUpdate?.address} />
              </Card>
            </Form.Item>

            <Form.Item
              label={
                <span className="flex items-center">
                  <PictureOutlined className="mr-2 text-blue-500" />
                  Hình ảnh ({fileList.length}/5)
                </span>
              }
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadChange}
                onPreview={handlePreview}
                beforeUpload={() => false}
                multiple
                name="images"
                className="lodging-image-upload"
              >
                {fileList.length >= 5 ? null : uploadButton}
              </Upload>
            </Form.Item>

            <Form.Item className="form-actions">
              <div className="flex justify-end gap-3">
                <Button onClick={onClose} icon={<CloseOutlined />} className="cancel-button">
                  Hủy
                </Button>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    icon={<SaveOutlined />}
                    className="submit-button"
                  >
                    Cập Nhật
                  </Button>
                </motion.div>
              </div>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width="auto"
        className="image-preview-modal"
        centered
      >
        <img alt="Preview" style={{ maxWidth: "100%", maxHeight: "80vh" }} src={previewImage || "/placeholder.svg"} />
      </Modal>
    </>
  )
}

export default UpdateLodgingModal

