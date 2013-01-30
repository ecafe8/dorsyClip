Main.module("eventBind", function(M){
    var bind = (function(){
        var method = "";

        if(window.addEventListener){

            return function(el, event, func){
                el.addEventListener(event, func, false);
            };
        }else{
            return function(el, event, func){
                el.attachEvent("on" + event, func);
            };
        }
        
    })();

    var unbind = (function(){
        var method = "";

        if(window.addEventListener){

            return function(el, event, func){
                el.removeEventListener(event, func, false);
            };
        }else{
            return function(el, event, func){
                el.detachEvent("on" + event, func);
            };
        }
        
    })();


    var packageContent = {
        init: function(){
            //d & d
            function offset(e, type){
                if(type == "x"){
                    return e.offsetX ? e.offsetX : e.pageX;
                }else{
                    return e.offsetY ? e.offsetY : e.pageY;
                }
            }
            var clickFlag = 0, x0, y0, leftX, leftY;
            bind(window, "mousedown", function(e){
                clickFlag = 1;

                x0 = e.clientX;
                y0 = e.clientY;

                leftX = parseInt(M.el.style.left);
                leftY = parseInt(M.el.style.top);


            });

            bind(window, "mouseup", function(){
                clickFlag = 0;
            });

            bind(document.body, "mousemove", function(e){
                if(clickFlag){
                    var x = e.clientX;
                    var y = e.clientY;
                    
                    var dx = x - x0;
                    var dy = y - y0;


                    M.el.style.left = leftX + dx + "px";
                    M.el.style.top = leftY + dy + "px";
                }
            });

            var ctrlFlag = 0;
            bind(window, "keydown", function(e){
                if(e.keyCode == 17){
                    ctrlFlag = 1;
                }

                var left = parseInt(M.el.style.left);
                var top = parseInt(M.el.style.top);
                //right
                if(e.keyCode == 39 && ctrlFlag){
                    M.el.style.left = (left + 1) + "px";
                }

                //left
                if(e.keyCode == 37 && ctrlFlag){
                    M.el.style.left = (left - 1) + "px";
                }

                //up
                if(e.keyCode == 38 && ctrlFlag){
                    M.el.style.top = (top - 1) + "px";
                    e.preventDefault();
                }

                //left
                if(e.keyCode == 40 && ctrlFlag){
                    M.el.style.top = (top + 1) + "px";
                    e.preventDefault();
                }
            });


            bind(window, "keyup", function(e){
                if(e.keyCode == 17){
                    ctrlFlag = 0;
                }
            });

            bind(document.getElementById("dorsyFix"), "click", function(){
                M.view.fixDesign();
            });

        }
    };
    return packageContent;
});
