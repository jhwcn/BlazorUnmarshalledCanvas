//This javascipt depends on Blazor.platform to parse the arguments from .net
//for more information, please refer to https://github.com/aspnet/AspNetCore/blob/master/src/Components/Browser.JS/src/Platform/Platform.ts

window.c2d = {
    canvas2d_contexts: {},

    canvas2d_getContext: function (d) {
        var id = Blazor.platform.readStringField(d, 0);
        var dc = c2d.canvas2d_contexts[id];
        if (dc)
            return dc;
        var c = document.getElementById(id);
        dc = c.getContext("2d");
        c2d.canvas2d_contexts[id] = dc;
        return dc;
    },

    release: function (d) {
        var id = Blazor.platform.readStringField(d, 0);
        delete c2d.canvas2d_contexts[id];
    },

    getFillStyle: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        return Blazor.platform.toDotNetString(dc.fillStyle);
    },
    setFillStyle: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var fs = Blazor.platform.readStringField(d, 4);
        dc.fillStyle = fs;
    },

    getStrokeStyle: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        return Blazor.platform.toDotNetString(dc.strokeStyle);
    },
    setStrokeStyle: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var ss = Blazor.platform.readStringField(d, 4);
        dc.strokeStyle = ss;
    },

    getFont: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        return Blazor.platform.toDotNetString(dc.font);
    },
    setFont: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var f = Blazor.platform.readStringField(d, 4);
        dc.font = f;
    },

    getLineWidth: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        return Blazor.platform.toDotNetString(dc.lineWidth.toString());
    },
    setLineWidth: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var w = Blazor.platform.readFloatField(d, 4);
        dc.LineWidth = w;
    },

    getGlobalAlpha: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        return Blazor.platform.toDotNetString(dc.globalAlpha.toString());
    },
    setGlobalAlpha: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var a = Blazor.platform.readFloatField(d, 4);
        dc.globalAlpha = a;
    },

    clearRect: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var x = Blazor.platform.readFloatField(d, 4);
        var y = Blazor.platform.readFloatField(d, 8);
        var w = Blazor.platform.readFloatField(d, 12);
        var h = Blazor.platform.readFloatField(d, 16);
        dc.clearRect(x, y, w, h);
    },
    fillRect: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var x = Blazor.platform.readFloatField(d, 4);
        var y = Blazor.platform.readFloatField(d, 8);
        var w = Blazor.platform.readFloatField(d, 12);
        var h = Blazor.platform.readFloatField(d, 16);
        dc.fillRect(x, y, w, h);
    },
    strokeRect: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var x = Blazor.platform.readFloatField(d, 4);
        var y = Blazor.platform.readFloatField(d, 8);
        var w = Blazor.platform.readFloatField(d, 12);
        var h = Blazor.platform.readFloatField(d, 16);
        dc.strokeRect(x, y, w, h);
    },

    fillText: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var t = Blazor.platform.readStringField(d, 4);
        var x = Blazor.platform.readFloatField(d, 8);
        var y = Blazor.platform.readFloatField(d, 12);
        dc.fillText(t, x, y);
    },
    fillText1: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var t = Blazor.platform.readStringField(d, 4);
        var x = Blazor.platform.readFloatField(d, 8);
        var y = Blazor.platform.readFloatField(d, 12);
        var w = Blazor.platform.readFloatField(d, 16);
        dc.fillText(t, x, y, w);
    },
    strokeText: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var t = Blazor.platform.readStringField(d, 4);
        var x = Blazor.platform.readFloatField(d, 8);
        var y = Blazor.platform.readFloatField(d, 12);
        dc.strokeText(t, x, y);
    },
    strokeText1: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var t = Blazor.platform.readStringField(d, 4);
        var x = Blazor.platform.readFloatField(d, 8);
        var y = Blazor.platform.readFloatField(d, 12);
        var w = Blazor.platform.readFloatField(d, 16);
        dc.strokeText(t, x, y, w);
    },
    measureText: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var t = Blazor.platform.readStringField(d, 4);
        var m = dc.measureText(t);
        return Blazor.platform.toDotNetString(m.width.toString());
    },

    getLineDash: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var ds = dc.getLineDash();
        return Blazor.platform.toDotNetString(ds.toString());
    },
    setLineDash: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var a = Blazor.platform.readObjectField(d, 4);
        var cnt = Blazor.platform.getArrayLength(a);
        var ja = [];
        for (var ind = 0; ind < cnt; ind++) {
            var pai = Blazor.platform.getArrayEntryPtr(a, ind, 4);
            var aiv = Blazor.platform.readFloatField(pai, 0);
            ja.push(aiv);
        }
        dc.setLineDash(ja);
    },

    beginPath: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        dc.beginPath();
    },
    closePath: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        dc.closePath();
    },

    moveTo: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var x = Blazor.platform.readFloatField(d, 4);
        var y = Blazor.platform.readFloatField(d, 8);
        dc.moveTo(x, y);
    },
    lineTo: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var x = Blazor.platform.readFloatField(d, 4);
        var y = Blazor.platform.readFloatField(d, 8);
        dc.lineTo(x, y);
    },
    bezierCurveTo: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var cp1X = Blazor.platform.readFloatField(d, 4);
        var cp1Y = Blazor.platform.readFloatField(d, 8);
        var cp2X = Blazor.platform.readFloatField(d, 12);
        var cp2Y = Blazor.platform.readFloatField(d, 16);
        var x = Blazor.platform.readFloatField(d, 20);
        var y = Blazor.platform.readFloatField(d, 24);
        dc.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, x, y);
    },
    quadraticCurveTo: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var cpX = Blazor.platform.readFloatField(d, 4);
        var cpY = Blazor.platform.readFloatField(d, 8);
        var x = Blazor.platform.readFloatField(d, 12);
        var y = Blazor.platform.readFloatField(d, 16);
        dc.quadraticCurveTo(cpX, cpY, x, y);
    },
    arc: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var x = Blazor.platform.readFloatField(d, 4);
        var y = Blazor.platform.readFloatField(d, 8);
        var r = Blazor.platform.readFloatField(d, 12);
        var s = Blazor.platform.readFloatField(d, 16);
        var e = Blazor.platform.readFloatField(d, 20);
        var a = Blazor.platform.readInt32Field(d, 24);
        dc.arc(x, y, r, s, e, a !== 0);
    },
    arcTo: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var x1 = Blazor.platform.readFloatField(d, 4);
        var y1 = Blazor.platform.readFloatField(d, 8);
        var x2 = Blazor.platform.readFloatField(d, 12);
        var y2 = Blazor.platform.readFloatField(d, 16);
        var r = Blazor.platform.readFloatField(d, 20);
        dc.arcTo(x1, y1, x2, y2, r);
    },
    rect: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var x = Blazor.platform.readFloatField(d, 4);
        var y = Blazor.platform.readFloatField(d, 8);
        var w = Blazor.platform.readFloatField(d, 12);
        var h = Blazor.platform.readFloatField(d, 16);
        dc.rect(x, y, w, h);
    },

    fill: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        dc.fill();
    },
    stroke: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        dc.stroke();
    },
    clip: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        dc.clip();
    },

    rotate: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var a = Blazor.platform.readFloatField(d, 4);
        dc.rotate(a);
    },
    scale: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var x = Blazor.platform.readFloatField(d, 4);
        var y = Blazor.platform.readFloatField(d, 8);
        dc.scale(x, y);
    },
    translate: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var x = Blazor.platform.readFloatField(d, 4);
        var y = Blazor.platform.readFloatField(d, 8);
        dc.translate(x, y);
    },
    transform: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var m11 = Blazor.platform.readFloatField(d, 4);
        var m12 = Blazor.platform.readFloatField(d, 8);
        var m21 = Blazor.platform.readFloatField(d, 12);
        var m22 = Blazor.platform.readFloatField(d, 16);
        var dx = Blazor.platform.readFloatField(d, 20);
        var dy = Blazor.platform.readFloatField(d, 24);
        dc.transform(m11, m12, m21, m22, dx, dy);
    },
    setTransform: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        var m11 = Blazor.platform.readFloatField(d, 4);
        var m12 = Blazor.platform.readFloatField(d, 8);
        var m21 = Blazor.platform.readFloatField(d, 12);
        var m22 = Blazor.platform.readFloatField(d, 16);
        var dx = Blazor.platform.readFloatField(d, 20);
        var dy = Blazor.platform.readFloatField(d, 24);
        dc.setTransform(m11, m12, m21, m22, dx, dy);
    },

    save: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        dc.save();
    },
    restore: function (d) {
        var dc = c2d.canvas2d_getContext(d);
        dc.restore();
    }
};