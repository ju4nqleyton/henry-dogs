import './Paginator.css';

export default function Paginator({ totalPages = 10, setPage, page }) {
  function previous() {
    if (page <= 1) return;
    setPage((p) => p - 1);
  }

  function next() {
    if (page >= totalPages) return;
    setPage((p) => p + 1);
  }

  return (
    <div className="paginator">
      <button
        className={page === 1 ? 'disabled' : ''}
        onClick={() => previous()}
      >
        Previous
      </button>
      <button>{page}</button>
      <button
        className={page >= totalPages ? 'disabled' : ''}
        onClick={() => next()}
      >
        Next
      </button>
    </div>
  );
}
