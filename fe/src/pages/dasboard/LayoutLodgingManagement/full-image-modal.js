import  React from "react"
import { Modal, Image } from "antd"
import { CloseOutlined } from "@ant-design/icons"



const FullImageModal = ({
  isImageModalVisible,
  handleCloseImageModal,
  currentImage,
}) => {
  return (
    <Modal
      visible={isImageModalVisible}
      onCancel={handleCloseImageModal}
      footer={null}
      width="80%"
      centered
      closeIcon={<CloseOutlined className="close-icon" />}
      bodyStyle={{ padding: 0, background: "black", height: "80vh" }}
      style={{ top: 20 }}
      className="image-preview-modal"
    >
      <div className="full-image-container">
        <Image src={currentImage || "/placeholder.svg"} alt="Full image" className="full-image" preview={false} />
      </div>
    </Modal>
  )
}

export default FullImageModal

