import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    useEffect(() => {
        axios.get(url,{withCredentials:true})
            .then(res => {
                console.log(res.data);
                setBookings(res.data);
            })
            .catch(error => console.error("Error fetching bookings:", error));
    }, [url]);

    //update
    const handleConfirm = id => {
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(result => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:5000/bookings/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                icon: "success"
                            });

                            //update state
                            const remaining = bookings.filter(booking => booking._id !== id)
                            const updated = bookings.find(booking => booking._id === id)
                            updated.status = 'confirm'
                            const newBooking = [updated, ...remaining];
                            setBookings(newBooking);
                        }
                    })
                    .catch(error => console.error("Error deleting booking:", error));
            }
        });
    }




    // Delete
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/bookings/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                            // Use functional update to remove deleted booking
                            const remaining = bookings.filter(booking => booking._id !== id)
                            setBookings(remaining);
                        }
                    })
                    .catch(error => console.error("Error deleting booking:", error));
            }
        });
    };

    return (
        <div>
            <h1>Your booking: {bookings.length}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking._id}>
                                <th>
                                    <button onClick={() => handleDelete(booking._id)} className="btn btn-sm btn-circle bg-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 h-24 rounded-xl">
                                            <img src={booking.img} alt="Booking" />
                                        </div>
                                    </div>
                                </td>
                                <td>{booking.service}</td>
                                <td>{booking.date}</td>
                                <td>{booking.price}</td>
                                <td>
                                    {
                                        booking.status === 'confirm' ?
                                            <span className="btn w-full btn-success">Confirmed</span>
                                            :
                                            <button onClick={() => handleConfirm(booking._id)} className="btn w-full btn-warning">Please Confirm</button>


                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;
