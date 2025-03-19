const { default: mongoose } = require("mongoose");
const Lodging = require("../../models/lodging.model");
const LodgingType = require("../../models/lodgingtype.model");
const User = require("../../models/user.model");
const { deleteImagesFromCloudinary } = require("../../utils/cloudinaryUtils");
const { errorResponse, successResponse } = require("../../utils/response");
const Order = require("../../models/order.model");
module.exports = {
  getLodginById: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);

      const findLodging = await Lodging.findById(id)
        .populate({ path: "type", select: "name -_id" })
        .populate({ path: "user", select: "fullname email phoneNumber -_id" });
      if (!findLodging) {
        return errorResponse(res, {}, 404, "Không tìm thấy phòng trọ");
      }
      return successResponse(res, findLodging, {}, 200, "Lấy dữ liệu thông");
    } catch (error) {
      console.log("Error get lodging by id", error.message);
    }
  },
  createLodging: async (req, res) => {
    try {
      const {
        name,
        price,
        address,
        description,
        title,
        area,
        detail_address,
        type,
      } = req.body;

      const imageUrls = req.files.map((file) => file.path);
      if (!name || !price || imageUrls.length === 0) {
        return res
          .status(400)
          .json({ message: "Vui lòng nhập đầy đủ thông tin!" });
      }
      const user = req.user;

      const newLodging = new Lodging({
        name,
        price,
        images: imageUrls,
        address,
        description,
        title,
        area,
        detail_address,
        user: user.UID,
        type,
      });
      await newLodging.save();
      res.status(201).json(newLodging);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },
  getAllLodgings: async (req, res) => {
    try {
      const { price, address, area, page = 1, limit = null, type } = req.query;
      const filter = { status: 1 };
      const typeMapping = {
        "room-rental": "Phòng trọ",
        "nguyen-can": "Nguyên căn",
      };
      const convertedType = typeMapping[type] || null;
      // Lọc theo địa chỉ
      if (address) {
        const regexAddress = new RegExp(
          address
            .split(",")
            .map((part) => part.trim())
            .join(".*"),
          "i"
        );
        filter.address = { $regex: regexAddress };
      }
      // Lọc theo giá
      if (price) {
        const priceRanges = {
          "Dưới 1 triệu": [0, 1000000],
          "1 - 2 triệu": [1000000, 2000000],
          "2 - 3 triệu": [2000000, 3000000],
          "3 - 5 triệu": [3000000, 5000000],
          "5 - 7 triệu": [5000000, 7000000],
          "7 - 10 triệu": [7000000, 10000000],
          "10 - 15 triệu": [10000000, 15000000],
          "Trên 15 triệu": [15000000, Infinity],
        };
        const [min, max] = priceRanges[price] || [0, Infinity];
        filter.price = { $gte: min, $lte: max };
      }

      // Lọc theo diện tích
      if (area) {
        const areaRanges = {
          "Dưới 20 m²": [0, 20],
          "20 - 30 m²": [20, 30],
          "30 - 50 m²": [30, 50],
          "50 - 70 m²": [50, 70],
          "70 - 90 m²": [70, 90],
          "Trên 90 m²": [90, Infinity],
        };
        const [min, max] = areaRanges[area] || [0, Infinity];
        filter.area = { $gte: min, $lte: max };
      }

      // Lọc theo loại phòng (type) chỉ khi có giá trị hợp lệ
      if (convertedType) {
        const typeData = await LodgingType.findOne({ name: convertedType });
        if (typeData) {
          filter.type = mongoose.Types.ObjectId(typeData._id);
        } else {
          console.log("Không tìm thấy loại phòng:", convertedType);
        }
      }

      // Tính skip dựa trên page
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const total = await Lodging.countDocuments(filter);

      // Query Lodging và áp dụng limit nếu có
      const query = Lodging.find(filter).skip(skip);

      if (limit) {
        query.limit(parseInt(limit)); // Áp dụng limit nếu limit có giá trị
      }
      // Lấy danh sách user đã có order
      const orders = await Order.find().select("user");

      const orderedUsers = new Set(
        orders.map((order) => order.user._id.toString())
      );
      console.log(orderedUsers);
      // Lọc listings để chỉ giữ lại những cái không có trong Order
      const listings = await query
        .populate({ path: "type", select: "name -_id" })
        .populate({ path: "user", select: "_id fullname email phoneNumber" });

      const filteredListings = listings.filter(
        (listing) =>
          listing.user._id && !orderedUsers.has(listing.user._id.toString())
      );
      res.json({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
        listings: filteredListings,
      });
    } catch (error) {
      console.error("Lỗi API:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  },

  getRankingLodging: async (req, res) => {
    try {
      // Lấy danh sách user đã có order
      const orders = await Order.find().select("user");
      const orderedUsers = new Set(
        orders.map((order) => order.user._id.toString())
      );
      console.log(orderedUsers);
      // Lọc listings để chỉ giữ lại những cái không có trong Order
      const listings = await Lodging.find()
        .populate({ path: "type", select: "name -_id" })
        .populate({ path: "user", select: "_id fullname email phoneNumber" });

      const filteredListings = listings.filter(
        (listing) =>
          listing.user._id && orderedUsers.has(listing.user._id.toString())
      );
      res.json({
        listings: filteredListings,
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  getAllLodgingTypes: async (req, res) => {
    try {
      const lodgingTypes = await LodgingType.find({}).select("name");
      res.json(lodgingTypes);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  getLodgingByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return errorResponse(res, "User not found", 404, "User không tồn tại");
      }
      const lodgings = await Lodging.find({ user: userId }).populate({
        path: "type",
        select: "name _id",
      });
      return successResponse(res, lodgings, {}, 200, "Lấy dữ liệu thành công");
    } catch (error) {
      return errorResponse(res, error.message, 500, error.message);
    }
  },
  updateStatusLoding: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, userId } = req.body;

      // Validate input
      if (status !== 0 && status !== 1) {
        return res.status(400).json({
          message: "Trạng thái không hợp lệ. Chỉ chấp nhận giá trị 0 hoặc 1.",
        });
      }
      // Validate id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID phòng trọ không hợp lệ" });
      }
      // Check if the lodging exists and belongs to the user
      const lodging = await Lodging.findOne({ _id: id, user: userId });
      if (!lodging) {
        return res.status(404).json({
          message: "Không tìm thấy phòng trọ hoặc bạn không có quyền cập nhật.",
        });
      }
      lodging.status = status;
      await lodging.save();
      return res.status(200).json({
        message: `Đã ${
          status === 1 ? "mở" : "đóng"
        } trạng thái phòng thành công.`,
        status,
      });
    } catch (error) {
      console.error("Error toggling lodging status:", error);
      return res
        .status(500)
        .json({ message: "Lỗi server khi cập nhật trạng thái phòng." });
    }
  },

  updateLodging: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        description,
        title,
        price,
        area,
        detail_address,
        existingImages,
      } = req.body;
      const filteredImages = existingImages.filter(
        (img) => img !== "undefined"
      );

      const address = req.body.location || req.body.address;
      const newImageFiles = req.files || [];
      const newImageUrls = [];
      if (newImageFiles.length > 0) {
        newImageFiles.forEach((file) => {
          newImageUrls.push(file.path);
        });
      }
      const allImages = [...filteredImages, ...newImageUrls];
      if (allImages.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one image is required",
        });
      }
      const updateData = {
        name,
        description,
        title,
        price,
        area,
        detail_address,
        images: allImages,
      };
      if (address) {
        updateData.address = address;
      }
      const updatedLodging = await Lodging.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updatedLodging) {
        return res.status(404).json({
          success: false,
          message: "Lodging not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Lodging updated successfully",
        data: updatedLodging,
      });
    } catch (error) {
      console.error("Error updating lodging:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update lodging",
        error: error.message,
      });
    }
  },
  voteLodging: async (req, res) => {
    try {
      const { lodgingId } = req.params;
      const { rating } = req.body;
      const userId = req.user.UID; // Lấy user từ token
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Invalid rating value (1-5)" });
      }
      const lodging = await Lodging.findById(lodgingId);
      if (!lodging) {
        return res.status(404).json({ message: "Lodging not found" });
      }
      const existingVote = lodging.votes.find(
        (v) => v.userId.toString() === userId
      );
      if (existingVote) {
        existingVote.rating = rating;
      } else {
        lodging.votes.push({ userId, rating });
      }

      // Tính điểm rating trung bình
      const totalRating = lodging.votes.reduce((sum, v) => sum + v.rating, 0);
      lodging.rating = totalRating / lodging.votes.length;

      await lodging.save();
      res.status(200).json(lodging);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};
