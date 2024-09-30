import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useQueryGetData } from "../Hooks/useQueryGetItems";
import { IProduct } from "../interfaces/Index";
import { Data_Parsing } from "../Services/Index";
import ProductCard from "../Components/UI/Product/ProductCard";
import Loading from "../Components/SVG/Loading";
import Button from "../Components/UI/Button";
import { Filter } from "lucide-react";
import Pagination from "../Components/UI/Pagination";

const Product = () => {
  // ! State

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sorting, setIsSorting] = useState<string>("asc");
  const [isRange, setIsRange] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(12);
  const [page, setPage] = useState<number>(1);
  const [stock, setStock] = useState<string>("");
  const [selectedSubCategories, setSelectSubCategories] = useState<string[]>(
    []
  );
  const [isPrice, setIsPrice] = useState("");
  const [isSale, setIsSale] = useState(0);

  const hanldeSort = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSorting(e.target.value);
    setPage(1);
  };

  const EndPoint = selectedSubCategories
    .map((item) => `&[filters][sub_categories][title]=${item}`)
    .join("");

  // React Query

  const { data } = useQueryGetData({
    queryKey: [`Product-filter`],
    url: `/sub-categories?populate=*`,
    config: {
      headers: {
        Authorization: `Bearer ${Data_Parsing?.jwt}`,
      },
    },
  });

  const { data: dataTwo, isFetched } = useQueryGetData({
    queryKey: [
      `Product-${EndPoint}-${page}`,
      `${stock}`,
      `${sorting}`,
      `${isRange}`,
      `${pageSize}`,
      `${isPrice}`,
      `${isSale}`,
    ],
    url: `/products?populate=*${EndPoint}&sort=createdAt:${sorting}${
      isRange > 0 ? `&filters[price]=0&filters[price]=${isRange}` : ""
    }${isPrice === "" ? "" : `&filters[price][$lte]=${isPrice}`}${
      isSale === 0 ? "" : `&filters[sale][$eq]=true`
    }&pagination[page]=${page}&pagination[pageSize]=${pageSize}${
      stock && `&filters[have_stock]=${stock}`
    }`,
    config: {
      headers: {
        Authorization: `Bearer ${Data_Parsing?.jwt}`,
      },
    },
  });

  // ! Handlers

  const handleChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const checked = e.target.checked;
      setPage(1);

      setSelectSubCategories(
        checked
          ? [...selectedSubCategories, value]
          : selectedSubCategories.filter((item) => item !== value)
      );
    },
    [selectedSubCategories]
  );

  const handleChangedRange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsRange(+e.target.value);
    setPage(1);
  }, []);

  const handleStockChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setStock(e.target.value);
    setPage(1);
  }, []);

  const changedSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+e.target.value);
  };

  const INCREMENT = useCallback(() => {
    setPage((prev) => prev + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const DECREMENT = useCallback(() => {
    setPage((prev) => (prev === 1 ? 1 : prev - 1));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleClicked = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrice(e.target.value);
  };

  const handleMoreFilters = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSale(+e.target.value);
  };

  // Effect

  useEffect(() => {
    if (window.location.href.includes("products")) {
      document.title = "Our Product`s";
    }
  }, [EndPoint, sorting]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // ! Render
  const MY_PRODUCT = data?.data?.map((item: IProduct) => (
    <div className="flex gap-2 items-center mb-2" key={item.id}>
      <input
        type="checkbox"
        id={item.attributes.title}
        value={item.attributes.title}
        onChange={handleChanged}
      />
      <label
        htmlFor={item.attributes.title}
        className="text-gray-950 font-medium cursor-pointer text-[15px]"
      >
        {item.attributes.title}
      </label>
    </div>
  ));

  const PRODUCT = dataTwo?.data?.map((item: IProduct) => (
    <ProductCard key={item.id} product={item} />
  ));

  return (
    <div className="flex w-full bg-[#f1f5f9]">
      <div
        className={`fixed z-40  lg:static cursor-pointer lg:cursor-auto bg-black/40 backdrop-blur-sm w-[100%] h-[100%] top-0
      ${isOpen ? "left-0 open-drawer" : "left-[-100%] close-drawer"}
      lg:bg-transparent lg:backdrop-blur-none lg:w-auto lg:h-auto lg:top-0 lg:left-[0]
      `}
        onClick={() => setIsOpen(false)}
      >
        <div
          className=" z-30 max-w-[350px] w-[250px] bg-white h-[100%] lg-h-screen border-r p-2 overflow-y-scroll cursor-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="font-bold text-lg">Filter By Category : </h2>
          {MY_PRODUCT}
          <h2 className="font-bold text-lg">Sorting : </h2>
          <div className="flex gap-2 items-center mb-2">
            <input
              type="radio"
              value={"asc"}
              checked={sorting === "asc" ? true : false}
              id="Ascending"
              name="optional"
              onChange={(e) => hanldeSort(e)}
            />
            <label
              htmlFor="Ascending"
              className="text-gray-950 font-medium cursor-pointer text-[15px]"
            >
              Ascending Order
            </label>
          </div>
          <div className="flex gap-2 items-center mb-2">
            <input
              type="radio"
              value={"desc"}
              checked={sorting === "desc" ? true : false}
              id="Descending"
              name="optional"
              onChange={(e) => hanldeSort(e)}
            />
            <label
              htmlFor="Descending"
              className="text-gray-950 font-medium cursor-pointer text-[15px]"
            >
              Descending Order
            </label>
          </div>
          <h2 className="font-bold text-lg">Prcing : </h2>
          <div className="flex gap-2 items-center mb-2">
            <input
              type="range"
              id="range"
              step={50}
              max={400}
              min={0}
              onChange={handleChangedRange}
              className="cursor-grab"
            />
            <span className="font-bold text-gray-950 text-[15px]">
              <span className="text-indigo-600">{isRange}</span> EGP
            </span>
          </div>
          <div className="flex gap-2 items-center mb-2">
            <input
              type="radio"
              defaultValue={"100"}
              id="than100"
              name="filters"
              onChange={(e) => handleChangePrice(e)}
            />
            <label
              htmlFor="than100"
              className="text-gray-950 font-medium cursor-pointer text-[15px]"
            >
              Less Than Or = 100 EGP
            </label>
          </div>
          <div className="flex gap-2 items-center mb-2">
            <input
              type="radio"
              defaultValue={200}
              id="than200"
              name="filters"
              onChange={(e) => handleChangePrice(e)}
            />
            <label
              htmlFor="than200"
              className="text-gray-950 font-medium cursor-pointer text-[15px]"
            >
              Less Than Or = 200 EGP
            </label>
          </div>
          <div className="flex gap-2 items-center mb-2">
            <input
              type="radio"
              defaultValue={300}
              id="than300"
              onChange={(e) => handleChangePrice(e)}
              name="filters"
            />
            <label
              htmlFor="than300"
              className="text-gray-950 font-medium cursor-pointer text-[15px]"
            >
              Less Than Or = 300 EGP
            </label>
          </div>
          <div className="flex gap-2 items-center mb-2">
            <input
              type="radio"
              defaultValue={400}
              id="than400"
              name="filters"
              onChange={(e) => handleChangePrice(e)}
            />
            <label
              htmlFor="than400"
              className="text-gray-950 font-medium cursor-pointer text-[15px]"
            >
              Less Than Or = 400 EGP
            </label>
          </div>

          <h2 className="font-bold text-lg">Stock`s : </h2>

          <div className="flex gap-2 items-center mb-2">
            <input
              type="radio"
              value={"true"}
              id="true"
              name="stock"
              onChange={handleStockChange}
            />
            <label
              htmlFor="true"
              className="text-gray-950 font-medium cursor-pointer text-[15px]"
            >
              In Stock
            </label>
          </div>
          <div className="flex gap-2 items-center mb-2">
            <input
              type="radio"
              value={"false"}
              id="false"
              name="stock"
              onChange={handleStockChange}
            />
            <label
              htmlFor="false"
              className="text-gray-950 font-medium text-[15px] cursor-pointer"
            >
              Out Stock
            </label>
          </div>
          <div className="flex gap-2 items-center mb-2">
            <input
              type="radio"
              value={""}
              id="reset"
              name="stock"
              onChange={handleStockChange}
            />
            <label
              htmlFor="reset"
              className="text-gray-950 font-medium text-[15px] cursor-pointer"
            >
              Reset
            </label>
          </div>
          <h2 className="font-bold text-lg">More Filter`s : </h2>
          <div className="flex gap-2 items-center mb-2">
            <input
              type="radio"
              defaultValue={1}
              id="sale"
              name="sale"
              onChange={handleMoreFilters}
            />
            <label
              htmlFor="sale"
              className="text-gray-950 font-medium cursor-pointer text-[15px]"
            >
              Sale`s
            </label>
          </div>
          <div className="flex gap-2 items-center mb-2">
            <input
              type="radio"
              defaultValue={0}
              id="resetsale"
              name="sale"
              onChange={handleMoreFilters}
              checked={sorting === "desc" ? true : false}
            />
            <label
              htmlFor="resetsale"
              className="text-gray-950 font-medium cursor-pointer text-[15px]"
            >
              Reset
            </label>
          </div>
        </div>
      </div>

      <div className="flex-1 relative mt-1 bg-[#f1f5f9]">
        <div className="container mx-auto lg:m-0 lg:p-2">
          <div className="flex items-center justify-between bg-white mb-3 p-3 rounded-sm">
            <h2 className="text-gray-400 font-medium">Exclusive Product`s</h2>
            <div className="flex items-center gap-2">
              <span className="text-gray-800 font-medium">Page Count : </span>
              <select
                className="w-28 border px-2 py-1 outline-none focus:ring-2"
                onChange={changedSelected}
              >
                <option value="12">12</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
          <Button
            className="bg-slate-500 hover:bg-gray-400 gap-2 black lg:hidden mb-3"
            onClick={handleClicked}
          >
            <Filter />
            <span>Filtered</span>
          </Button>
          <div className="grid right-side grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-hidden">
            {PRODUCT}
          </div>

          {!dataTwo?.data?.length && (
            <div className="w-full reg-login flex items-center justify-center flex-col gap-3 text-gray-300 text-3xl">
              <Loading />
            </div>
          )}

          {dataTwo?.data?.length ? (
            <Pagination
              page={page}
              pageCount={dataTwo?.meta?.pagination?.pageCount}
              total={dataTwo?.meta?.pagination?.total}
              INCREMENT={INCREMENT}
              DECREMENT={DECREMENT}
              isFetched={isFetched}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Product;
