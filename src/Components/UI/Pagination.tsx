import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";

interface IPagination {
  page: number;
  pageCount: number;
  INCREMENT: () => void;
  DECREMENT: () => void;
  isFetched: boolean;
  total: number;
}

const Pagination = ({
  page,
  pageCount,
  INCREMENT,
  DECREMENT,
  isFetched,
  total
}: IPagination) => {
  return (
    <div className="flex items-center gap-2 justify-center my-4">
      <span className="text-gray-400 font-medium text-[15px]">
        Page {page} To {pageCount} oF {total} Product`s
      </span>
      <div className="flex items-center justify-center">
        <button
          className="bg-gray-950 outline-none flex hover:bg-gray-800  items-center gap-1 justify-center p-1 transition text-white w-[90px] rounded-none rounded-s-md disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={DECREMENT || isFetched}
        >
          <ArrowBigLeftDash size={20} />
          <span className="mb-0 block tracking-wide">Prev</span>
        </button>
        <button
          className="bg-gray-950 outline-none hover:bg-gray-800 flex  items-center gap-1 justify-center p-1 transition text-white w-[90px] rounded-none rounded-e-md disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-not-allowed"
          disabled={page === pageCount}
          onClick={INCREMENT || isFetched}
        >
          <span className="mb-0 block tracking-wide">Next</span>
          <ArrowBigRightDash size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
