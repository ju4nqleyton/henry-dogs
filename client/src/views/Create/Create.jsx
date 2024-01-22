import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createADog } from '../../redux/action';
import './Create.css';

export default function Create() {
  const [form, setForm] = useState({
    name: '',
    image: '',
    height: '',
    weight: '',
    life_span: '',
    temperament: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    image: '',
    height: '',
    weight: '',
    life_span: '',
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // eslint-disable-next-line
  const [successMessage, setSuccessMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  const validations = {
    name: /^[a-zA-Z\s]+$/,
    image: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
    height: /^\d+(\.\d+)? - \d+(\.\d+)?$/,
    weight: /^\d+(\.\d+)? - \d+(\.\d+)?$/,
    life_span: /^\d+(\.\d+)? - \d+(\.\d+)?$/,
  };

  useEffect(() => {
    if (isButtonDisabled) {
      setSuccessMessage(null);
    }
  }, [isButtonDisabled]);

  function validate(input, name) {
    const updatedErrors = { ...errors };
    if (name) {
      validateRegex(name, input, updatedErrors);
    } else {
      for (let key in input) {
        validateRegex(key, input, updatedErrors);
      }
    }

    const hasEmptyField = Object.values(input).some((value) => value === '');
    setIsButtonDisabled(
      Object.values(errors).some((error) => error) || hasEmptyField
    );

    setErrors(updatedErrors);
  }

  function validateRegex(key, input, updatedErrors) {
    if (
      validations[key] instanceof RegExp &&
      !validations[key].test(input[key])
    ) {
      updatedErrors[key] = 'Invalid Field';
    } else {
      updatedErrors[key] = '';
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    validate({ ...form, [name]: value }, name);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    validate(form);

    if (!Object.values(errors).some((error) => error)) {
      try {
        await dispatch(createADog(form));
        setSuccessMessage('Dog created successfully!');
        setShowSuccessMessage(true);
        setForm({
          name: '',
          image: '',
          height: '',
          weight: '',
          life_span: '',
          temperament: [],
        });
        setIsButtonDisabled(true);

        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } catch (error) {}
    }
  }

  return (
    <>
      <div className="create-box">
        <div className="create-container">
          <h2>Create a Dog</h2>
          <form className="create-form" onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Name:</label>
                  </td>
                  <td>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Labrador Retriever"
                    />
                    <div className="errors">{errors.name}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Image:</label>
                  </td>
                  <td>
                    <input
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="https://example.com/labrador_retriver.jpg"
                    />
                    <div className="errors">{errors.image}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Height:</label>
                  </td>
                  <td>
                    <input
                      name="height"
                      value={form.height}
                      onChange={handleChange}
                      placeholder="55 - 62"
                    />
                    <div className="errors">{errors.height}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Weight:</label>
                  </td>
                  <td>
                    <input
                      name="weight"
                      value={form.weight}
                      onChange={handleChange}
                      placeholder="29 - 36"
                    />
                    <div className="errors">{errors.weight}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Life Span:</label>
                  </td>
                  <td>
                    <input
                      name="life_span"
                      value={form.life_span}
                      onChange={handleChange}
                      placeholder="10 - 12"
                    />
                    <div className="errors">{errors.life_span}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Temperament:</label>
                  </td>
                  <td>
                    <select
                      name="temperament"
                      value={form.temperament}
                      onChange={handleChange}
                    >
                      <option value="">Select a Temperament</option>
                      {temperaments.map((temperament) => (
                        <option key={temperament.id} value={temperament.name}>
                          {temperament.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="form-actions">
              <button
                type="submit"
                className={
                  isButtonDisabled ? 'button-disabled' : 'button-enabled'
                }
              >
                Create
              </button>
            </div>
          </form>
          {showSuccessMessage && (
            <p className="success">Dog created successfully!</p>
          )}
        </div>
      </div>
      <div className="home-button-create">
        <Link to={'/home'}>
          <button>Home</button>
        </Link>
      </div>
    </>
  );
}
