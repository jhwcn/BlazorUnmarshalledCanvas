# BlazorUnmarshalledCanvas
Unmarshalled invoking of Canvas 2d context from Blazor

# Why unmarshalled
Blazor JavaScript interop depends on Json to marshall object between Javascipt and C#, that could be a problem on performance. With unmarshalled invoking methods provided by MonoWebAssemblyJSRuntime, the canvas drawing process could be a lot fast then using the Invoke method of JSInProcessRuntime.

# How to use
Add reference to UmCanvas, create a Canvas2d object with the id of the target HTML5 canvas, and then call the wrapped methods of the "2d" context, that is it.

```csharp
protected override void OnAfterRender()
{
    base.OnAfterRender();

    Canvas2d dc = new Canvas2d("theHtml5Canvas");
    dc.ClearRect(0, 0, 400, 400);
    dc.FillStyle = "red";
    dc.FillRect(10, 10, 200, 200);
    dc.FillText("Test", 20, 20);
}
```
