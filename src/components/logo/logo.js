import React from 'react';
import Tilt from 'react-tilt';
import brain from './brainAndrie.png';
import './logo.css';

const Logo=()=>{
	return(
		<div className="ma4 mt0">
			<Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 120, width: 120 }} >
				<div className="Tilt-inner pa3">
					<img style={{	paddingTop:'13px'	}} src={brain} alt='logo'/>
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;