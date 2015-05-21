var crews;

$(document).ready(function(){
    $('.tab_button').click(function(){
	$('.tab_form').each(function(){
	    $(this).removeClass('active_tab');
	});
	var id = $(this).prop('id').split('_')[1];
	$('#tabcontent_'+id).addClass('active_tab');
    })

    var lop = {};
    var lol = {};
    var los = {};
    var loe = {};

    var width = $('#data').width();
    var height = $('#data').height();
    var color = d3.scale.category20();
    var force = d3.layout.force()
	.charge(-120)
	.linkDistance(30)
	.size([width, height]);

    var svg = d3.select('#data')
	    .call(d3.behavior.zoom().on("zoom", redraw)).append('g');    

    function redraw() {
	svg.attr("transform",
		 "translate(" + d3.event.translate + ")"
		 + " scale(" + d3.event.scale + ")");
    }

    $('#personSubmit').click(function(){
	var fd = {};
	$('form[name=personForm]').find('input').each(function(){
	    if($(this).prop('name').length){
		fd[$(this).prop('name')] = $(this).val();
	    }
	});
	$.ajax({
	    url:'/data/new_person',
	    data:fd,
	    type:'post',
	    success:function(res){
		alert('Insert ID: ' + res.id);
		
	    }
	});
    });
    $('#locSubmit').click(function(){
	var fd = {};
	$('form[name=locationForm]').find('input').each(function(){
	    if($(this).prop('name').length){
		fd[$(this).prop('name')] = $(this).val();
	    }
	});
	$.ajax({
	    url:'/data/new_loc',
	    data:fd,
	    type:'post',
	    success:function(res){
		alert('Insert ID: ' + res.id);		
	    }
	});
    });

    $('#shipSubmit').click(function(){
	var fd = {};
	$('form[name=shipForm]').find('input').each(function(){
	    if($(this).prop('name').length){
		fd[$(this).prop('name')] = $(this).val();
	    }
	});
	$.ajax({
	    url:'/data/new_ship',
	    data:fd,
	    type:'post',
	    success:function(res){
		alert('Insert ID: ' + res.id);
		
	    }
	});
    });

    $('#setExpd').click(function(){
	var fd = {};
	$.ajax({
	    url:'/data/set_expd',
	    type:'post',
	    data: $('form[name=expeditionForm]').serialize(),
	    success:function(res){
		console.log(res);
	    }
	});
    });
    d3.json("data.json", function(error, graph) {
	var edges = [];
	var died = [];
	var nodesId = [];
	graph.nodes.forEach(function(e){
	    if(e.type != null){
		if(e.type == 'crew'){
		    lop[e.id] = e;
		} else if (e.type == 'ship') {
		    los[e.id] = e;
		} else if (e.type == 'loc'){
		    lol[e.id] = e;
		}
		else if (e.type == 'exp'){
		    loe[e.id] = e;
		}
	    }
	    nodesId.push(e.label);
	});
	graph.links.forEach(function(e){
	    var sourceNode = graph.nodes.filter(function(n){ return n.id === e.source;})[0],
	    targetNode = graph.nodes.filter(function(n){return n.id === e.target;})[0];
	    edges.push({source: sourceNode, target: targetNode, diedonexpedition: e.diedonexpedition, label: e.label});
	});
	console.log(lop);
	force
	    .nodes(graph.nodes)
	    .links(edges)
	    .start()
	var link = svg.selectAll(".link")
            .data(edges)
	    .enter()
            .append("g")
            .attr("class", "link")
            .append("line")
            .attr("class", "link-line")
            .style("stroke-width", function (d) {
		return 1;
            })
            .style("stroke", function(d) {if (d.diedonexpedition == "Y"){
                return "red";}
					  else return "blue";});
	var node = svg.selectAll(".node")
	    .data(graph.nodes)
	    .enter().append("circle")
	    .attr("class", "node")
	    .attr("r", function(d){
		return 30 * d.eigenvectorcentrality
	    })
	    .style("fill", function(d){
		if(d.type == null){
		    return "purple";
		}
		else {
		    if(d.type == 'crew'){
			return "purple";
		    }else if(d.type =='ship'){
			return 'brown';
		    } else if (d.type =='loc'){
			return 'green'
		    } else {
			return 'blue';
		    }

		}
	    });
	function searchData(searchTerm) {
	    var searchRegEx;
	    searchRegEx = new RegExp(searchTerm.toLowerCase(),"g");
	    node.each(function(e){
		var element;
		var match;
		element = d3.select(this);
		match = e.label.toLowerCase().search(searchRegEx);
		if(searchTerm.toLowerCase() === e.label.toLowerCase()){
		    // trying to center highlighted node, however the transition is very clunky
		    // svg.attr("transform", "translate(" + e.x + "," + e.y + ")");
		    link.style('stroke', function(d){
			if(e.id === d.source.id || e.id === d.target.id){
			    return "green";
			}
		    });
		}
	    });
	}

	$("#search").autocomplete({
	    source: nodesId,
	    messages: {
		noResults: '',
		results: function() {}
	    }
	});
	$("#search").keypress(function(e) {
	    var searchTerm;
	    if(e.which == 13){
		e.preventDefault();
		searchTerm = $(this).val();
		searchData(searchTerm);
	    }
	});
	$("#reset").click(function(event) {
	    link.style("stroke", function(d) {if (d.diedonexpedition == "Y"){
                return "red";}
					      else return "blue";});
	    $("#searchForm").trigger('reset');
	});
	node.append("title")
	    .text(function(d) { return d.label; });
	force.on("tick", function() {
	    link.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });
	    node.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });
	});
	for(i in los){
	    var ship = los[i];
	    $('#ship_select').append($('<option></option>').prop('value',i).text(ship.label));
	}

	for(i in lol){
	    var loc = lol[i];
	    $('#loc_select').append($('<option></option>').prop('value',i).text(loc.label));
	}

	for(i in lop){
	    var pep = lop[i];
	    $('#peeps').append($('<option></option>').prop('value',i).text(pep.label));
	}

	$('#addc').click(function(){
	    var clist = $('#crew_list');
	    var cid = parseInt($('#nump').val()) + 1;
	    var peeps = $('#peeps').clone();
	    clist.append($('<p></p>').text('Crew ' + cid + ' ').append(peeps.prop('name','crew[]').css('display','inline-block')));
	    $('#nump').val(cid);
	});
    });
})
