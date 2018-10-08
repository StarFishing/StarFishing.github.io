;(function()
{
      "use strict";
     // $(".add-task").on('submit',function(e){
     //     e.preventDefault();
     //     var aa=$('input[name=content]').val();
     //    alert(aa);

     // });
/***页面加载进度条***/

   document.onreadystatechange=function () {
      if(document.readyState=="complete")
      {
        $(".loading").fadeOut();
      }
    }

    var $window = $(window);
    var $body = $('body');

    var $form_add_task= $(".add-task");
   
    var task_list=[];

    var $task_detail_mask=$(".task-detail-mask");

    var $task_detail=$('.task-detail');

    var current_index;
    var $update_form;
    var $task_detail_content;
    /*选中Task input的元素*/
    var $task_detail_content_input;

    /*任务完成时提醒*/
    var $msg = $('.msg');
    var $msg_content = $msg.find('.msg-content');
    var $msg_confirm = $msg.find('.confirmed');
    var $alerter = $('.alerter');


    var $checkbox_complete;
    /*获取删除和信息按钮，并为后面设置监听*/
    var $task_delete_triggle;
    var $task_detail_triggle;
    //开始隐藏mask，以及详细显示的问题
    hide_task_detail();

    innit();


    $task_detail_mask.on('click',hide_task_detail);
    $form_add_task.on('submit',function(e){
        //禁用默认行为
        e.preventDefault();
       // innit();
        var new_task={};

        var $input=$(this).find('input[name=content]');

        new_task.content=$input.val();

        //如果更新task为空，直接返回
        if(!new_task.content) return;

        //console.log('new_task',new_task);
        //如果更新task为空，直接返回
        //if(!new_task.content) return;
        
         if(add_task(new_task))
          {
            render_task_list();
            $input.val('');
          };

     })

   
        function add_task(new_task)
        {
           task_list.push(new_task);
           store.set('task_list',task_list); 
           //console.log(task_list);
           return true;
          
        }
        //
        function innit()
        {
           //store.clear();

            

            task_list=store.get('task_list')||[];
            if(task_list.length){
              render_task_list();
            }
           task_remind_check();
           listen_msg_event()

            //alert(task_list.length);
            //console.log(task_list);
        }



/*******************************************/

  function pop(arg) {
    if (!arg) {
      console.error('pop title is required');
    }

    var conf = {}
      , $box
      , $mask
      , $title
      , $content
      , $confirm
      , $cancel
      , timer
      , dfd
      , confirmed
      ;

    dfd = $.Deferred();

    if (typeof arg == 'string')
      conf.title = arg;
    else {
      conf = $.extend(conf, arg);
    }

    $box = $('<div>' +
      '<div class="pop-title">' + conf.title + '</div>' +
      '<div class="pop-content">' +
      '<div>' +
      '<button style="margin-top:40px ;margin-bottom:10px;margin-left:25%;float:left" class="primary confirm">确定</button>' +
      '<button style="margin-top:40px ;margin-bottom:10px;margin-right:25%;float:right" class="cancel">取消</button>' +
      '</div>' +
      '</div>' +
      '</div>')
      .css({
        color: '#444',
        width: 300,
        height: 'auto',
        padding: '15px 10px',
        background: '#fff',
        position: 'fixed',
        'border-radius': 6,
        'box-shadow': '0 1px 2px rgba(0,0,0,.5)'
      })

    $title = $box.find('.pop-title').css({
      padding: '5px 10px',
      'font-weight': 900,
      'font-size': 20,
      'text-align': 'center'
    })

    $content = $box.find('.pop-content').css({
      padding: '5px 10px',
      'text-align': 'center'
    })

    $confirm = $content.find('button.confirm');
    $cancel = $content.find('button.cancel');

    $mask = $('<div></div>')
      .css({
        position: 'fixed',
        background: 'rgba(0,0,0,.5)',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      })

    timer = setInterval(function () {
      if (confirmed !== undefined) {
        dfd.resolve(confirmed);
        clearInterval(timer);
        dismiss_pop();
      }
    }, 50)

    $confirm.on('click', on_confirmed)
    $cancel.on('click', on_cancel);
    $mask.on('click', on_cancel);

    function on_cancel() {
      confirmed = false;
    }

    function on_confirmed() {
      confirmed = true;
    }


    function dismiss_pop() {
      $mask.remove();
      $box.remove();
    }

    function adjust_box_position() {
      var window_width = $window.width()
        , window_height = $window.height()
        , box_width = $box.width()
        , box_height = $box.height()
        , move_x
        , move_y
        ;

      move_x = (window_width - box_width) / 2;
      move_y = ((window_height - box_height) / 2) - 20;

      $box.css({
        left: move_x,
        top: move_y,
      })
    }

    $window.on('resize', function () {
      adjust_box_position();
    })
    $mask.appendTo($body);
    $box.appendTo($body);
    $window.resize();
    return dfd.promise();
  }

/*********************/





/****task时间提醒*****/

function task_remind_check() {
    var current_timestamp;



    var itl = setInterval(function () {
      for (var i = 0; i < task_list.length; i++) {
        var item = get(i), task_timestamp;
        if (!item || !item.remind_date|| item.informed )//
          continue;

        current_timestamp = (new Date()).getTime();
        task_timestamp = (new Date(item.remind_date)).getTime();

        if (current_timestamp - task_timestamp >= 1) {
           if(item.complete)
             update_task(i, {complete: false});
              else
                  update_task(i, {complete: true});
          update_task(i, {informed: true});
          show_msg(item.content);
        }
      }
    }, 300);
  }
/****任务到时提醒*****/
  function show_msg(msg) {
    if (!msg) return;

    $msg_content.html(msg);
    $alerter.get(0).play();
    $msg.show();
    //$msg.slideDown();
    //$msg.fadeIn();
    $msg.animate({width:'40%',opacity:'0.4',height:'2px'},100);
    $msg.animate({width:'70%',opacity:'0.6',height:'4px'},100);
    $msg.animate({width:'100%',opacity:'1',height:'100%'},100);
  }

  function hide_msg() {
    //$msg.hide();
    $msg.slideUp("slow");
  }
/*** 为单个信息条目设置添加样式      ****/
        function render_task_tpl(data,index)
        {
            if (!data || !index) return;
            var list_item_tpl='<div class="task-item" data-index="'+index+'">'+
            '<span><input type="checkbox" class="complete"'+(data.complete ? 'checked' : '')+' ></span>'+
            '<span class="task-content">'+data.content+'</span>'+
            '<span class="fr">'+
            '<span class="action delete">删除</span>'+
            '<span class="action detail">详情</span>'+'</span>'+
            '</div>';
            return $(list_item_tpl);

        }
        //渲染列表，并且添加监听
        function render_task_list()
        {
          var $task_list=$('.task-list');
          $task_list.html('');

          var complete_items = [];
          for(var i=0;i<task_list.length;i++)
          {
             var item = task_list[i];
             if (item && item.complete)
             complete_items[i] = item;

             else{
            var $task=render_task_tpl(task_list[i],i);
            $task_list.prepend($task);
          }
          }




          for (var j = 0; j < complete_items.length; j++) 
          {
                $task = render_task_tpl(complete_items[j], j);
                if (!$task) continue;
                $task.addClass('completed');
                $task_list.append($task);
          }


          $task_delete_triggle=$(".action.delete");
          $task_detail_triggle=$(".action.detail");
          $checkbox_complete = $('.task-list .complete[type=checkbox]');


          listen_task_detail();
          listen_task_delete();
          listen_checkbox_complete();//设置复选框按钮监听

            //console.log($task_list);

        }

//详细按钮加监听
function listen_task_detail()
{

     var index;
    $('.task-item').on('dblclick', function () {
      index = $(this).data('index');
      show_task_detail(index);
    })


  $task_detail_triggle.on('click',function(){
  var $this=$(this);
  //站到删除按钮所在的task
  var $item=$this.parent().parent();
  var index=$item.data('index');

  show_task_detail(index);
  //console.log(index);
})

}

/*任务完成提示，对其进行监听*/
  function listen_msg_event() {
    $msg_confirm.on('click', function () {
      hide_msg();
    })
  }


 /*Checkbox监听完成Task事件*/
  function listen_checkbox_complete() {
    $checkbox_complete.on('click', function () {
      var $this = $(this);
      var index = $this.parent().parent().data('index');
      var item = get(index);
      if (item.complete)
        update_task(index, {complete: false});
      else
        update_task(index, {complete: true});
    })
  }
/*简化上面函数*/
function get(index) {
    return store.get('task_list')[index];
  }
//显示详细信息框
function show_task_detail(index)
{
  render_task_detail(index);

  current_index=index;

  /*********/
  //$task_detail.show();
  //$task_detail.fadeIn(500);
  $task_detail.slideDown(300);
  $task_detail_mask.show();
}

//更新task信息
function update_task(index,data)
{
// if(!index||!task_list[index])return;

// //task_list[index]=$.merge({},task_list[index],data);
// task_list[index]=data;

// //refresh_task_list();

 if (!index || !task_list[index])
      return;

    //task_list[index] = $.extend({}, task_list[index], data);
    //task_list[index]=data;
    task_list[index] = $.extend({}, task_list[index], data);
    refresh_task_list();


}

//隐藏详细信息框
   function hide_task_detail()
{
  $task_detail.hide();
  $task_detail_mask.hide();
} 

//渲染指定Task的详细信息
 function render_task_detail(index){
  //alert(index);
 if(index===undefined||!task_list[index])return;
  //var number=Number(index);
  //alert(typeof number+number);


  var item=task_list[index];
  var tpl='<form><div class="content">'+(item.content || '') +'</div>'+

      '<div class="input-item">' +
      '<input style="display: none;" type="text" autocomplete="off" name="content" value="' + (item.content || '') + '">' +
      '</div>' +



      '<div class="desc">'+'<textarea name="desc"> '+(item.desc||'')+'</textarea>'+
      '</div>'+
      '<div class="remaind">'+
      '<label>提醒时间</label>'+
      '<input class="datetime" name="remind_date" autocomplete="off" type="text" value="' + (item.remind_date || '') + '">'+
      '</div>'+
      '<div><button type="submit">更新</button></div>'+
      '</form>';


     // console.log(item);

      $task_detail.html(null);
      $task_detail.html(tpl);

      $('.datetime').datetimepicker();
      /*选中其中的form元素，因为之后会使用其监听submit事件*/
      $update_form=$task_detail.find('form');


    /*选中显示Task内容的元素*/
     $task_detail_content = $update_form.find('.content');
    /*选中Task input的元素*/
    $task_detail_content_input = $update_form.find('[name=content]');



    /*双击内容元素显示input, 隐藏自己*/
    $task_detail_content.on('dblclick', function () {

      $task_detail_content_input.show();
      $task_detail_content.hide();
    })

      $update_form.on('submit',function(e){
        e.preventDefault();
        var data={};
        var $change=$(this).find('[name=content]').val();
        if($change)
        {
          data.content=$(this).find('[name=content]').val();

        }
        data.desc=$(this).find('[name=desc]').val();
        data.remind_date=$(this).find('[name=remind_date]').val();
        //console.log(data);
        update_task(index,data);
        //隐藏详细信息框
        $task_detail.fadeOut('fast');
        $task_detail_mask.hide();

      })
}


//更新列表
function refresh_task_list()
{
  store.set('task_list',task_list);
  render_task_list();
}




function listen_task_delete(){
  //监听所有删除按钮
$task_delete_triggle.on('click',function(){
  var $this=$(this);
  //站到删除按钮所在的task
  var $item=$this.parent().parent();
  var index=$item.data('index');
   //确认删除
  pop('确定删除?').then(function (r) {
          r ? delete_task(index) : null;
        });
 // var tmp=confirm('确认删除？');
 // tmp?delete_task(index):null;
})
}


/*删除一条Task*/
  function delete_task(index) {
    /*如果没有index 或者index不存在则直接返回*/
    if (index === undefined || !task_list[index]) return;

    delete task_list[index];
    /*更新localStorage*/
    refresh_task_list();
  }


})();