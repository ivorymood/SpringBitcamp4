/**
 * 
 */

var app = app || { };
var route = route ||{ };
app = (()=>{
	var init = x=>{
		onCreate(x);
		setContentView();
		};
	var onCreate = x=> {
    	route.init(x);
    };
    var setContentView =()=> {
    	alert(route.$());
    	$('#wrapper').empty();
    	app.algorithm.init();
    
    };
 
    return {
    		init : init
    };
})();    // IIFE[이파이] 즉시실행함수 패턴
route = (()=>{
	
	var init = x=>{
		sessionStorage.setItem('x', x);
	};
	var $= ()=>{
		return sessionStorage.getItem('x');
	}
	var onCreate=()=>{};
	var setContentView=()=>{};
	return {
			init : init, 
			$: $
	};
})();
app.algorithm =(()=>{
	var init = ()=>{
		onCreate();
		setContentView();
	};
	var onCreate =()=>{};
	var setContentView =()=>{
		$('#wrapper').html('<h1>Hello AJAX !!</h1>');
	};
	return {
			init: init
	};
})();




























