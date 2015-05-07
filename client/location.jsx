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
        <div className = "LocationBox">
         <h1>Insert Location</h1>
         <LocationForm onLocationSubmit = {this.handleLocationSubmit} /> 
        </div>
     );
   }
});

  var LocationForm = React.createClass({
      handleSubmit: function(e) {
        e.preventDefault();
        var name = React.findDOMNode(this.refs.name).value.trim();
        var id   = React.findDOMNode(this.refs.id).value.trim();
        if(!name || !id) {
           return;
        } 
        this.props.onLocationSubmit({name : name, id : id});
        React.findDOMNode(this.refs.name).value = '';
        React.findDOMNode(this.refs.id).value = '';
        },
   
        render: function() {
          return ( 
             <form className="personForm" onSubmit={this.handleSubmit}>
                 <input type = "text" placeholder="Enter location name here.." ref="name"/>
                 <input type = "text" placeholder="Enter a location id here..." ref="id"/>
                 <input type= "submit" value="Submit!"/>
             </form>
          );
        }
   });


   React.render(
   <InputBox />, 
   document.getElementById('location')
   );
