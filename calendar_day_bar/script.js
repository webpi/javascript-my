const classArray = ['.yellow', '.green', '.red'];
$.each(classArray,function(i,v){
	let classList = $(v);
    $.each(classList,function(idx,value){
    	let td = $(value);
        let className = v.split('.')[1];        
    	if(!td.prev().hasClass(className)) td.addClass('first')
        if(!td.next().hasClass(className)) td.addClass('last')
    });
});