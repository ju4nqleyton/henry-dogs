import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDogById } from '../../redux/action';
import './Detail.css';

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.dog);

  useEffect(() => {
    dispatch(getDogById(id));
  }, [dispatch, id]);

  function getImage(dog) {
    if (dog.image) {
      return dog.image;
    } else {
      return `https://cdn2.thedogapi.com/images/${dog.img}.jpg`
        ? `https://cdn2.thedogapi.com/images/${dog.img}.jpg`
        : `https://cdn2.thedogapi.com/images/${dog.img}_1280.jpg`;
    }
  }

  return (
    <div className="detail-box">
      <div className="detail-container">
        <div className="detail-info">
          <table>
            <tr>
              <th>Name:</th>
              <td>{dog.name}.</td>
            </tr>
            <tr>
              <th>Height:</th>
              <td>{dog.height} ft.</td>
            </tr>
            <tr>
              <th>Weight:</th>
              <td>{dog.weight} pounds.</td>
            </tr>
            <tr>
              <th>Temperaments:</th>
              <td>{dog.temperament?.join(', ')}.</td>
            </tr>
            <tr>
              <th>Life Span:</th>
              <td>{dog.life_span}.</td>
            </tr>
          </table>
        </div>
        <div className="detail-image">
          <div className="image-container">
            <img width={600} src={getImage(dog)} alt={dog.name} />
          </div>
        </div>
      </div>
      <div className="home-button-detail">
        <Link to={'/home'}>
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
}
