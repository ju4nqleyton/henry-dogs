import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getDogsByName, fetchTemperaments } from '../../redux/action';
import Nav from '../../components/Nav/Nav';
import Cards from '../../components/Cards/Cards';
import Footer from '../../components/Footer/Footer';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState('');

  function handleChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (search === '') return;
    dispatch(getDogsByName(search));
    setSearch('');
  }

  useEffect(() => {
    dispatch(getDogs());
    dispatch(fetchTemperaments());
  }, [dispatch]);

  return (
    <div className="container">
      <Nav
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        page={page}
        setPage={setPage}
        search={search}
      />
      <Cards allDogs={allDogs} page={page} setPage={setPage} />
      <Footer />
    </div>
  );
}
