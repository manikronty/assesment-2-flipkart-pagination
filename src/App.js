import "./styles.css";
import { useEffect, useState } from "react";

const Productcard = ({ image, title }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-img" />
      <span>{title}</span>
    </div>
  );
};

const page_size = 10;

export default function App() {
  const [products, setproducts] = useState([]);
  const [currentpage, setcurrentpage] = useState(0);

  const cart = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    setproducts(json.products);
  };

  const totalproduct = products.length;
  const noofpages = Math.ceil(totalproduct / page_size);
  const start = currentpage * page_size;
  const end = start + page_size;

  useEffect(() => {
    cart();
  }, []);

  const handlepagechange = (n) => {
    setcurrentpage(n);
  };

  const gotonextpage = () => {
    setcurrentpage((prev) => prev + 1);
  };

  const gotoprevpage = () => {
    setcurrentpage((prev) => prev - 1);
  };

  return !products.length ? (
    <h1>list is empty</h1>
  ) : (
    <div className="App">
      <h1>pagination</h1>
      <div className="card">
        {products.slice(start, end).map((p) => (
          <Productcard key={p.id} image={p.thumbnail} title={p.title} />
        ))}
      </div>

      <div className="page_container">
        <button
          disabled={currentpage === 0}
          className="page_no"
          onClick={() => gotoprevpage()}
        >
          ◀️
        </button>
        {[...Array(noofpages).keys()].map((n) => (
          <button
            className={"page_no " + (n === currentpage ? "active" : "")}
            key={n}
            onClick={() => handlepagechange(n)}
          >
            {n}
          </button>
        ))}
        <button
          disabled={currentpage === noofpages - 1}
          className="page_no"
          onClick={() => gotonextpage()}
        >
          ▶️
        </button>
      </div>
    </div>
  );
}
