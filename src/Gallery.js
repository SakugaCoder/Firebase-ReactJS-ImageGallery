import React from 'react';

export class Gallery extends React.Component{
	render(){
		return (
		<div className='gallery'>
			<div className='controls'>
			<h2>Topic</h2>
				<select onChange={this.props.onChange}>
					<option value="japan" defaultValue>Japan</option>
					<option value="tool">Tool</option>
					<option value="robotics">Robotics</option>
				</select>
			</div>
			<div className='galleryContent'>
				{this.props.galleryContent}
			</div>
		</div>
		);
	}
}