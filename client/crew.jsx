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

 

   handleCrewSubmit: function(input) {
   },

   getInitialState: function() {
      return {data: [] };
   },

   componentDidMount: function() {
     // this.loadCommentsFromServer();
   },

   render: function() {
     return (
       
        <div className = "CrewBox">
         <h1>Insert Crew member</h1>
         <CrewForm onCrewForm = {this.handleCrewSubmit} />
        </div>
     );
   }
});


   var CrewForm = React.createClass({
      handleSubmit: function(e) {
        e.preventDefault();
        var cid       = React.findDOMNode(this.refs.cid).value.trim();
        var eid       = React.findDOMNode(this.refs.eid).value.trim();
        var rank      = React.findDOMNode(this.refs.rank).value.trim();
        var died      = React.findDOMNode(this.refs.died).value.trim();

        if(!cid || !eid || !rank || !died) {
           return;
        }
        this.props.onExpeditionSubmit({cid : cid, eid : eid, rank : ranks, died : died_on_expedition});
        React.findDOMNode(this.refs.cid).value = '';
        React.findDOMNode(this.refs.eid).value = '';
        React.findDOMNode(this.refs.rank).value = '';
        React.findDOMNode(this.refs.died).value = '';
        },

        render: function() {
          return (
             <form className="personForm" onSubmit={this.handleSubmit}>
                 <input type = "text" placeholder="Enter your EID here.." ref="eid"/>
                 <input type = "text" placeholder="Enter a CID here..." ref="cid"/>
                 <input type = "text" placeholder="Enter a Rank here..." ref="rank"/>
                 <input type = "text" placeholder="Yes or No if dead or not..." ref="died"/>
                 <input type= "submit" value="Submit!"/>
             </form>
          );
        }
   });


   React.render(
   <InputBox />,
   document.getElementById('crew')
   );
