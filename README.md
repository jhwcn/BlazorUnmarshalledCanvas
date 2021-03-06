# BlazorUnmarshalledCanvas
Unmarshalled invoking of Canvas 2d context from Blazor

# Why unmarshalled
Blazor JavaScript interop depends on Json to marshall object between Javascript and C#, that could be a problem on performance. With unmarshalled invoking methods provided by MonoWebAssemblyJSRuntime, the canvas drawing process could be **much faster** than the normal invoke, it is **50 times faster** for passing 2 float value, and this number will increase rapidly with the complexity and the size of the data.

# How to use
Add a reference to the UmCanvas library, in the Blazor page @function part, create a Canvas2d object with the id of the target HTML5 canvas, and then call the wrapped methods of the "2d" context, that is it.

```csharp
protected override void OnAfterRender()
{
    base.OnAfterRender();

    Canvas2d dc = new Canvas2d("theHtml5Canvas");
    dc.ClearRect(0, 0, dc.Width, dc.Height);
    dc.FillStyle = "red";
    dc.FillRect(10, 10, 200, 200);
    dc.FillStyle = "black";
    dc.FillText("Test", 20, 20);
}
```
# Extend the code
Calling the basic methods provided by Canvas2d can work, but may not be satisfying. To draw a line with the basic methods, the code will be:
```csharp
    Canvas2d dc = new Canvas2d("theHtml5Canvas");
    dc.BeginPath();
    dc.MoveTo(10, 10);
    dc.LineTo(100, 100);
    dc.Stroke();
```
Four interops are needed here, even the interops are unmarshalled, there is a big space for improvement. Canvas2dEx.cs and Canvas2dEx.js were created in the Test project to extend the Canvas2d class, two corresponding simple methods were added:
```cssharp
    public static void DrawLine(this Canvas2d canvas, float x1, float y1, float x2, float y2)
    {
        canvas.Invoke("c2de.drawLine", x1, y1, x2, y2);
    }
```
```javascript
window.c2de = {
    drawLine: function (d) {
        var dc = c2d.canvas2d_getContext(d);
		//jsi.readFloat is a concise wrap of Blazor.platform.readFloatField
        var x1 = jsi.readFloat(d, 4);
        var y1 = jsi.readFloat(d, 8);
        var x2 = jsi.readFloat(d, 12);
        var y2 = jsi.readFloat(d, 16);
        dc.beginPath();
        dc.moveTo(x1, y1);
        dc.lineTo(x2, y2);
        dc.stroke();
    }
}
```
And then canvas2dEx.js was appended to the wwwroot/index.html, after the blazor.webassembly.js
```html
    <script src="_framework/blazor.webassembly.js"></script>
    <script src="js/Canvas2dEx.js"></script>
```
After this, to draw a line, a simple line of code is enough:
```csharp
    Canvas2d dc = new Canvas2d("theHtml5Canvas");
    dc.DrawLine(10, 10, 100, 100);
```
By extending the Canvas2d class, the drawing code can be better organized, and the performance can be improved further.

# Size of the Canvas
To adjust the size of the canvas in HTML is surprisingly difficult. Canvas actually has two kinds of "sizes", one is the size of the real canvas, another is the client size of the HTML control. 

To draw the canvas fullscreen, 
1) The control's size should be set to some percentage of the window, this can be done by using CSS.
2) The width and height of the canvas should be set to the client size of the control, otherwise, the image will be stretched, 
3) When the window size changes, the canvas may need to redraw itself. 

With UmCanvas, a simple line of code will get 2 and 3 done:
```csharp
    Canvas2d dc = new Canvas2d("theHtml5Canvas");
    dc.Size2Client(Refresh);
```
What Size2Client does are: 
1) Run the Javascript code which sets the width and height of the canvas to its client size. (No stretch anymore.)
2) When the window resizes, Javascript will call the DotNet method CanvasOnWindowResizedAsync which will execute the registered refresh action. (Refresh after resize.)
