import { useState } from 'react';
import { styled } from 'styled-components';
import SuccessMsg from './SuccessMsg';
import { useNavigate } from 'react-router-dom';
import { url } from '../data';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    timeHour: '12',
    timeMinute: '00',
    people: '1',
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const time = `${formData.timeHour}:${formData.timeMinute}`;
    const updatedFormData = { ...formData, time };

    await fetch(`${url}/reservation`, {
      method: 'POST',
      body: JSON.stringify(updatedFormData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'fail') {
          if (data.error.errors.date) {
            return alert(data.error.errors.date.message);
          }
        } else {
          setSuccess(true);
          setTimeout(() => {
            navigate('/');
          }, 5000);
        }
      })
      .catch((err) => console.error(err));
  };

  const hourOptions = Array.from({ length: 11 }, (_, index) =>
    (index + 12).toString()
  );

  const minuteOptions = Array.from({ length: 4 }, (_, index) =>
    (index * 15).toString().padStart(2, '0')
  );

  const numOfPeople = Array.from({ length: 12 }, (_, index) => index + 1);
  numOfPeople.push('More than 12');

  if (success) return <SuccessMsg />;

  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-con-1">
        <label htmlFor="name">name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="group">number of people:</label>
        <select
          min={1}
          max={12}
          step={1}
          name="people"
          value={formData.people}
          onChange={handleChange}
          required
        >
          {numOfPeople.map((people) => {
            return (
              <option key={people} value={people}>
                {people}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-con-2">
        <div className="date">
          <label htmlFor="date">date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="timeHour">Time:</label>
          <select
            name="timeHour"
            value={formData.timeHour}
            onChange={handleChange}
            required
          >
            {hourOptions.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <select
            name="timeMinute"
            value={formData.timeMinute}
            onChange={handleChange}
            required
          >
            {minuteOptions.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="button">
        book a table
      </button>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.8fr 0.2fr;
  padding: 2rem;
  margin-top: 2rem;
  margin-bottom: 4rem;
  border-radius: 15px;
  gap: 0.5rem;
  .form-con-1,
  .form-con-2 {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .form-con-2 {
    justify-content: space-evenly;
  }

  button {
    width: 100%;
    grid-column-start: 1;
    grid-column-end: 3;
  }

  label {
    align-self: flex-start;
    color: #eee46f;
    font-size: 1.2rem;
    margin-right: 1rem;
    text-transform: capitalize;
  }
  input {
    background: #ede9be;
    font-size: 1rem;
    padding: 0.3rem 1rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    border-color: transparent;
  }
  select {
    background: #ede9be;
    font-size: 1rem;
    padding: 0.3rem 1rem;
    border: none;
    border-radius: 5px;
    margin-right: 5px;
  }

  @media screen and (max-width: 680px) {
    display: flex;
    flex-direction: column;
    .form-con-1 {
      margin-bottom: 2rem;
    }
    .form-con-2 {
      align-items: start;
    }
  }
`;

export default ReservationForm;
