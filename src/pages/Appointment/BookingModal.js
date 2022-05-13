import { format } from "date-fns";
import React from "react";

const BookingModal = ({ treatment, date,setTreatment }) => {
  const { name, slots } = treatment;



  const handleBooking=e=>{
    e.preventDefault();
    const slot=e.target.slot.value 
    console.log(slot)
    setTreatment(null)
  }
  return (
    <div>
      <input type="checkbox" id="booking-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <label
            for="booking-modal"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="font-bold text-lg text-secondary">Booking for:{name}</h3>
          <form 
          onSubmit={handleBooking}
          className="grid grid-cols-1 gap-5 justify-items-center mt-5">
            <input
              type="text"
              disabled
              value={format(date, "PP")}
              class="input input-bordered w-full max-w-xs"
            />
            <select name="slot" class="select select-bordered w-full max-w-xs">
             {
               slots.map(slot=><option value={slot}>{slot}</option>)
             }
            </select>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              class="input input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              class="input input-bordered w-full max-w-xs"
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
          {/* <div class="modal-action">
            <label for="booking-modal" class="btn">
              Yay!
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
