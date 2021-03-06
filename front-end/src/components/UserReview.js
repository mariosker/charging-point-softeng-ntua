import 'bootstrap/dist/css/bootstrap.css';
import './UserReview.css';
import NavBar2 from '../components/NavBar2';
import UserLinks from './UserLinks';
import { Component } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

class UserReview extends Component {
    constructor() {
        super();

        this.state={
            station: null,
            length: null,
            render: null,
            rating: ['0', '0', '0', '0', '0'],
            comment: ['', '', '', '', '']
        }

        this.clickHandler = this.clickHandler.bind(this)
    }

    componentDidMount() {
        this.ReviewStation();
    }

    async clickHandler(i) {
        // let userID = jwt.decode(JSON.parse(localStorage.getItem('login')).token)._id;
        let rating = this.state.rating[i];
        let comment = this.state.comment[i];
        console.log(rating, comment);
    }

    async ReviewStation() {
        let userID = jwt.decode(JSON.parse(localStorage.getItem('login')).token)._id;

        try {
            let res = await axios.get('http://localhost:8765/evcharge/api/queries/stationsVisited/' + userID);
            this.setState({
                station: res.data,
                length: res.data.length
            });

            var rows = [];
            for (let i = 0; i < this.state.length; i++) {
                rows.push(
                    <div className="row justify-content-around align-items-center" key={i}>
                        <div className="reviewstation">
                            <h3>{this.state.station[i].name}</h3>
                            <span>Address: {this.state.station[i].address}</span>
                            <div className="container-fluid">
                                <div className="row justify-content-around align-items-center">
                                    <fieldset>
                                        <span>1- </span>
                                        <input type="radio" id="1" name={i} value="1" onChange={() => {
                                            let temp = this.state.rating;
                                            temp[i] = '1';
                                            this.setState({rating: temp});
                                            }}/>
                                        <small> </small>
                                        <input type="radio" id="2" name={i} value="2" onChange={() => {
                                            let temp = this.state.rating;
                                            temp[i] = '2';
                                            this.setState({rating: temp});
                                            }}/>
                                        <small> </small>
                                        <input type="radio" id="3" name={i} value="3" onChange={() => {
                                            let temp = this.state.rating;
                                            temp[i] = '3';
                                            this.setState({rating: temp});
                                            }}/>
                                        <small> </small>
                                        <input type="radio" id="4" name={i} value="4" onChange={() => {
                                            let temp = this.state.rating;
                                            temp[i] = '4';
                                            this.setState({rating: temp});
                                            }}/>
                                        <small> </small>
                                        <input type="radio" id="5" name={i} value="5" onChange={() => {
                                            let temp = this.state.rating;
                                            temp[i] = '5';
                                            this.setState({rating: temp});
                                            }}/>
                                        <small> </small>
                                        <input type="radio" id="6" name={i} value="6" onChange={() => {
                                            let temp = this.state.rating;
                                            temp[i] = '6';
                                            this.setState({rating: temp});
                                            }}/>
                                        <small> </small>
                                        <input type="radio" id="7" name={i} value="7" onChange={() => {
                                            let temp = this.state.rating;
                                            temp[i] = '7';
                                            this.setState({rating: temp});
                                            }}/>
                                        <small> </small>
                                        <input type="radio" id="8" name={i} value="8" onChange={() => {
                                            let temp = this.state.rating;
                                            temp[i] = '8';
                                            this.setState({rating: temp});
                                            }}/>
                                        <small> </small>
                                        <input type="radio" id="9" name={i} value="9" onChange={() => {
                                            let temp = this.state.rating;
                                            temp[i] = '9';
                                            this.setState({rating: temp});
                                            }}/>
                                        <small> </small>
                                        <input type="radio" id="10" name={i} value="10" onChange={() => {
                                            let temp = this.state.rating;
                                            temp[i] = '10';
                                            this.setState({rating: temp});
                                            }}/>
                                        <span> -10</span>
                                    </fieldset>
                                </div>
                            </div>
                            <p>Comments (optional):</p>
                            <div className="input-group">
                                <textarea className="form-control" name={i} onChange={(e) => {
                                    let temp = this.state.comment;
                                    temp[i] = e.target.value;
                                    this.setState({comment: temp});
                                    }}></textarea>
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-primary btn-block" onClick={() => {this.clickHandler(i)}}>Submit</button>
                        </div>
                    </div>
                );
            }
            this.setState({
                render: rows
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <NavBar2/>

                <UserLinks/>

                <div className="container-fluid">
                    <div className="row justify-content-around align-items-center">
                        <h4>Last 5 stations you visited</h4>
                    </div>

                    {this.state.render}
                </div>
            </div>
        );
    }
}

export default UserReview;
