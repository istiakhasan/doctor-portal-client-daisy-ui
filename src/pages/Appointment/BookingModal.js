import { format } from "date-fns";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const BookingModal = ({ treatment, date,setTreatment }) => {
  const { name, slots } = treatment;
  const [user, loading, error] = useAuthState(auth);



  const handleBooking=e=>{
    e.preventDefault();
    const slot=e.target.slot.value 
    console.log(slot)
    setTreatment(null)
  }
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-secondary">Booking for:{name}</h3>
          <form 
          onSubmit={handleBooking}
          className="grid grid-cols-1 gap-5 justify-items-center mt-5">
            <input
              type="text"
              disabled
              value={format(date, "PP")}
              className="input input-bordered w-full max-w-xs"
            />
            <select name="slot" className="select select-bordered w-full max-w-xs">
             {
               slots.map((slot,i)=><option key={i} value={slot}>{slot}</option>)
             }
            </select>
            <input
              type="text"
              value={user?.displayName}
              disabled
              name="name"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              disabled
              value={user?.email}
              name="email"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-secondary w-full max-w-xs"
            />
          </form>
          {/* <div className="modal-action">
            <label for="booking-modal" className="btn">
              Yay!
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
