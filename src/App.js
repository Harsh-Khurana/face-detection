import React from 'react';
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';
import FaceReco from './components/faceReco/faceReco';
import SignIn from './components/signIn/signIn';
import Register from './components/register/register';

const particleOptions={
  particles:{
    number:{
      value:100,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}

// We have created this intial state to reassign state when a new user loggs in
// For more info check code review vid in production+deployment section
// (btw it's just a normal variable to store state that is accessed in many parts)
const initialState = {
  input:'',
  imageUrl:'',
  box:{},
  route:'signIn',
  isSignedIn:false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:''
  }
}

class App extends React.Component{
  constructor(){
    super();
    this.state=initialState;
  }

  loadUser = (data) =>{
    this.setState({
      user:{
        id:data._id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
      }
    })
  }

  onInputChange=(event)=>{
    this.setState({ input:event.target.value })
  }

  calculateFaceLocation = (data)=>{
    const clarifaiFace= data.rawData.outputs[0].data.regions[0].region_info.bounding_box;
    const image= document.getElementById('image');
    const width=Number(image.width);
    const height=Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box)=>{
    this.setState({ box:box });
  }

  onButtonSubmit=()=>{
    this.setState({ imageUrl:this.state.input });
    fetch('https://whispering-brook-17018.herokuapp.com/imageurl',{
      method:'post',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({
        input:this.state.input
      })
    })
    .then(response=>response.json())
    .then( response =>{
      if(response){
        fetch('https://whispering-brook-17018.herokuapp.com/image',{
          method:'put',
          headers:{ 'Content-Type':'application/json' },
          body: JSON.stringify({
            id:this.state.user.id,
            entries:this.state.user.entries
          })
        })
          .then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user,{ entries:count }))
          })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange=(route)=>{
    if(route==='signOut'){
      this.setState(initialState)
    }else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({ route:route });
  }

  render(){
    return (
      <div className="App">
        <Particles className="particles"
          params={ particleOptions } />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { 
          this.state.route==='home'
            ?<div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceReco imageUrl={this.state.imageUrl} box={this.state.box}/> 
            </div>:(
                this.state.route==='signIn'?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }    
      </div>
    );
  }
}

export default App;
