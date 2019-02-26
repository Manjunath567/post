import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            age: '',
            address: '',
            mail:'',
            loading:false,
            message:'',
            isError:''
        };
        this.change = (e, param) => {
            switch (param) {
                case 'username':
                    this.setState({ username: e.target.value });
                    break;
                case 'age':
                    this.setState({ age: e.target.value });
                    break;
                case 'address':
                    this.setState({ address: e.target.value });
                    break;
                case 'mail':
                    this.setState({ mail: e.target.value });
                    break;
                    default:
                    break;
            }
        };
        this.submit = (e) => {
          e.preventDefault();
            alert("hi");
            const username = this.state.username;
            const age = this.state.age;
            const address = this.state.address;
            const mail = this.state.mail;

            if (!username){
                this.setState({isError:'Please enter Username '});
            }
            else if (!age){
                this.setState({isError:'Please enter age'});
            }
            else if (!address){
                this.setState({isError:'Please enter address'});
            }
            else if (!mail){
                this.setState({isError:'Please enter Username mail'});
            }
            else if (typeof Storage !== 'undefined') {

              this.setState({
                loading:true
              })

              const data = {
                username,
                age,
                address,
                mail
              }
              axios.post('/t/huv2r-1551185796/post',data)
                .then(response => {
                  this.setState({
                    loading:false,
                    message:response.data
                  })
                })
                .catch(error =>{
                  console.log(error);
                  this.setState({
                    loading:false
                  })
                })
      }

        };
        this.onEnterPress = (e) => {
            if (e.which === 13){
               this.submit();

            }
        };
    }
    loadshow(){
      if(this.state.loading){
        return <p> Loading ...</p>
      } else {
        return <p> {this.state.message} </p>
      }

    }
    render() {
        return (

            <main className="login">

            { console.log(this.props) }
                <h2 className="login_header">Login</h2>
                <input
                    className="login-input"
                    placeholder="Username"
                    type="text"
                    autoFocus
                    value={this.state.username}
                    onChange={(e) => this.change(e, 'username')}
                    onKeyPress={this.onEnterPress}
                />
                <input
                    className="login-input"
                    placeholder="age"
                    type="text"
                    value={this.state.age}
                    onChange={(e) => this.change(e, 'age')}
                    onKeyPress={this.onEnterPress}
                />
                <input
                    className="login-input"
                    placeholder="address"
                    type="text"
                    value={this.state.address}
                    onChange={(e) => this.change(e, 'address')}
                    onKeyPress={this.onEnterPress}
                />
                <input
                    className="login-input"
                    placeholder="mail"
                    type="text"
                    value={this.state.mail}
                    onChange={(e) => this.change(e, 'mail')}
                    onKeyPress={this.onEnterPress}
                />
                <div className="login_error">{ this.state.isError }</div>
                <button className="login_btn" type="button" onClick={(e) => this.submit(e)}>Login</button>
                  <div>{this.loadshow()}</div>
                </main>

        );
    }
}



export default App;
