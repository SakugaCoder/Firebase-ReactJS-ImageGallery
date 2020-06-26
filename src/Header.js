import React from 'react';

export class Header extends React.Component{

	constructor(props){
		super(props);
		this.state = {image_kind : 'robotics',image_url : ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(obj){
		console.log("Object name: "+obj.target.name+" Object value: "+obj.target.value+" typeof: "+typeof(obj.target.value));
		if(obj.target.name == 'image_url'){
			console.log("url");
			this.setState({image_url:obj.target.value});
		} 
		else{
			console.log("kind");
			this.setState({image_kind:obj.target.value});
		}
	}

	handleSubmit(e){
		e.preventDefault();
		console.log("Image kind: "+this.state.image_kind+"\nImage url: "+this.state.image_url);
		this.props.onClick(this.state.image_kind,this.state.image_url);
	}
	render(){
		return (
	    <header>
	      <form action="#" method="post" className='insertForm' onSubmit={this.handleSubmit}>
	      	<h2>Add new image</h2>
	      	<select name="image_kind" id="image_kind"  value={this.state.image_kind} onChange={this.handleChange}>
	      		<option value="robotics">Robotics</option>
	      		<option value="tool">Tool</option>
	      		<option value="japan">Japan</option>
	      	</select>
	        <input type="text" name="image_url" id="image_url" placeholder="New URL" required value={this.state.image_url} onChange={this.handleChange} />
	        <input type="submit" value="Save" />
	      </form>
	    </header> 
		);
	}
}