import React from 'react'

export default class Teams extends React.Component {
    state = {
        loading:true,
        teams: null
    }
  async  componentDidMount() {
        const url ="https://jsonplaceholder.typicode.com/users";
        const resp = await fetch(url);
        const data = await resp.json();
        this.setState({
            teams:data,
            loading: false
        });
    }
    render() {
        return (
        <div>
            <div className="col-lg-12 col-md-12  teams">
                    <h1>Meet the Team</h1>
                    {this.state.loading ? 
                    <div>loading...</div>: <div>
                            <ul className="teamsList">
                                {this.state.teams.map((teams) => (
                                    <li className="teamsIteams">{teams.name}</li>
                                ))}
                            </ul>
                        </div>}
                </div>
        </div>
        )
    }
    
}
