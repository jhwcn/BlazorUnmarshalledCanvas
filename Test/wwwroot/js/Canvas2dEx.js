window.c2de = {
    drawLine: function (d) {
        var dc = c2d.getContext(d);
        var x1 = jsi.readFloat(d, 4);
        var y1 = jsi.readFloat(d, 8);
        var x2 = jsi.readFloat(d, 12);
        var y2 = jsi.readFloat(d, 16);
        dc.beginPath();
        dc.moveTo(x1, y1);
        dc.lineTo(x2, y2);
        dc.stroke();
    },

    drawArc: function (d) {
        var dc = c2d.getContext(d);
        var x = jsi.readFloat(d, 4);
        var y = jsi.readFloat(d, 8);
        var r = jsi.readFloat(d, 12);
        var s = jsi.readFloat(d, 16);
        var e = jsi.readFloat(d, 20);
        var a = jsi.readInt32(d, 24);
        dc.beginPath();
        dc.arc(x, y, r, s, e, a !== 0);
        dc.stroke();
    }
};