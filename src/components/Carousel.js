import React from 'react'

export default function Carousel() {
    return (
        <div>
            <div id="carousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000"style={{objectFit:"contain !important"}}>
                <div className="carousel-inner">
                    <div className="carousel-caption" style={{ zIndex: "10", filter: "brightness(85%)"}}>
                        <form className="d-flex ">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn text-white bg-info" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://wallpapers.com/images/hd/chicken-biryani-in-an-iron-dish-1moa8uptmc2y8b5i.jpg" className="d-block w-100" alt="..." style={{ filter: "brightness(40%)", maxHeight:"600px"}} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images7.alphacoders.com/129/1290221.jpg" className="d-block w-100" alt="..." style={{ filter: "brightness(40%)", maxHeight:"600px" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://wallpapers.com/images/featured/delicious-food-pictures-i5wjpvjqrk3qroy0.jpg" className="d-block w-100" alt="..." style={{ filter: "brightness(40%)", maxHeight:"600px"}} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
