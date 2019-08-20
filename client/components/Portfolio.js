import React from 'react';
// import Assets from "./Assets"
// import Trading from "./Trading"
const totalValue = 5000; // dummy var; will be user's combined assets+cash later

const Portfolio = () => {
    return (
        <div className="Portfolio">
            <h2>Portfolio (${totalValue})</h2>
            <div className="Portfolio__inner">
                {/* <Assets />
                <Trading /> */}
            </div>
        </div>
    )
}

export default Portfolio;
