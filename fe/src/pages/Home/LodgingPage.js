import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLodgings } from "../../stores/redux/slices/lodgingSlice";

export default function LodgingPage() {
  const dispatch = useDispatch();
  const lodings = useSelector((state) => state.lodgingRedux.lodgings);
  useEffect(() => {
    console.log("Xin chào");
    dispatch(fetchLodgings());
  }, [dispatch]);
  console.log(lodings);
  
  return (
    <div>
      <h1>Lodgings</h1>
    </div>
  );
}
