import React, { Component } from 'react'
import axios from 'axios'
import './main.css'


class Form extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             city: '',
             final: [],
             weather : [],
             wind_speed :[],
             humidity : [],
             temp : [],
             flag:'false',
             status : 0

        }
    }

    

    handleCityChange = (event) => {
        this.setState({
            city: event.target.value ,
            status : 0
           
        })
        
    }
    
    handleSubmit = event =>{
        this.setState({
            final : this.state.city
        }, ()=> {console.log('Value', this.state)}) 
        event.preventDefault()

    
        axios.get('https://api.openweathermap.org/data/2.5/weather?q='+this.state.city+'&APPID=f59b0c8dc13aafdd81623ac8ebbb9244&units=metric')
        .then(response =>{
            console.log(response)
            this.setState({ 
                weather : response.data.weather[0].main,
                wind_speed : response.data.wind.speed,
                humidity : response.data.main.humidity,
                temp : response.data.main.temp,
                status : response.request.status
             }
             , ()=>{
                if(this.state.status===200)
                    {
                        document.getElementById("output").style.display="block";
                        document.getElementById('error').style.display="none";
                        //document.getElementById("input").style.display="none";
                    }
                else if(this.state.status!==200)
                    {
                        document.getElementById('error').style.display="block";
                        document.getElementById("output").style.display="none";
                    }
             }
             
             )
             
            console.log(this.state)
        })
        .catch(error =>{
            this.setState({
                flag : 'false'
            }
            , ()=>{
                if(this.state.status===200)
                    {
                        document.getElementById("output").style.display="block";
                        document.getElementById('error').style.display="none";
                        //document.getElementById("input").style.display="none";
                    }
                else if(this.state.status!==200)
                    {
                        document.getElementById('error').style.display="block";
                        document.getElementById("output").style.display="none";
                    }
             }
            )
            console.log(error)
        })
        
    }



    

    render() {
        
        return (
            <div className="container">
                <div className="box">
                <h1>Weather</h1>
            <form onSubmit={this.handleSubmit} id ="input">
                <div className="input">
                    <label>City</label>
                    <input type='text' value={this.state.city} onChange={this.handleCityChange}></input>
                </div>
                <br></br>
                <button type='submit' onClick={this.handleOutput}>Submit</button>
                 
            </form>
            <div id="output" style={{display : "none"}}>
                <br></br>
                Weather Condition : {this.state.weather}<br></br>
                Humidity : {this.state.humidity}<br></br>
                Wind Speed : {this.state.wind_speed} m/sec<br></br>
                Temperature : {this.state.temp} Celsius<br></br>
            </div>
            <br></br>
            <div id="error" style={{display : "none"}}>
                <p>Input Error</p>
            </div>
            </div>
        </div>
        )
    }
}

export default Form
