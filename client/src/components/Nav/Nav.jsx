import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  filterByTemperament,
  filterByOrigin,
  sortByName,
  sortByWeight,
  clear,
} from '../../redux/action';
import './Nav.css';

export default function Nav({ handleChange, handleSubmit, setPage, search }) {
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  function handleTemperamentClick(temperament) {
    dispatch(filterByTemperament(temperament));
    setPage(1);
  }

  function handleOriginClick(origin) {
    dispatch(filterByOrigin(origin));
    setPage(1);
  }

  function handleOrderClick(order) {
    dispatch(sortByName(order));
    setPage(1);
  }

  function handleOrderWeight(order) {
    dispatch(sortByWeight(order));
    setPage(1);
  }

  function handleClearClick() {
    dispatch(clear());
    setPage(1);
    const selects = document.querySelectorAll('select');
    selects.forEach((select) => {
      select.value = '';
    });
  }

  return (
    <nav>
      <div className="search">
        <div className="search-box">
          <form onChange={(e) => handleChange(e)}>
            <input
              style={{ width: '1000px' }}
              type="search"
              placeholder="Search for a dog breed"
              value={search}
              onChange={handleChange}
            />
            <button type="submit" onClick={handleSubmit}>
              Search
            </button>
          </form>
        </div>
        <Link to={'/create'}>
          <button className="create-dog-button">Create a Dog</button>
        </Link>
      </div>
      <div className="selectors">
        <div className="temperaments-select">
          <select
            defaultValue=""
            onChange={(e) => handleTemperamentClick(e.target.value)}
          >
            <option value="" disabled>
              Choose a Temperament
            </option>
            {temperaments.map((temperament) => (
              <option key={temperament.id} value={temperament.name}>
                {temperament.name}
              </option>
            ))}
          </select>
        </div>
        <div className="origin-select">
          <select
            defaultValue=""
            onChange={(e) => handleOriginClick(e.target.value)}
          >
            <option value="" disabled>
              Choose an Origin
            </option>
            <option value="api">API</option>
            <option value="database">Database</option>
          </select>
        </div>
        <div className="order-name-select">
          <select
            defaultValue=""
            onChange={(e) => handleOrderClick(e.target.value)}
          >
            <option value="" disabled>
              Choose Order
            </option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="order-weight-select">
          <select
            defaultValue=""
            onChange={(e) => handleOrderWeight(e.target.value)}
          >
            <option value="" disabled className="weight-select">
              Choose Weight
            </option>
            <option value="asc">Min to Max</option>
            <option value="desc">Max to Min</option>
          </select>
        </div>
        <button onClick={handleClearClick}>Clear</button>
      </div>
    </nav>
  );
}
