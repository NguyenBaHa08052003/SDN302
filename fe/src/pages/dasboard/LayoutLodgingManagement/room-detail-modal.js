import  React from "react"
import { useState, useRef } from "react"
import { Modal, Carousel, Image, Typography, Card, Space, Divider, Tag, Row, Col, Spin, Button } from "antd"
import {
  LeftOutlined,
  RightOutlined,
  ZoomInOutlined,
  CloseOutlined,
  DollarOutlined,
  AreaChartOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons"

const { Title, Paragraph, Text } = Typography


const RoomDetailModal = ({ isDetailModalVisible, handleCloseModal, selectedRecord }) => {
  const [isImageModalVisible, setIsImageModalVisible] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const carouselRef = useRef(null)

  // Hàm xử lý mở modal xem ảnh full
  const handleViewImage = (imageUrl) => {
    setCurrentImage(imageUrl)
    setIsImageModalVisible(true)
  }

  // Hàm xử lý đóng modal ảnh full
  const handleCloseImageModal = () => {
    setIsImageModalVisible(false)
  }

  // Carousel navigation
  const nextSlide = () => {
    carouselRef.current?.next()
  }

  const prevSlide = () => {
    carouselRef.current?.prev()
  }

  return (
    <>
      {/* Modal Xem Chi Tiết */}
      <Modal
        title={
          <Title level={4} style={{ margin: 0 }}>
            Chi tiết phòng
          </Title>
        }
        open={isDetailModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        className="room-detail-modal"
        styles={{ padding: 0 }}
      >
        {selectedRecord ? (
          <div>
            {/* Main Carousel */}
            <div className="carousel-container" style={{ position: "relative" }}>
              <Carousel draggable autoplay dots={{ className: "custom-carousel-dots" }} ref={carouselRef} effect="fade">
                {selectedRecord.images &&
                  selectedRecord.images.map((imageUrl, index) => (
                    <div key={index}>
                      <div className="carousel-image-container" style={{height: "200px"}}>
                        <img
                          src={imageUrl || "/placeholder.svg"}
                          alt={`Room image ${index + 1}`}
                          className="carousel-image"
                        />
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<ZoomInOutlined />}
                          onClick={() => handleViewImage(imageUrl)}
                          className="zoom-button"
                        />
                      </div>
                    </div>
                  ))}
              </Carousel>

              {/* Carousel Navigation Buttons */}
              <Button
                type="primary"
                shape="circle"
                icon={<LeftOutlined />}
                onClick={prevSlide}
                className="carousel-nav-button carousel-prev"
              />
              <Button
                type="primary"
                shape="circle"
                icon={<RightOutlined />}
                onClick={nextSlide}
                className="carousel-nav-button carousel-next"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="thumbnail-gallery-container">
              <div className="thumbnail-gallery">
                {selectedRecord.images &&
                  selectedRecord.images.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="thumbnail-container"
                      onClick={() => {
                        carouselRef.current?.goTo(index)
                      }}
                    >
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        className="thumbnail-image"
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Room Details */}
            <div className="room-details-container">
              <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <div className="room-title-container">
                  <Title level={3} style={{ margin: 0 }}>
                    {selectedRecord.name}
                  </Title>
                  <Tag color="blue" className="price-tag">
                    {selectedRecord.price?.toLocaleString("vi-VN")} VND
                  </Tag>
                </div>

                <Divider style={{ margin: "12px 0" }} />

                <Row gutter={[16, 16]}>
                  <Col span={24} md={12}>
                    <Card className="info-card">
                      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                        <div>
                          <Space align="center">
                            <DollarOutlined className="info-icon" />
                            <Text strong>Giá:</Text>
                          </Space>
                          <Paragraph className="info-value">
                            {selectedRecord.price?.toLocaleString("vi-VN")} VND
                          </Paragraph>
                        </div>

                        <div>
                          <Space align="center">
                            <AreaChartOutlined className="info-icon" />
                            <Text strong>Diện tích:</Text>
                          </Space>
                          <Paragraph className="info-value">{selectedRecord.area} m²</Paragraph>
                        </div>

                        <div>
                          <Space align="center">
                            <EnvironmentOutlined className="info-icon" />
                            <Text strong>Địa chỉ:</Text>
                          </Space>
                          <Paragraph className="info-value">
                            {selectedRecord.detail_address}, {selectedRecord.address}
                          </Paragraph>
                        </div>
                      </Space>
                    </Card>
                  </Col>

                  <Col span={24} md={12}>
                    <Card className="description-card">
                      <Space direction="vertical" size="middle">
                        <div>
                          <Text strong className="description-title">
                            Mô tả:
                          </Text>
                          <Paragraph className="description-content">{selectedRecord.description}</Paragraph>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                </Row>
              </Space>
            </div>
          </div>
        ) : (
          <div className="loading-container">
            <Spin size="large" />
            <Paragraph>Đang tải thông tin...</Paragraph>
          </div>
        )}
      </Modal>

      {/* Modal Xem Ảnh Full */}
      <Modal
        open={isImageModalVisible}
        onCancel={handleCloseImageModal}
        footer={null}
        width="80%"
        centered
        closeIcon={<CloseOutlined className="close-icon" />}
        styles={{ padding: 0, background: "black", height: "80vh" }}
        style={{ top: 20 }}
        className="image-preview-modal"
      >
        <div className="full-image-container">
          <Image src={currentImage || "/placeholder.svg"} alt="Full image" className="full-image" preview={false} />
        </div>
      </Modal>
    </>
  )
}

export default RoomDetailModal

