import React,{useRef, useState} from 'react';
function App() {
  const usernameRef = useRef(null);
  const inputRef = useRef(null);
  function clickHandler() {
    usernameRef.current.changeValue(inputRef.current.value);
  }

  const links = ["https://goo.gl/kjzfbE", "https://goo.gl/d2JncW"];
  return (
      //<ImageGallery links={ links } ></ImageGallery>
      //<GroceryApp products={[{ name: "Oranges", votes: 0 },{ name: "Bananas", votes: 0 }]}></GroceryApp>
      //<Message />

      //change username useRef
      <div>
        <button onClick={clickHandler}>Change Username</button>
        <input ref = {inputRef}type="text" />
        <Username ref = {usernameRef} />
    </div>
      );
}
class Username extends React.Component {
    state = { value: "" };
  
    changeValue(value) {
      this.setState({ value });
    }
  
    render() {
      const { value } = this.state;
      return <h1>{value}</h1>;
    }
  }
const LinkItem = (props)=>{
    return  ( 
    <div class="image">
        <img src={props.link} />
        <button class="remove" ref = {props.ref}onClick={props.click.bind(this,props.link)} >X</button>
    </div>)
}

  class ImageGallery extends React.Component {
    constructor(props){
        super(props);
        this.state={
            links:this.props.links
        }
    }
    handleClick=(e,link)=>{
        console.log(this.state.links);
        this.setState({links:[...this.state.links.filter(item=>item!=link)]});
    }
    render() {
        const {links} = this.props;

        return (
            this.state.links.map((item, index) => 
                    <LinkItem link={item} click = {this.handleClick.bind(this,item)}/>  )
          );


    }
  }
  const Product = props => {

    const plus = () => {
      props.onVote(props.item.name,'plus')
      // Call props.onVote to increase the vote count for this product
    };
    const minus = () => {
      props.onVote(props.item.name,'minus')
      // Call props.onVote to decrease the vote count for this product
    };
    
    return (
      <li>
        <span>{props.item.name}</span> - <span>votes: {props.item.votes}</span>
        <button onClick={plus}>+</button>{" "}
        <button onClick={minus}>-</button>
      </li>
    );
  };
  
  const GroceryApp = (props) => {
    const [state,setState] = useState({products:props.products});
    const onVote = (dir, index) => {
      // Update the products array accordingly ...

     props.products.map((item)=>{
        if(item.name==dir){
          if(index=='plus'){
            item.votes=item.votes+1;
          } else {
            item.votes-=1;
          }
        }  
    })
    console.log(props.products)
    setState({
      products:props.products
    });
      };

    return (
      <ul>
        {   
            state.products.map((item,index)=><Product onVote = {onVote} item={item} key={index}/>)
}
      </ul>
    );
  }

  const Message=()=>{
    const [state,setState] = useState({
      clicked:false
    })

    const handleClick=()=>{
      setState({
        clicked:!state.clicked
      })
    }
    return (<React.Fragment>
      <a href="#"onClick={handleClick}>Want to buy a new car?</a>
      {
        state.clicked==true&&
        <p>Call +11 22 33 44 now!</p>
      }
  
    </React.Fragment>);
  }

export default App;