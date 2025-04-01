const cars = [
    {
        "image": "https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80",
        "model": "Hyundai Exter",
        "seating": "5 Passengers",
        "engine": "1.2L Petrol Engine",
        "power": "83 HP @ 6000 RPM",
        "luggage": "Spacious boot",
        "comfort": "Fabric seats",
        "entertainment": "8\" Touchscreen infotainment",
        "safety_rating": "4-Star Global NCAP",
        "airbags": "6 Airbags"
    },
    {
        "image": "https://www.popularmaruti.com/blog/wp-content/uploads/2022/07/1.jpg",
        "model": "Maruti Suzuki Ertiga",
        "seating": "7 Passengers",
        "engine": "1.5L Petrol Engine",
        "power": "103 HP @ 6000 RPM",
        "luggage": "Decent boot space",
        "comfort": "Fabric seats",
        "entertainment": "7\" Touchscreen infotainment",
        "safety_rating": "3-Star Global NCAP",
        "airbags": "4 Airbags"
    },
    {
        "image": "https://imgd.aeplcdn.com/664x374/n/cw/ec/107543/brezza-exterior-right-front-three-quarter-7.jpeg?isig=0&q=80",
        "model": "Maruti Brezza ",
        "seating": "5 Passengers",
        "engine": "1.5L Petrol Engine",
        "power": "103 HP @ 6000 RPM",
        "luggage": "Decent boot space",
        "comfort": "Fabric seats",
        "entertainment": "7\" Touchscreen infotainment",
        "safety_rating": "4-Star Global NCAP",
        "airbags": "6 Airbags"
    },

    {
        "image": "https://i.pinimg.com/736x/1d/ca/a1/1dcaa112feb096ccb2bade4f2385e8f7.jpg",
        "model": "Toyota Innova",
        "seating": "7 Passengers",
        "engine": "1.5L Petrol Engine",
        "power": "103 HP @ 6000 RPM",
        "luggage": "Decent boot space",
        "comfort": "Fabric seats",
        "entertainment": "7\" Touchscreen infotainment",
        "safety_rating": "4-Star Global NCAP",
        "airbags": "6 Airbags"
    }
    ,
    {
        "image": "https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/115601/xl6-exterior-right-front-three-quarter-13.jpeg?isig=0&q=80",
        "model": "Maruti Suzuki XL6",
        "seating": "6 Passengers",
        "engine": "1.5L Smart Hybrid Petrol Engine  ",
        "power": "103 HP @ 6000 RPM",
        "luggage": "Moderate boot space",
        "comfort": "Captain seats",
        "entertainment": "SmartPlay Studio infotainment",
        "safety_rating": "4-Star Global NCAP",
        "airbags": "4 Airbags"
    },
    {
        "image": "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/140809/innova-crysta-exterior-left-front-three-quarter.jpeg?isig=0&q=80&q=80",
        "model": "Toyota Innova Crysta",
        "seating": "7 Passengers",
        "engine": "2.4L Diesel Engine",
        "power": "150 HP @ 3400 RPM",
        "luggage": "Large boot space",
        "comfort": "Premium fabric seats",
        "entertainment": "7\" Touchscreen infotainment",
        "safety_rating": "4-Star Global NCAP",
        "airbags": "7 Airbags"
    }
    ,    
    {
        "image": "https://buscdn.cardekho.com/in/bharatbenz/9t-tourist-bus/bharatbenz-9t-tourist-bus.jpg?impolicy=resize&imwidth=480",
        "model": "BharatBenz Mini Bus",
        "seating": "18 Passengers",
        "engine": "3.9L Diesel Engine",
        "power": "170 HP @ 2500 RPM",
        "luggage": "Large luggage area",
        "comfort": "Reclining seats with AC",
        "entertainment": "Speaker System with Mic",
        "airbags": "2 Airbags",
        "safety_rating": "4-Star"
    },
    {
        "image": "https://imgd.aeplcdn.com/1200x900/n/cw/ec/34467/wagonr-exterior-right-front-three-quarter-3.jpeg?q=80",
        "model": "Maruti Suzuki WagonR",
        "seating": "5 Passengers",
        "engine": "1.0L Petrol Engine",
        "power": "67 HP @ 5500 RPM",
        "luggage": "Medium boot space",
        "comfort": "Fabric seats",
        "entertainment": "Touchscreen infotainment",
        "safety_rating": "3-Star Global NCAP",
        "airbags": "2 Airbags"
    },
    {
        "image": "https://i.ytimg.com/vi/5FSmIts2R3o/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCoO66qOzGcg5Zde1vhoU3RQPRVhA",
        "model": "Maruti Suzuki Eeco",
        "seating": "8 Passengers",
        "engine": "1.2L Petrol Engine",
        "power": "72 HP @ 6000 RPM",
        "luggage": "Compact boot",
        "comfort": "Basic seating",
        "entertainment": "Basic audio system",
        "safety_rating": "2-Star Global NCAP",
        "airbags": "2 Airbags"
    },
    {
        "image": "https://imgd.aeplcdn.com/1280x720/n/cw/ec/127563/alto-k10-exterior-right-front-three-quarter-58.jpeg?isig=0&q=80",
        "model": "Maruti Suzuki Alto K10",
        "seating": "5 Passengers",
        "engine": "1.0L Petrol Engine",
        "power": "67 HP @ 5500 RPM",
        "luggage": "Small boot space",
        "comfort": "Basic seats",
        "entertainment": "2-DIN Music System",
        "safety_rating": "2-Star Global NCAP",
        "airbags": "2 Airbags"
    },
    {
        "image": "https://parkplus-bkt-img.parkplus.io/production/chariot_staging/public/taveraneochevroletcoverjpgjpgimage_20230918195441942728.jpg",
        "model": "Chevrolet Tavera",
        "seating": "10 Passengers",
        "engine": "2.5L Diesel Engine",
        "power": "80 HP @ 3900 RPM",
        "luggage": "Spacious boot",
        "comfort": "Cushioned seats",
        "entertainment": "FM Radio",
        "safety_rating": "3-Star Global NCAP",
        "airbags": "2 Airbags"
    },
    {
        "image": "https://imgd.aeplcdn.com/664x374/n/cw/ec/45245/datsun-redi-go-right-front-three-quarter19.jpeg?q=80",
        "model": "Datsun Redi-Go",
        "seating": "5 Passengers",
        "engine": "0.8L Petrol Engine",
        "power": "54 HP @ 5678 RPM",
        "luggage": "Small boot space",
        "comfort": "Basic seats",
        "entertainment": "Bluetooth Audio",
        "safety_rating": "2-Star Global NCAP",
        "airbags": "1 Airbag"
    }
];

