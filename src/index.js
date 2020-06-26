import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import { Header } from './Header.js';
import { Gallery } from './Gallery.js';

import './index.css';

import * as serviceWorker from './serviceWorker';


const firebaseConfig = {
	//Add your firebase config
};

firebase.initializeApp(firebaseConfig);


class Index extends React.Component{

	constructor(props){
		super(props);
		this.updateData = this.updateData.bind(this);
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.state = { galleryContent: null, last_gallery:'japan',actual_gallery:'japan'};
	}

	componentDidMount(){
		
		const dbRef = firebase.database().ref('/'+this.state.actual_gallery+'_images');
		console.log("Printint data");
		dbRef.on("value",(snapshot) => {
			console.log(snapshot.val());
			var gc = [];
			var imgs_object = snapshot.val();
			for(var key in imgs_object){
					gc.push(<div className='cardContainer'><div className='card'><img src={imgs_object[key]['img_url']} /></div></div>);
					this.updateData(gc);
			}
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
		});
		
	}

	componentDidUpdate(){
		console.log("Componente ha sido actualizado");
		if( !(this.state.last_gallery == this.state.actual_gallery)){
			console.log("Nueva seleccion");
			this.setState({last_gallery :this.state.actual_gallery});
			const dbRef = firebase.database().ref('/'+this.state.actual_gallery+'_images');
			console.log("Printint data");
			dbRef.on("value",(snapshot) => {
				console.log(snapshot.val());
				var gc = [];
				var imgs_object = snapshot.val();
				for(var key in imgs_object){
					gc.push(<div className='cardContainer'><div className='card' style={{backgroundImage: "url("+imgs_object[key]['img_url']+")"}} onCLick={this.handleImageClick}></div></div>);
					this.updateData(gc);
				}
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		}
	}

	updateData(gc){
		this.setState({galleryContent: gc});
	}

	sendNewData(image_kind,image_url){
		console.log("sending new data");
		console.log("kind "+image_kind+"\nurl:"+image_url);
		const dt = String(Date.now());
		const dbRef = firebase.database().ref('/'+image_kind+"_images");
		dbRef.push({ img_url:image_url,timestamp:Date.now()}, (error) => {if(error){console.log("Error");}else{console.log("Success")}});
	}

	handleOptionChange(obj){
		console.log(obj.target.value);
		this.setState({actual_gallery:obj.target.value});
	}


	render(){
		var imgs_object = null;
		//const dbRef = firebase.database().ref('/tool_images');
		return (
			<React.Fragment>
			<Header onClick={this.sendNewData} />
			<Gallery galleryContent={this.state.galleryContent} onChange={this.handleOptionChange}/>
			</React.Fragment>
		);
	}
}
ReactDOM.render(<Index/>, document.getElementById('container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();