# ACL LongPress + Progress
ACL LongPress With Progress is a jQuery plugin that makes it easy to support long press on on mobile devices and desktop browsers

# Basic Usage 
For any button or element
```
$(".super-btn").onLongPress({
    onComplete: function () {
        //$(this).disableLongPress(); //Disable Further Click If you want
        //$(this).enableLongPress(); // This will re-enable a disabled button

        //Action on completion can be written here..
    },
    onStart: function() {
        //Any pre-action before press initiates
    },
    onProgress: function (progress) {
       // Update your press progress here 1-100
    },
    onFinish: function () {
      // Triggered when user finish the pressing.
    }
})
```

For any dinamically added content
```
$("body").onLongPress({
    trigger: ".btn-pay"
    // rest are same as previous
});
```

# Preview
![alt text](https://github.com/imdrashedul/acllongpressprogress/blob/main/preview.gif?raw=true)
