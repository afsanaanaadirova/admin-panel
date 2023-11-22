import { type PaginationType } from "./pagination";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationType) => {
  const numbers = [...Array(totalPages).keys()].map((n) => n + 1);

  return (
    <ul className="flex justify-center py-6 gap-x-6">
      <li>
        <a href="#" onClick={() => onPageChange(currentPage! - 1)}>
          prev
        </a>
      </li>
      {numbers.map((n) => (
        <li className={`${currentPage === n ? "active" : ""}`} key={n}>
          <a href="#" onClick={() => onPageChange(n)}>
            {n}
          </a>
        </li>
      ))}
      <li>
        <a href="#" onClick={() => onPageChange(currentPage! + 1)}>
          next
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
