import React, { useContext, useEffect, useState } from 'react'
import NotesContext from '../context/notes/NotesContext';
import { Link, useNavigate } from "react-router-dom";

function Reservation(props) {
    const context = useContext(NotesContext);
    const { formData, setFormData, availableTimes } = context;
    const navigate = useNavigate();

    const [formValid, setFormValid] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        const updatedFormData = { ...formData, [name]: value };
        console.log(updatedFormData)
        setFormData(updatedFormData);
        validateForm(updatedFormData);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        props.submitForm(e);
        // Process the form data or make an API request
        console.log('Form submitted:', formData);
        // Reset the form fields
        setFormData({
            date: '',
            time: '',
            seating: '',
            occasion: '',
        });
        setFormValid(false);
    };

    const validateForm = (data) => {
        const { date, time, seating, occasion } = data;
        console.log(formValid)
        if (date && time && seating && occasion) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    };

    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/reservation")
        } else {
            navigate("/login")
        }

        // eslint-disable-next-line
    }, [])

    return (
        <div className=' flex h-screen justify-center items-center bg-gray-500'>
            <div className="bookingContainer flex mx-5 my-10 justify-center items-center w-5/6 h-5/6 border-2 border-black rounded-3xl">
                <div className="left w-1/2 h-3/6 flex flex-col justify-center items-center m-5">
                    <h1 className='text-3xl my-5 font-bold' >Welcome to our Booking Form!</h1>
                    <p className='bookingDescription text-base font-semibold text-center'>Embark on a remarkable journey of personalized service and remarkable experiences, as we redefine the art of booking and cater to your every desire.</p>
                </div>
                <div className="right h-5/6 flex w-1/2 justify-center m-5  rounded-lg border-gray-400 border-2">
                    <form className="booking-form w-full p-6 " onSubmit={handleSumbit}>

                        <label className='block my-2 font-bold' htmlFor="res-date">Choose date</label>
                        <input className='w-full p-2 border-gray-400 border-2 rounded-lg bg-gray-400' type="date" id="res-date" value={formData.date} name='date' onChange={handleChange} min={currentDate} />

                        <label className='block my-2 font-bold' htmlFor="res-time">Choose time</label>
                        <select className='w-full p-2 border-gray-400 border-2 rounded-lg bg-gray-400' type="time" id="res-time" value={formData.time} name='time' onChange={handleChange} required>
                            <option value="">Select a time</option>
                            {availableTimes && availableTimes.map((timeOption) => (
                                <option key={timeOption}>{timeOption}</option>
                            ))}
                        </select>

                        <label className='block my-2 font-bold' htmlFor="guests">Number of guests</label>
                        <input className='w-full p-2 border-gray-400 border-2 rounded-lg bg-gray-400' type="number" placeholder="0" min="1" max="10" id="guests" name='seating' value={formData.seating} onChange={handleChange} required />

                        <label className='block my-2 font-bold' htmlFor="occasion">Occasion</label>
                        <select className='w-full p-2 border-gray-400 border-2 rounded-lg bg-gray-400' type="select" id="occasion" name='occasion' value={formData.occasion} onChange={handleChange} required>
                            <option value="">Select an occasion</option>
                            <option>Birthday</option>
                            <option>Anniversary</option>
                            <option>Others</option>
                        </select>

                        {formValid ? (
                            <Link to='/dishlist' className='block my-4 p-3 text-white bg-blue-500 rounded-lg text-center'>Make Your reservation</Link>
                        ) : (
                            <span className='block my-4 p-3 text-white bg-gray-300 rounded-lg text-center cursor-pointer'>Make Your reservation span</span>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Reservation