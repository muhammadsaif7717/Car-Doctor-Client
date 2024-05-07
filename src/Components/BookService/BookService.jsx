import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import axios from "axios";


const BookService = () => {
    const loadedService = useLoaderData();
    const service = loadedService.data
    const { title, img, price } = service;
    const { user } = useContext(AuthContext);

    const handleBookService = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = form.email.value;
        const price = form.price.value;
        const message = form.message.value;
        const order = {
            customerName: name,
            email: email,
            service:title,
            price: price,
            date: date,
            img: img,
            message: message,
        }
        console.log(order)
        axios.post(`http://localhost:5000/bookings`, order)
            .then(res => console.log(res.data))
        form.reset();
    }
    const today = new Date().toISOString().substr(0, 10);
    return (
        <div className="bg-[#F3F3F3] p-10 mt-14">
            <h1 className="text-3xl font-bold  text-center">Book Service: {title}</h1>

            <form onSubmit={handleBookService} className="mt-7 space-y-5">
                {/* row-1 */}
                <div className="flex gap-5 ">
                    <div className="flex flex-col w-1/2">
                        <label className="font-bold">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            defaultValue={user.displayName}
                            className="input input-bordered" />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="font-bold">Name</label>
                        <input
                            type="date"
                            name="date"
                            defaultValue={today}
                            className="input input-bordered" />
                    </div>
                </div>
                {/* row-2 */}
                <div className="flex gap-5 ">
                    <div className="flex flex-col w-1/2">
                        <label className="font-bold">Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Your Email"
                            defaultValue={user.email}
                            className="input input-bordered" />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="font-bold">Price</label>
                        <input
                            type="text"
                            name="price"
                            placeholder="Your Name"
                            defaultValue={'$' + ' ' + price}
                            className="input input-bordered" />
                    </div>
                </div>
                <div>
                    <textarea
                        name="message"
                        placeholder="Message"
                        defaultValue={`Do Fast`}
                        className="input input-bordered w-full pt-3"></textarea>
                </div>
                <div>
                    <input type="submit" value="Book Now" className="btn btn-accent w-full" />
                </div>
            </form>
        </div>
    );
};

export default BookService;