import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [products, Setproducts] = useState([]);
  const [pages, Setpages] = useState(1);
  const fetchData = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=100");
      if (res && res.data && res.data.products) {
        Setproducts(res.data.products);
        console.log(res.data.products);
      }
    } catch (error) {
      console.error("not working", error);
    }
  };

  const pagehandler = (x) => {
    if (x >= 1 && x <= Math.round(products.length / 18) && x !== pages)
      Setpages(x);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="products">
        {products.slice(pages * 18 - 18, pages * 18).map((p) => {
          return (
            <span className="products__single" key={p.id}>
              <img src={p.thumbnail} alt={p.title} />
              <span>
                {p.id} {p.title}
              </span>
            </span>
          );
        })}
      </div>
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => {
              pagehandler(pages - 1);
            }}
            className={pages > 1 ? "" : "pagination__disable"}
          >
            ◀️
          </span>
          {[...Array(Math.round(products.length / 18))].map((e, i) => {
            return (
              <span
                onClick={() => {
                  pagehandler(i + 1);
                }}
                className={pages === i + 1 ? "pagination__selected" : ""}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            onClick={() => {
              pagehandler(pages + 1);
            }}
            className={
              pages < Math.round(products.length / 18)
                ? ""
                : "pagination__disable"
            }
          >
            ▶️
          </span>
        </div>
      )}
    </>
  );
}

export default App;
