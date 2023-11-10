import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import Paginator from '../Paginator/Paginator';
import './Cards.css';

export default function Cards({ allDogs, page, setPage }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (page === 1) {
      setCount(0);
      return;
    } else if (page === 2) {
      setCount(8);
    } else {
      setCount(page * 8 - 8);
    }
  }, [page]);

  return (
    <div>
      <div className="cards-container">
        {allDogs.slice(count, 8 * page).map((dog) => (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            img={dog.img}
            temperament={dog.temperament}
            weight={dog.weight}
            height={dog.height}
          />
        ))}
      </div>
      <Paginator
        page={page}
        setPage={setPage}
        totalPages={Math.ceil(allDogs.length / 8)}
      />
    </div>
  );
}
