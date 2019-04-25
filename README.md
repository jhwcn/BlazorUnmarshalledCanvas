# BlazorUnmarshalledCanvas
Unmarshalled invoking of Canvas 2d context from Blazor

# Why unmarshalled
Blazor JavaScript interop depends on Json to marshall object between Javascipt and C#, that could be a problem on performance. With unmarshalled invoking methods provided by MonoWebAssemblyJSRuntime, the canvas drawing process could be a lot fast than using the Invoke method of JSInProcessRuntime.

# How to use
Add a reference to the UmCanvas library, in the Blazor page @function part, create a Canvas2d object with the id of the target HTML5 canvas, and then call the wrapped methods of the "2d" context, that is it.

```csharp
protected override void OnAfterRender()
{
    base.OnAfterRender();

    Canvas2d dc = new Canvas2d("theHtml5Canvas");
    dc.ClearRect(0, 0, 400, 400);
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
        var dc = canvas2d_getContext(d);
        var x1 = Blazor.platform.readFloatField(d, 4);
        var y1 = Blazor.platform.readFloatField(d, 8);
        var x2 = Blazor.platform.readFloatField(d, 12);
        var y2 = Blazor.platform.readFloatField(d, 16);
        dc.beginPath();
        dc.moveTo(x1, y1);
        dc.lineTo(x2, y2);
        dc.stroke();
    }
}
```
And a reference to the canvas2dEx.js were apppended to the wwwroot/index.html after the blazor.webassembly.js
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
