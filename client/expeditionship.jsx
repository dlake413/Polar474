var InputBox = React.createClass({

 

   handleExpeditionshipSubmit: function(input) {
   },

   getInitialState: function() {
      return {data: [] };
   },

   componentDidMount: function() {
     // this.loadCommentsFromServer();
   },

   render: function() {
     return (
        
        <div className = "ExpeditionshipBox">
         <h1> Insert Expeditionship</h1>
         <ExpeditionshipForm onExpeditionshipForm = {this.handleExpeditionshipSubmit} />
        </div>
     );
   }
});


   var ExpeditionshipForm = React.createClass({
      handleSubmit: function(e) {
        e.preventDefault();
        var sid        = React.findDOMNode(this.refs.sid).value.trim();
        var eid        = React.findDOMNode(this.refs.eid).value.trim();

        if(!sid || !eid) {
           return;
        }
        this.props.onExpeditionSubmit({sid : sid, eid : eid});
        React.findDOMNode(this.refs.sid).value = '';
        React.findDOMNode(this.refs.id).value = '';
        },

        render: function() {
          return (
             <form className="personForm" onSubmit={this.handleSubmit}>
                 <input type = "text" placeholder="Enter your Ship ID here.." ref="sid"/>
                 <input type = "text" placeholder="Enter a ID here..." ref="id"/>
                 <input type= "submit" value="Submit!"/>
             </form>
          );
        }
   });


   React.render(
   <InputBox />,
   document.getElementById('expeditionship')
   );
       
