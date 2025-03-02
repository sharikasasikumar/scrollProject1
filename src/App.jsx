import { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";
import ProductsList from "./ProductsList.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import Hamburger from "./Hamburger.jsx";

function App() {
  const [loading, setLoading] = useState(false);
  const [limit] = useState(30);
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(
    (initial = false) => {
      setLoading(true);
      fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${
          initial ? 0 : skip
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          setProducts((prev) =>
            initial ? data.products : [...prev, ...data.products]
          );
          setHasMore(data.products.length > 0);
          setSkip((prev) => prev + limit);
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setLoading(false));
    },
    [limit, skip]
  );

  useEffect(() => {
    fetchData(true);
  }, []);

  const memoizedProducts = useMemo(() => products, [products]);

  return (
    <div className="app-container">
      <Hamburger />
      <InfiniteScroll
        dataLength={memoizedProducts.length}
        next={() => fetchData(false)}
        hasMore={hasMore}
        loader={<h4 className="loading-text">Loading more products...</h4>}
      >
        <ProductsList products={memoizedProducts} />
      </InfiniteScroll>
    </div>
  );
}

export default App;
