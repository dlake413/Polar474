


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

 

   handleExpeditionSubmit: function(input) {
   },

   getInitialState: function() {
      return {data: [] };
   },

   componentDidMount: function() {
     // this.loadCommentsFromServer();
   },

   render: function() {
     return (
       
        <div className = "ExpeditionBox">
         <h1>Insert Expedition</h1>
         <ExpeditionForm onExpeditionForm = {this.handleExpeditionSubmit} />
        </div>
     );
   }
});


   var ExpeditionForm = React.createClass({
      handleSubmit: function(e) {
        e.preventDefault();
        var name        = React.findDOMNode(this.refs.name).value.trim();
        var id          = React.findDOMNode(this.refs.id).value.trim();
        var source      = React.findDOMNode(this.refs.source).value.trim();
        var destination = React.findDOMNode(this.refs.destination).value.trim();

        if(!name || !id || !source || !destination) {
           return;
        }
        this.props.onExpeditionSubmit({name : name, id : id, source : source, destination : destination});
        React.findDOMNode(this.refs.name).value = '';
        React.findDOMNode(this.refs.id).value = '';
        React.findDOMNode(this.refs.source).value = '';
        React.findDOMNode(this.refs.destination).value = '';
        },

        render: function() {
          return (
             <form className="personForm" onSubmit={this.handleSubmit}>
                 <input type = "text" placeholder="Enter your name here.." ref="name"/><br />
                 <input type = "text" placeholder="Enter a ID here..." ref="id"/><br />
                 <input type = "text" placeholder="Enter a Source here..." ref="source"/><br />
                 <input type = "text" placeholder="Enter a Destination here..." ref="destination"/><br />
                 <input type= "submit" value="Submit!"/>
             </form>
          );
        }
   });


   React.render(
   <InputBox />,
   document.getElementById('expedition')
   );
       
