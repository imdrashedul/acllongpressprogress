/**
 * ACL LongPress With Progress is a jQuery plugin that makes it easy to support long press
 * events on mobile devices and desktop browsers.
 *
 * @name acllongpressprogress
 * @version 1.0.0
 * @requires jQuery v1.2.3+
 * @author M. Rashedul Islam
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($) {
    $.fn.disableLongPress = function() {
        return this.each(function() {
            const $this = $(this);
            $this.data('disabled', true);
        });
    };

    $.fn.enableLongPress = function() {
        return this.each(function() {
            const $this = $(this);
            $this.data('disabled', false);
        });
    };

    $.fn.onLongPress = function(options) {
        const settings = $.extend({}, {
            options: $.extend({
                tigger: null,
                speed: 10,
                start: 1,
                limit: 100,
                onStart: function() { },
                onComplete: function () { },
                onProgress: function (progress) { },
                onFinish: function () { }
            }, options)
        });

        return this.each(function() {
            const elem = this;
            const $this = $(this);
            let counter = parseInt(settings.options.start);
            let running = false;
            let runner = null;
            let activeElem = null;

            function emmitProgress() {
                if(typeof settings.options.onProgress === 'function') {
                    settings.options.onProgress.apply(settings.options.trigger ? activeElem : elem, [(counter/parseInt(settings.options.limit))*100]);
                }
                counter++;
            }

            function evMouseUp(e) {
                if(runner!=null) {
                    clearInterval(runner);
                    runner = null;
                    finish.apply(this);
                }
            }

            function evMouseDown(e) {
                const targetElement = settings.options.trigger ? $(this) : $this;
                if(runner==null && !targetElement.data('disabled')) {
                    runner = setInterval(function () { invoker.apply(this) }, parseInt(settings.options.speed));
                    if(typeof settings.options.onStart === 'function') {
                        activeElem = this;
                        settings.options.onStart.apply(settings.options.trigger ? this : elem);
                    }
                }
            }

            function evMouseOut(e) {
                evMouseUp.apply(this, [e]);
            }


            function invoker() {
                if(counter===parseInt(settings.options.limit)) {
                    if(typeof settings.options.onComplete === 'function') {
                        settings.options.onComplete.apply(settings.options.trigger ? activeElem : elem);
                    }
                    emmitProgress.apply(this);
                } else if(counter<parseInt(settings.options.limit)) emmitProgress.apply(this);
            }

            function finish() {
                running = false;
                counter = parseInt(settings.options.start);
                if(typeof settings.options.onFinish === 'function') {
                    settings.options.onFinish.apply(settings.options.trigger ? activeElem : elem);
                    activeElem = null;
                }
            }

            function run() {
                if(!running) {
                    running = true;
                    counter = parseInt(settings.options.start);
                }
            }

            if(!$this.data('event')) {
                $this.data('event', true);

                if(settings.options.trigger) {
                    // Browser Support
                    $this.on('mousedown', settings.options.trigger, evMouseDown);
                    $this.on('mouseup', settings.options.trigger, evMouseUp);
                    $this.on('mouseout', settings.options.trigger, evMouseOut);

                    // Mobile Support
                    $this.on('touchstart', settings.options.trigger, evMouseDown);
                    $this.on('touchend', settings.options.trigger, evMouseOut);
                } else {
                    // Browser Support
                    $this.on('mousedown', evMouseDown);
                    $this.on('mouseup', evMouseUp);
                    $this.on('mouseout', evMouseOut);

                    // Mobile Support
                    $this.on('touchstart', evMouseDown);
                    $this.on('touchend', evMouseOut);
                }
            }

            run();
        });
    };
}(jQuery));
