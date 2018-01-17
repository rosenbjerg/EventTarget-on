# EventTarget-on

Library that simply adds the function 
`on(event, selector, handler, options)` 
to the EventTarget prototype so all HTMLElements has it available.

The `event` parameter specifies which event type to listen for, eg. 'click'.

The `selector` parameter is the selector the element must match to trigger the handler. 
Can be omitted if all elements should trigger the handler.

The `handler` parameter must be a function. 
It will be invoked with the element that triggered the event as first parameter and the event as second.

The `options` parameter is optional and is used in addEventListener(..). 
See [addEventListener on MSDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) for information about the options object. 