import { Helmet } from "react-helmet-async";
import person  from "../../assets/images/about_us/person.jpg";
import  parts  from "../../assets/images/about_us/parts.jpg";

const About = () => {



    return (
        <div className="flex flex-col justify-center items-center my-14">
            <Helmet>
                <title>Template | About</title>
            </Helmet>
            <h1 className="text-2xl font-bold text-orange-500">About Us</h1>
            <div className="hero mb-10">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="relative">
                    <img src={person} className="w-3/4 rounded-lg shadow-2xl" />
                    <img src={parts} className="w-1/2 rounded-lg shadow-2xl absolute -bottom-7 md:-bottom-14 right-20  border-8 border-white" />
                   </div>
                    <div className="mt-10 md:mt-16 lg:mt-0">
                        <h1 className="text-3xl font-bold">We are qualified  & of experience  in this field</h1>
                        <p className="py-2">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don{`'`}t look even slightly believable. </p>
                        <button className="btn btn-ghost text-white bg-orange-500">Get More Info</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;