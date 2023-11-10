import { useHistory } from 'react-router-dom';
import './Landing.css';
import welcome from './welcome.svg';

export default function Landing() {
  const history = useHistory();

  function handleEnter() {
    history.push('/home');
  }

  return (
    <div className="container">
      <img src={welcome} alt="Banner" className="banners no-padding" />
      <button className="enter-button" onClick={handleEnter}>
        Enter
      </button>
    </div>
  );
}
