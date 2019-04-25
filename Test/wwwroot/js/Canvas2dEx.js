window.c2de = {
    drawLine: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var x1 = Blazor.platform.readFloatField(d, 4);
        var y1 = Blazor.platform.readFloatField(d, 8);
        var x2 = Blazor.platform.readFloatField(d, 12);
        var y2 = Blazor.platform.readFloatField(d, 16);
        dc.beginPath();
        dc.moveTo(x1, y1);
        dc.lineTo(x2, y2);
        dc.stroke();
    },

    drawArc: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var x = Blazor.platform.readFloatField(d, 4);
        var y = Blazor.platform.readFloatField(d, 8);
        var r = Blazor.platform.readFloatField(d, 12);
        var s = Blazor.platform.readFloatField(d, 16);
        var e = Blazor.platform.readFloatField(d, 20);
        var a = Blazor.platform.readInt32Field(d, 24);
        dc.beginPath();
        dc.arc(x, y, r, s, e, a !== 0);
        dc.stroke();
    }
};