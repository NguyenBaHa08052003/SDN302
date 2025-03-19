import React, { useEffect, useState } from "react";
import { Pagination, Spin, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchLodgings } from "../stores/redux/slices/lodgingSlice";
const PAGE_SIZE = 10;
const ServerPagination = ({}) => {
  const dispatch = useDispatch();
  const { lodgings } = useSelector((state) => state.lodgingRedux);
  const currentPage = lodgings.page || 1;
  const totalItems = lodgings.total || 0;
  const pageSize = lodgings.limit || PAGE_SIZE;
  useEffect(() => {
    dispatch(fetchLodgings({ page: currentPage, limit: pageSize }));
  }, [currentPage]);
  return (
    <div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={(page) => dispatch(fetchLodgings({ page, limit: pageSize }))}
        style={{ marginTop: 16, textAlign: "center" }}
      />
    </div>
  );
};

export default ServerPagination;
