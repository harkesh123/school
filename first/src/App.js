import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state={
      list: []
    }
  }
  
   componentDidMount() {
    this.listfetch();
  }

   componentDidUpdate(){
    this.listfetch();
   }
  

onName=(event)=>{
  this.setState({Name:event.target.value})
}

onAdd=()=>{
  fetch("http://localhost:3005/",{
   method: "post",
   headers: {"Content-type":"application/json"},
   body:JSON.stringify({
   name:this.state.Name
   })
 })
  .then(res=>{return res.text()})
  .then(data=>{console.log(data)});
  this.listfetch();
  this.setState({Name:""})
}
   
onName1=(event)=>{
  this.setState({Search:event.target.value})
}

onSearch=()=>{
  fetch("http://localhost:3005/",{
   method: "put",
   headers: {"Content-type":"application/json"},
   body:JSON.stringify({
   name:this.state.Search
   })
 })
  .then(res=>{return res.text()})
  .then(data=>{this.setState({results:data})});
  this.listfetch();
  this.setState({Search:""})

}

async listfetch(){
  const response = await fetch('http://localhost:3005');
    const json = await response.json();
    this.setState({list:json})
}

  
  render() {
    return (
      <div>
        <div className="search">
        <input type="text"  placeholder="Name" onChange={this.onName1}  value={this.state.Search} />
        <a className="f6 link dim br2 ph4 pv1 mb1 dib white bg-red" onClick={this.onSearch} >Search</a>
        <a> {this.state.results} </a>
        </div>
        <div className="absolute pa5" >
        <div className="overflow-auto">
        <input type="text"  placeholder="Name" onChange={this.onName}  value={this.state.Name} />
        <a className="f6 link dim br2 ph4 pv1 mb1 dib white bg-red" onClick={this.onAdd} >Add</a>
        <table className="f6 w-100 mw7 center" cellSpacing="0">
        <thead>
        <tr className="stripe-dark ">
        <th className="fw6 tl ph5 bg-white">rolNumber</th>
        <th className="fw6 tl ph5 bg-white">name</th>
        </tr>
        </thead>
        <tbody className="lh-copy">
        {this.state.list.map((d,i)=> {return <tr className="stripe-dark" key={this.state.list.rolnumber} >
        <td className="ph5 pv2">{this.state.list[i].rolnumber}</td>
        <td className="ph5 pv2">{this.state.list[i].name}</td>
        </tr>
        })}
        </tbody>
        </table>
        
        </div>
        </div>
      </div>
    );
  }
}

export default App;
