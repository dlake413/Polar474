
var Input = React.createClass({
    render : function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
       <div className = "input">
         <h2 className = "inputtype">
            {this.props.inputtype}
         </h2>
         <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});



var InputBox = React.createClass({
     
   handlePersonSubmit: function(input) {
   },
   
   getInitialState: function() {
      return {data: [] };
   },

   componentDidMount: function() {
     // this.loadCommentsFromServer();
   },
   
   render: function() {
     return (
        <div className = "PersonBox">
         <h1>Insert person here</h1>
         <PersonForm onPersonSubmit = {this.handlePersonSubmit} /> 
        </div>
     );
   }
});

  var PersonForm = React.createClass({
      handleSubmit: function(e) {
        e.preventDefault();
        var name = React.findDOMNode(this.refs.name).value.trim();
        var id   = React.findDOMNode(this.refs.id).value.trim();
        if(!name || !id) {
           return;
        } 
        this.props.onPersonSubmit({name : name, id : id});
        React.findDOMNode(this.refs.name).value = '';
        React.findDOMNode(this.refs.id).value = '';
        },
   
        render: function() {
          return ( 
             <form className="personForm" onSubmit={this.handleSubmit}>
                 <input type = "text" placeholder="Enter your name here.." ref="name"/>
                 <input type = "text" placeholder="Enter a ID here..." ref="id"/>
                 <input type= "submit" value="Submit!"/>
             </form>
          );
        }
   });


   React.render(
   <InputBox />, 
   document.getElementById('content')
   );
