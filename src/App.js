import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerName:null,
      playerStats: {}
    }
  }

handleSubmit = (e) => {
  e.preventDefault();
  this.getPlayerID()
  console.log(this.state.playerName)
}

handleChange = (event) => {
  const replace = event.target.value.split(" ").join("_");
  if(replace.length > 0){
    this.setState({playerName: replace})
  } else {
    alert("Please type players name!")
  }
}

handleSubmitPlay2 = (e) => {
  e.preventDefault();
  this.getPlayerID()
  console.log(this.state.playerName)
}

handleChangePlay2 = (event) => {
  const replace = event.target.value.split(" ").join("_");
  if(replace.length > 0){
    this.setState({playerName: replace})
  } else {
    alert("Please type players name!")
  }
}

  getPlayerID = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
    .then(async res => {
      //console.log(res.data.data)
      if(res.data.data[0] === undefined) {
        alert("This Players is either injured or hasn't played yet!")
      } else if(res.data.data.length > 1 ) {
        alert("Please specify the name more and check spelling!")
      } else {
        await this.getPlayerStats(res.data.data[0].id)
      }
    }).catch(err =>{
      console.log(err)
    })
  }

  getPlayerStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?&player_ids[]=${playerId}`)
    .then(async res => {
      console.log(res.data.data)
      this.setState({playerStats: res.data.data[0]})
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount(){
    this.getPlayerID()
    this.getPlayerStats()
  }

  

  render() {
  return (
    <div className="App">
      <div className='heading'>
        <h1>Welcome</h1>
        <h3>Here You Can Compare Your Favorite NBA Players Stats!</h3>
        <p>Lets Get Started, Type A Players Name Into The Search Bar To Check Thier Season Averages Out!</p>
      </div>
      <div className='playersContainer'>
        <div className='player1'>
          <form onSubmit={this.handleSubmit}>
            <label className='label'>
              Name
              <input className='input'
                type="text"
                value = {this.state.value}
                onChange = {this.handleChange}
                placeholder = "Enter Player's Name"
              />
            </label>
            <input className='submit' type="submit" value="Submit"/>
          </form>
          Games Team has Played: {this.state.playerStats["games_played"]}
        <h2>Seaon Averages!</h2><br/>
          <ul className='playerOneStats'>
            <li>Points Per Game: {this.state.playerStats["pts"]}</li>
            <li>Assist Per Game: {this.state.playerStats["ast"]}</li>
            <li>Turnovers Per Game: {this.state.playerStats["turnover"]}</li>
            <li>Steals Per Game: {this.state.playerStats["stl"]}</li>
            <li>Blocks Per Game: {this.state.playerStats["blk"]}</li>
            <li>Rebounds Per Game: {this.state.playerStats["reb"]}</li>
            <li>Defensive Rebounds Per Game: {this.state.playerStats["dreb"]}</li>
            <li>Offensive Rebounds Per Game: {this.state.playerStats["oreb"]}</li>
            <li>Personal Fouls Per Game: {this.state.playerStats["pf"]}</li>
          </ul>
        <h2>
          Shooting Numbers On The Year
        </h2>
          <ul className='playerOneShootingStats'>
            <li>Field Goals Made: {this.state.playerStats["fgm"]}</li>    
            <li>Field Goals Attempted: {this.state.playerStats["fga"]}</li>     
            <li>3-Point Field Goals Made: {this.state.playerStats["fg3m"]}</li>
            <li>3-Point Field Goals Attempted: {this.state.playerStats["fg3a"]}</li>
            <li>Free Throws Made: {this.state.playerStats["ftm"]}</li>
            <li>Free Throws Attempted: {this.state.playerStats["fta"]}</li>
          </ul>
        </div>      
      </div>
    </div>
  );
}
}


export default App;
