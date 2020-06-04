import React from 'react';
import Axios from 'axios';

class GifCard extends Component {

    render() {
        
        display = (
            <>
                <h1>{this.state.locationText}</h1>
                <ul>
                    <li>State: {this.state.zip.stateName}</li>
                    <li>Location: ({this.state.zip.latitude}, {this.state.zip.longitude})</li>
                    <li>Population (estimated): {this.state.zip.population}</li>
                    <li>Total Wages: {this.state.zip.wages}</li>
                </ul>
            </>
        );
    }
    
    return <div className="zip">{display}</div>;


    
}

export default GifCard