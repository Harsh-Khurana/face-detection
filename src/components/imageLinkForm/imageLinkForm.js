import React from 'react';
import './imageLinkForm.css';

const ImageLinkForm=({	onInputChange,onButtonSubmit })=>{
	return(
		<div>
			<p className='f3'>This magic brain will detect faces in your pics</p>
				<div className="form pa4 br3 shadow-5 center">
					<input className="w-80 f4 pa2" type="text" placeholder="URL" onChange={onInputChange}/>
					<button style={{ width:'100px'}}className="grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
				</div>
		</div>
	); 
}

export default ImageLinkForm;