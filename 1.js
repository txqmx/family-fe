data() {
    return {
       displacement: {
         scale: 1
       }
     }
 },
  
 mounted() {
     // this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行
     let that = this;
     this.$nextTick(() => {
       // 获取放大或缩小的区域DOM
       let matrix_box = document.querySelector(".build_matrix_box");
       matrix_box.addEventListener("touchstart", function(event) {
         var touches = event.touches;
         var events = touches[0];
         var events2 = touches[1];
  
         // event.preventDefault();
  
         // 第一个触摸点的坐标
         that.displacement.pageX = events.pageX;
         that.displacement.pageY = events.pageY;
  
         that.displacement.moveable = true;
  
         if (events2) {
           that.displacement.pageX2 = events2.pageX;
           that.displacement.pageY2 = events2.pageY;
         }
  
         that.displacement.originScale = that.displacement.scale || 1;
         // console.log(that.displacement);
       });
       document.addEventListener("touchmove", function(event) {
         if (!that.displacement.moveable) {
           return;
         }
  
         event.preventDefault();
  
         var touches = event.touches;
         var events = touches[0];
         var events2 = touches[1];
         // 双指移动
         if (events2) {
           // 第2个指头坐标在touchmove时候获取
           if (!that.displacement.pageX2) {
             that.displacement.pageX2 = events2.pageX;
           }
           if (!that.displacement.pageY2) {
             that.displacement.pageY2 = events2.pageY;
           }
  
           // 双指缩放比例计算
           var zoom =
             that.getDistance(
               {
                 x: events.pageX,
                 y: events.pageY
               },
               {
                 x: events2.pageX,
                 y: events2.pageY
               }
             ) /
             that.getDistance(
               {
                 x: that.displacement.pageX,
                 y: that.displacement.pageY
               },
               {
                 x: that.displacement.pageX2,
                 y: that.displacement.pageY2
               }
             );
           // 应用在元素上的缩放比例
           var newScale = that.displacement.originScale * zoom;
           // 最大缩放比例限制
           if (newScale > 1) {
             newScale = 1;
           }
           // 记住使用的缩放值
           that.displacement.scale = newScale;
           // 图像应用缩放效果
           // console.log(newScale);
           matrix_box.style.transform = "scale(" + newScale + ")";
           // 设置旋转元素的基点位置
           matrix_box.style.transformOrigin = "0px 0px 0px";
         }
       });
     });
   },
  
  methods: {
     getDistance(start, stop) {
       // Math.hypot()计算参数的平方根
       return Math.hypot(stop.x - start.x, stop.y - start.y);
     },
  }