import axios from "axios";
import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        axios('http://localhost:5000/services')
            .then(res => {
                setServices(res.data)
        })
    }, [])
    console.log(services)
    return (
        <div className="my-14">
            <h1 className="text-2xl font-bold text-center  text-orange-500">Service</h1>
            <div className="flex flex-col items-center text-center justify-center space-y-2 mt-5">
                <h1 className="text-3xl font-bold">Our Service Area</h1>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don{`'`}t look even slightly believable. </p>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 ">
                    {
                        services.map(service =>
                            <div key={service._id} className="p-5 border rounded-xl space-y-3 h-full">
                                <img src={service.img} className="w-full rounded-xl h-2/3" />
                                <h1 className="text-xl font-bold">{ service.title}</h1>
                                <div className="flex justify-between">
                                    <h1 className=" text-orange-500">Price: {service.price}</h1>
                                    <Link to={`book-service/${service._id}`}>
                                    <FaLongArrowAltRight className="text-orange-500"></FaLongArrowAltRight>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </div>
        </div>
    );
};

export default Services;