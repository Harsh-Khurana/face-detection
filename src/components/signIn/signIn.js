import React from 'react';

// Since the below is not using form to send info that's why we are using fetch to send data and for that 
// we are saving that data in state and for that we have to convert this into a smart component

class SignIn extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			signInEmail:'',
			signInPassword:''
		}
	}

	// For storing the value of email from the form which is later used for submitting to server
	onEmailChange = (event) =>{
		this.setState({ signInEmail:event.target.value 	});
	};

	// For storing the value of password from the form which is later used for submitting to server
	onPasswordChange = (event) =>{
		this.setState({ signInPassword:event.target.value });
	};

	// Here we send in data and also calling in routeChange to shift to another screen(App Page)
	onSubmitSignIn = () =>{
		fetch('https://whispering-brook-17018.herokuapp.com/signin',{
			method:'post',
			headers:{ 'Content-Type':'application/json' },
			body:JSON.stringify({
				// Since we have to send data as json that's why before sending it we have converted
				// the state object in json format using stringify
				email:this.state.signInEmail,
				password:this.state.signInPassword
			})
		}).then(response => response.json())
	      .then(user => {
	        if(user._id){
	          this.props.loadUser(user);
	          this.props.onRouteChange('home');
	        }
	      })
	}

	render(){
		const {onRouteChange} = this.props;
		return(
		<article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center'>
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
			      </div>
			    </fieldset>
			    <div className="">
			      <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick={ ()=>{onRouteChange('register')}} className="f6 link dim black db pointer">Register</p>
			    </div>
			  </div>
			</main>
		</article>
		);
	}
}

export default SignIn;