let currentIndex = 0;

function init() {
    const car = cars[currentIndex];
    
    const container = document.createElement('div');
    container.className = 'showcase-container';
    
    container.innerHTML = `
        <div class="bg-gradient">
            <div class="slider-container">
                <div class="slider">
                    <img src="${car.image}" alt="${car.model}" class="slider-image">
                </div>
                <div class="car-info">
                    <h1>${car.model}</h1>
                    <p><strong>Seating:</strong> ${car.seating}</p>
                    <p><strong>Safety Rating:</strong> ${car.safety_rating}</p>
                    <p><strong>Airbags:</strong> ${car.airbags}</p>
                    <p><strong>Engine:</strong> ${car.engine}</p>
                    <p><strong>Power:</strong> ${car.power}</p>
                    <p><strong>Luggage:</strong> ${car.luggage}</p>
                    <p><strong>Comfort:</strong> ${car.comfort}</p>
                    <p><strong>Entertainment:</strong> ${car.entertainment}</p>
                </div>
                <div class="navigation-buttons">
                    <button class="nav-button" onclick="changeSlide(-1)">Previous</button>
                    <button class="nav-button" onclick="changeSlide(1)">Next</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('root').innerHTML = "";
    document.getElementById('root').appendChild(container);
}

function changeSlide(direction) {
    currentIndex = (currentIndex + direction + cars.length) % cars.length;
    init();
}

document.addEventListener('DOMContentLoaded', init);
