//   $(document).ready(function () {
//       $("#zoomedImage").hide();
//   });
//   $(window).on('load', function () {
//       sideImageScroll();
//   });

//   // makes side image tab in laptop same size as image
//   function sideImageScroll() {
//       var imageHeight = $(".productImage").height();
//       console.log(imageHeight);
//       $(".imagesScroll").height(imageHeight);
//       imageHeight = (imageHeight - 18) + "px";
//       $(".sideImagesDown").css({
//           "transform": "translate(0," + imageHeight + ")"
//       });
//   }

//   function imageZoom(imgID, resultID) {

//       var img, lens, result, cx, cy;
//       img = document.getElementById(imgID);
//       result = document.getElementById(resultID);
//       /*create lens:*/
//       lens = document.createElement("DIV");
//       lens.setAttribute("class", "img-zoom-lens");
//       /*insert lens:*/
//       img.parentElement.insertBefore(lens, img);
//       /*calculate the ratio between result DIV and lens:*/
//       cx = result.offsetWidth / lens.offsetWidth;
//       cy = result.offsetHeight / lens.offsetHeight;

//       $(".img-zoom-lens").hide();
//       /*set background properties for the result DIV:*/
//       result.style.backgroundImage = "url('" + img.src + "')";
//       result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
//       /*execute a function when someone moves the cursor over the image, or the lens:*/
//       lens.addEventListener("mousemove", moveLens);
//       img.addEventListener("mousemove", moveLens);
//       /*and also for touch screens:*/
//       lens.addEventListener("touchmove", moveLens);
//       img.addEventListener("touchmove", moveLens);
//       // when mouse leaves
//       lens.addEventListener("mouseleave", hideBigImage);
//       img.addEventListener("mouseleave", hideBigImage);

//       function moveLens(e) {
//           $("#zoomedImage,.img-zoom-lens").show();
//           var pos, x, y;
//           /*prevent any other actions that may occur when moving over the image:*/
//           e.preventDefault();
//           /*get the cursor's x and y positions:*/
//           pos = getCursorPos(e);
//           /*calculate the position of the lens:*/
//           x = pos.x - (lens.offsetWidth / 2);
//           y = pos.y - (lens.offsetHeight / 2);
//           /*prevent the lens from being positioned outside the image:*/
//           if (x > img.width - lens.offsetWidth) {
//               x = img.width - lens.offsetWidth;
//           }
//           if (x < 0) {
//               x = 0;
//           }
//           if (y > img.height - lens.offsetHeight) {
//               y = img.height - lens.offsetHeight;
//           }
//           if (y < 0) {
//               y = 0;
//           }
//           /*set the position of the lens:*/
//           lens.style.left = x + "px";
//           lens.style.top = y + "px";
//           /*display what the lens "sees":*/
//           result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
//       }

//       function getCursorPos(e) {
//           var a, x = 0,
//               y = 0;
//           e = e || window.event;
//           /*get the x and y positions of the image:*/
//           a = img.getBoundingClientRect();
//           /*calculate the cursor's x and y coordinates, relative to the image:*/
//           x = e.pageX - a.left;
//           y = e.pageY - a.top;
//           /*consider any page scrolling:*/
//           x = x - window.pageXOffset;
//           y = y - window.pageYOffset;
//           return {
//               x: x,
//               y: y
//           };
//       }
//   }


//   function hideBigImage() {
//       $("#zoomedImage,.img-zoom-lens").hide();
//   }

//   // Initiate zoom effect:
//   if ($(window).width() > 992) {
//       imageZoom("productImage", "zoomedImage");
//   }