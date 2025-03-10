import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLodgings } from "../../stores/redux/slices/lodgingSlice";
import LazyImage from "../../utils/LazyImage";

export default function LodgingPage() {
  const dispatch = useDispatch();
  const lodgings = useSelector((state) => state.lodgingRedux.lodgings);

  useEffect(() => {
    dispatch(fetchLodgings());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold">List</h1>
      <div className="grid grid-cols-4 gap-4">
        {lodgings.map((lodging) => (
          <div key={lodging.id}>
            <h1 className="text-1xl font-bold">{lodging.title}</h1>
            <LazyImage
              src={lodging.image}
              placeholderSrc="https://dummyimage.com/100x100/cccccc/ffffff"
              alt={lodging.title}
              loading="lazy"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
