import React, { useState, useEffect } from "react";
import "./Styles/testimonials.css";
import { FaChevronLeft, FaChevronRight, FaQuoteRight, FaStar } from "react-icons/fa";
import { people } from "../constants/index";

function Testimonials() {

    const [index, setIndex] = useState(0);
    const { name, job, image, text } = people[index];
    const checkNumber = (number) => {
        if (number > people.length - 1) {
            return 0;
        }
        if (number < 0) {
            return people.length - 1;
        }
            return number;
    };
    const nextPerson = () => {
        setIndex((index) => {
            let newIndex = index + 1;
            return checkNumber(newIndex);
        });
    };
    const prevPerson = () => {
    setIndex((index) => {
            let newIndex = index - 1;
            return checkNumber(newIndex);
        });
    };
    const randomPerson = () => {
        let randomNumber = Math.floor(Math.random() * people.length);
        if (randomNumber === index) {
            randomNumber = index + 1;
        }
        setIndex(checkNumber(randomNumber));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextPerson();
        }, 5000);
    
        return () => {
            clearInterval(interval);
        };
    }, [index]);
    
    


return (
    <div className="testmonial">
            <h1 className="testmonial-heading">Our Customers <span id="span">Reviews</span> </h1>
        <div className="testimonial-container">
            <div className="testmonial-details">
                <h1>We Got The <span id="span">Trust</span> Along with Taste .</h1>
                <p>We are really proud of our varied and devoted customer base at our restaurant. Our enthusiasm for delivering outstanding cuisine is fuelled by the faith of our esteemed clients, who are at the centre of all we do. With more than a thousand happy customers and more than 15 years of history, we have established ourselves as a community favourite for food.</p>
                <h2><span id="span">10000+</span> Satisfied Customers</h2>
                <h2><span id="span">10+</span> Years of Legacy</h2>    
            </div>

            <div className="review-container">
                <article className="review">
                    <div className="img-container">
                        <img src={image} alt={name} className="person-img" />
                        <span className="quote-icon">
                        <FaQuoteRight />
                        </span>
                    </div>

                    <h4 className="author">{name}</h4>
                    <p className="job"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></p>
                    <p className="info">{text}</p>

                    <div className="button-container">
                        <button className="prev-btn" onClick={prevPerson}>
                        <FaChevronLeft />
                        </button>
                        <button className="next-btn" onClick={nextPerson}>
                        <FaChevronRight />
                        </button>
                    </div>

                    <button className="random-btn" onClick={randomPerson}>
                        surprise me
                    </button>
                </article>
            </div>
        </div>
    </div>
  );
}

export default Testimonials;
