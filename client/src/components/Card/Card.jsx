import { useHistory } from 'react-router-dom';
import './Card.css';

export default function Card(props) {
  const { id, name, img, temperament, weight } = props;

  const history = useHistory();

  function goToDetails() {
    history.push(`/detail/${id}`);
  }

  function getImage(img) {
    if (img.includes('.jpg') || img.includes('.png')) {
      return img;
    } else {
      return `https://cdn2.thedogapi.com/images/${img}.jpg`
        ? `https://cdn2.thedogapi.com/images/${img}.jpg`
        : `https://cdn2.thedogapi.com/images/${img}_1280.jpg`;
    }
  }

  return (
    <div className="card" onClick={() => goToDetails()}>
      <div className="image">
        <img
          style={{
            margin: '0',
            width: '100%',
          }}
          width={254}
          src={getImage(img)}
          alt={name}
        />
      </div>
      <div className="details" style={{ margin: '20px' }}>
        <table
          className="table-no-margin"
          style={{ borderCollapse: 'collapse' }}
        >
          <tbody>
            <tr>
              <td className="table-no-margin">
                <b>Name:</b>
              </td>
              <td>{name}.</td>
            </tr>
            <tr>
              <td className="table-no-margin">
                <b>Temperaments:</b>
              </td>
              <td>{temperament?.join(', ')}.</td>
            </tr>
            <tr>
              <td className="table-no-margin">
                <b>Weight:</b>
              </td>
              <td>{weight} pounds.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
