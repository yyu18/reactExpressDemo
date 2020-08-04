import React, {Component} from 'react';
import AddBtn from './addBtn.jpg';

export default class Section extends Component{
	state={
		contents:this.props.content
	}

	buttonClicked=()=>{
		var textarea = document.getElementById(this.props.secName);
		textarea.classList.toggle("hide");
	}
	postContent=()=>{
		var content = document.getElementById(this.props.secName).children[0];
		this.setState({
			contents:[...this.state.profile,content.value]
		});
	}
	delContent=(item)=>{
		var newContent = this.state.contents.filter((_item)=>{
			return _item!==item
		});
		this.setState({contents:newContent});
	}
	render(){
		return (
			<section>
				<div className="sectionTitle">
					<h1>{this.props.secName}</h1>
					<img src={AddBtn} className="addBtn" alt="btn" onClick={this.buttonClicked}/>
				</div>
				<div className="sectionContent">
					{
						this.state.contents.map((content,index)=>{
							return(
							<div key={index}>
								<p style={paragraph}>{content}</p>
								<i style={delbtn} className="fa fa-trash" onClick={this.delContent.bind(this,content)}></i>
							</div>
							)
						})
					}
					<div id={this.props.secName} className="textarea quickFade">
  						<textarea placeholder="Introduce Yourself"></textarea>
  					<input type="submit" className="submitBtn"value="Submit" onClick={this.postContent}/>
					</div>

				</div>
				<div className="clear"></div>
			</section>
			)
	}
}
const delbtn={
	float:"right",
	margin:"-7% 4% 0 0",
	cursor:"pointer"
}

const paragraph={
	boxSizing:"border-box",
	width:"90%"
}