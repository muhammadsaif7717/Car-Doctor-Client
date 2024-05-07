import { Helmet } from "react-helmet-async";
import Slider from "../Slider/Slider";
import About from "../About/About";
import Services from "../Services/Services";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Template | Home</title>
            </Helmet>

            <div className="my-10">
                <Slider></Slider>
                <About></About>
                <Services></Services>
            </div>
        </>
    );
};

export default Home;