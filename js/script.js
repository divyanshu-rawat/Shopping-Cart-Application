

$( document ).ready(function() {
    

	var query_url = "http://hackerearth.0x10.info/api/fashion?type=json&query=list_products";

	$.ajax({
					    url: query_url,
					    dataType: 'json',
					    success:function(obj)
					   	 {
						   	 // console.log(JSON.stringify(obj["products"],null,4));

						   	  var obj=obj['products'];
						   	  var new_obj=[];
						   	  // var tags_obj = {};
						   	  var count = 0;
						   	  var product_count = obj.length;


							  $(".product_count").append('<span style = "color:white;" > Product Count: '+ product_count +'</span>');

								for(i=0 ;i < obj.length; i++)
								{

									  var tags_1 = obj[i]["name"].split(" ");
								   	  var len = tags_1.length;
								   	  var tags_2 = tags_1[len - 1];


									new_obj.push({

										"name":obj[i]["name"],
										"price":obj[i]["price"],
										"tags":tags_2,
										"quantity":obj[i]["quantity"],
										"category":obj[i]['category'],
										"rating":obj[i]["rating"],
										"color":obj[i]["color"],
										"description":obj[i]["description"],
										"image":obj[i]["image"],
										"color":obj[i]["color"],
									})

								}

								append_data(new_obj);
								
								// console.log(JSON.stringify(new_obj,null,4));

									$("#sort_rating").click(function()
				     		      	{
				     		      		sort_rating(new_obj);
				     		      	})
				     		      	$("#sort_price").click(function()
				     		      	{
				     		      		sort_price(new_obj);
				     		      	})



				     		      	$("#search_btn").on("click", function(){
									   	search_by_tags(new_obj);
									});

									$("#search_btn_2").on("click", function(){
										var range_1 = $("#range_1").val();
										var range_2 = $("#range_2").val();
									   	price_range(new_obj,range_1,range_2);
									});

									slider_get_set(new_obj);


									

								
					     },
				              error: function (error) {
				                  console.log(error);
				              }
		 		});






    function append_data(obj)
    {

    	$("#panel-container").empty();

		for(var i=0;i<obj.length;i++)
	 		{

	 			$("#panel-container").
	 			append('<div class="row row-content col-lg-5" style = " margin-top:15px;" id = "row_content">' + 

				         '<div class="col-xs-12 col-sm-9 col-sm-push-3" style="margin-top:4%;">' +
				            
				            '<div>'+  obj[i]['name']  + '<span class = "pull-right color_sh"  style = "background:'+ obj[i]["color"] +'"> </span>' + ' </div>'+
				            '<div>Quantity : ' + obj[i]['quantity'] + '</div>'+

				            '<div style = "">  ' + '<i class="fa fa-usd" aria-hidden="true"></i> ' +'<span>' +'<i class="fa fa-inr" aria-hidden="true"></i>' + obj[i]['price'] + '</span>' +

				            	  '<span style ="margin-left:10%;"> |     '+ obj[i]['rating'] +' </span>'+'<span  class="stars">'+obj[i]['rating']+'</span>' + 


				            '</div>' +

				            '<div>'+ '<i class="fa fa-tags" aria-hidden="true"></i> '+ '<span>' + obj[i]['tags'] + '</span>' +'</div>'+
				            '<div>' + '<p>'+ obj[i]['description']+'</p>' +'</div>'+
				         '</div>'+

				         '<div class="col-xs-12 col-sm-3 col-sm-pull-9" style = "padding: 2px;margin-top: 15px;">'+
				            '<div class="media">'+
				                    '<div class="media-left media-middle">'+
				                        '<a href="#">'+
				                        '<img class="media-object img-thumbnail" src="'+ obj[i]["image"] +'" >'+
				                        '</a>' +
				                    '</div>'+
				                    '<div class="media-body">'+

				                       
				                    '</div>'+
				            '</div>' +
				         '</div>' +
				      '</div>');


	 		}

	 		// setTimeout(function(){  }, 200);
	 		get_stars();
    } 


function get_stars() {

    return $(".stars").each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        val = Math.round(val * 2) / 2;

        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html(span);
    });
}

function sort_rating(local_data)
	{
		// $("#panel-container").empty();

		var byrating = local_data.slice(0);
		 byrating.sort(function(a,b) {
		    return a.rating - b.rating;
		});

		 append_data(byrating);

		 console.log($("#amount").val());

	}




function sort_price(data)
	{
		// $("#panel-container").empty();

		var byprice = data.slice(0);
		 byprice.sort(function(a,b) {
		    return a.price - b.price;
		});
		 append_data(byprice);

		


	}

   function search_by_tags(obj)
	{
	 	var value = $("#search_bar").val();
	 	var count = 0;
	 	var store = 0
	 	var modified_obj = [];

	 	for(i=0;i<obj.length;i++)
		{
				if(obj[i]['tags'] == value)
				{
					modified_obj.push(obj[i]);
				}

		}
			append_data(modified_obj);

	}


	function price_range(obj,range_1,range_2){
		console.log('i am in !!')
		var modified_obj = [];

	 	for(i=0;i<obj.length;i++)
		{
				// console.log(obj[i]['price'] >= range_1);

				if(parseFloat(obj[i]['price']) >= range_1 && parseFloat(obj[i]['price']) <= range_2 )
				{
					modified_obj.push(obj[i]);
				}

		}

		append_data(modified_obj);


	}

	function slider_get_set(obj) {

		var minimum = parseFloat(obj[0]['price']);
		var maximum = 0;

		for(i=0;i<obj.length;i++)
		{
				if(parseFloat(obj[i]['price']) > maximum)
				{
					maximum = parseFloat(obj[i]['price']);
				}
				if(parseFloat(obj[i]['price']) < minimum )
				{
					minimum = parseFloat(obj[i]['price']);
				}

		}

		 $( function() {

		    $( "#slider-range" ).slider({
		      range: true,
		      max: maximum,
		      min: minimum,
		      values: [ minimum, maximum ],
		      slide: function( event, ui ) {
		        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );

		        // console.log(ui.values[ 0 ],ui.values[ 1 ]);
		        price_range(obj,ui.values[ 0 ],ui.values[ 1 ]);

		      }

		    });

		    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
		      " - $" + $( "#slider-range" ).slider( "values", 1 ) );



		  } );
	}



	
		$("#reload_it").on("click", function(){

   		location.reload();
	
	});

});
