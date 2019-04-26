window.c2d = {
    contexts: {},

    getContext: function (d) {
        var id = jsi.readString(d, 0);
        var dc = c2d.contexts[id];
        if (dc)
            return dc;
        var c = document.getElementById(id);
        dc = c.getContext("2d");
        c2d.contexts[id] = dc;
        return dc;
    },

    release: function (d) {
        var id = jsi.readString(d, 0);
        delete c2d.contexts[id];
    },

    getFillStyle: function (d) {
        var dc = c2d.getContext(d);
        return jsi.toDotNetStr(dc.fillStyle);
    },
    setFillStyle: function (d) {
        var dc = c2d.getContext(d);
        var fs = jsi.readString(d, 4);
        dc.fillStyle = fs;
    },

    getStrokeStyle: function (d) {
        var dc = c2d.getContext(d);
        return jsi.toDotNetStr(dc.strokeStyle);
    },
    setStrokeStyle: function (d) {
        var dc = c2d.getContext(d);
        var ss = jsi.readString(d, 4);
        dc.strokeStyle = ss;
    },

    getFont: function (d) {
        var dc = c2d.getContext(d);
        return jsi.toDotNetStr(dc.font);
    },
    setFont: function (d) {
        var dc = c2d.getContext(d);
        var f = jsi.readString(d, 4);
        dc.font = f;
    },

    getLineWidth: function (d) {
        var dc = c2d.getContext(d);
        return jsi.toDotNetStr(dc.lineWidth.toString());
    },
    setLineWidth: function (d) {
        var dc = c2d.getContext(d);
        var w = jsi.readFloat(d, 4);
        dc.LineWidth = w;
    },

    getGlobalAlpha: function (d) {
        var dc = c2d.getContext(d);
        return jsi.toDotNetStr(dc.globalAlpha.toString());
    },
    setGlobalAlpha: function (d) {
        var dc = c2d.getContext(d);
        var a = jsi.readFloat(d, 4);
        dc.globalAlpha = a;
    },

    clearRect: function (d) {
        var dc = c2d.getContext(d);
        var x = jsi.readFloat(d, 4);
        var y = jsi.readFloat(d, 8);
        var w = jsi.readFloat(d, 12);
        var h = jsi.readFloat(d, 16);
        dc.clearRect(x, y, w, h);
    },
    fillRect: function (d) {
        var dc = c2d.getContext(d);
        var x = jsi.readFloat(d, 4);
        var y = jsi.readFloat(d, 8);
        var w = jsi.readFloat(d, 12);
        var h = jsi.readFloat(d, 16);
        dc.fillRect(x, y, w, h);
    },
    strokeRect: function (d) {
        var dc = c2d.getContext(d);
        var x = jsi.readFloat(d, 4);
        var y = jsi.readFloat(d, 8);
        var w = jsi.readFloat(d, 12);
        var h = jsi.readFloat(d, 16);
        dc.strokeRect(x, y, w, h);
    },

    fillText: function (d) {
        var dc = c2d.getContext(d);
        var t = jsi.readString(d, 4);
        var x = jsi.readFloat(d, 8);
        var y = jsi.readFloat(d, 12);
        dc.fillText(t, x, y);
    },
    fillText1: function (d) {
        var dc = c2d.getContext(d);
        var t = jsi.readString(d, 4);
        var x = jsi.readFloat(d, 8);
        var y = jsi.readFloat(d, 12);
        var w = jsi.readFloat(d, 16);
        dc.fillText(t, x, y, w);
    },
    strokeText: function (d) {
        var dc = c2d.getContext(d);
        var t = jsi.readString(d, 4);
        var x = jsi.readFloat(d, 8);
        var y = jsi.readFloat(d, 12);
        dc.strokeText(t, x, y);
    },
    strokeText1: function (d) {
        var dc = c2d.getContext(d);
        var t = jsi.readString(d, 4);
        var x = jsi.readFloat(d, 8);
        var y = jsi.readFloat(d, 12);
        var w = jsi.readFloat(d, 16);
        dc.strokeText(t, x, y, w);
    },
    measureText: function (d) {
        var dc = c2d.getContext(d);
        var t = jsi.readString(d, 4);
        var m = dc.measureText(t);
        return jsi.toDotNetStr(m.width.toString());
    },

    getLineDash: function (d) {
        var dc = c2d.getContext(d);
        var ds = dc.getLineDash();
        return jsi.toDotNetStr(ds.toString());
    },
    setLineDash: function (d) {
        var dc = c2d.getContext(d);
        var a = jsi.readObject(d, 4);
        var cnt = jsi.getArrLen(a);
        var ja = [];
        for (var ind = 0; ind < cnt; ind++) {
            var pai = jsi.getArrEntry(a, ind, 4);
            var aiv = jsi.readFloat(pai, 0);
            ja.push(aiv);
        }
        dc.setLineDash(ja);
    },

    beginPath: function (d) {
        var dc = c2d.getContext(d);
        dc.beginPath();
    },
    closePath: function (d) {
        var dc = c2d.getContext(d);
        dc.closePath();
    },

    moveTo: function (d) {
        var dc = c2d.getContext(d);
        var x = jsi.readFloat(d, 4);
        var y = jsi.readFloat(d, 8);
        dc.moveTo(x, y);
    },
    lineTo: function (d) {
        var dc = c2d.getContext(d);
        var x = jsi.readFloat(d, 4);
        var y = jsi.readFloat(d, 8);
        dc.lineTo(x, y);
    },
    bezierCurveTo: function (d) {
        var dc = c2d.getContext(d);
        var cp1X = jsi.readFloat(d, 4);
        var cp1Y = jsi.readFloat(d, 8);
        var cp2X = jsi.readFloat(d, 12);
        var cp2Y = jsi.readFloat(d, 16);
        var x = jsi.readFloat(d, 20);
        var y = jsi.readFloat(d, 24);
        dc.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, x, y);
    },
    quadraticCurveTo: function (d) {
        var dc = c2d.getContext(d);
        var cpX = jsi.readFloat(d, 4);
        var cpY = jsi.readFloat(d, 8);
        var x = jsi.readFloat(d, 12);
        var y = jsi.readFloat(d, 16);
        dc.quadraticCurveTo(cpX, cpY, x, y);
    },
    arc: function (d) {
        var dc = c2d.getContext(d);
        var x = jsi.readFloat(d, 4);
        var y = jsi.readFloat(d, 8);
        var r = jsi.readFloat(d, 12);
        var s = jsi.readFloat(d, 16);
        var e = jsi.readFloat(d, 20);
        var a = jsi.readInt32(d, 24);
        dc.arc(x, y, r, s, e, a !== 0);
    },
    arcTo: function (d) {
        var dc = c2d.getContext(d);
        var x1 = jsi.readFloat(d, 4);
        var y1 = jsi.readFloat(d, 8);
        var x2 = jsi.readFloat(d, 12);
        var y2 = jsi.readFloat(d, 16);
        var r = jsi.readFloat(d, 20);
        dc.arcTo(x1, y1, x2, y2, r);
    },
    rect: function (d) {
        var dc = c2d.getContext(d);
        var x = jsi.readFloat(d, 4);
        var y = jsi.readFloat(d, 8);
        var w = jsi.readFloat(d, 12);
        var h = jsi.readFloat(d, 16);
        dc.rect(x, y, w, h);
    },

    fill: function (d) {
        var dc = c2d.getContext(d);
        dc.fill();
    },
    stroke: function (d) {
        var dc = c2d.getContext(d);
        dc.stroke();
    },
    clip: function (d) {
        var dc = c2d.getContext(d);
        dc.clip();
    },

    rotate: function (d) {
        var dc = c2d.getContext(d);
        var a = jsi.readFloat(d, 4);
        dc.rotate(a);
    },
    scale: function (d) {
        var dc = c2d.getContext(d);
        var x = jsi.readFloat(d, 4);
        var y = jsi.readFloat(d, 8);
        dc.scale(x, y);
    },
    translate: function (d) {
        var dc = c2d.getContext(d);
        var x = jsi.readFloat(d, 4);
        var y = jsi.readFloat(d, 8);
        dc.translate(x, y);
    },
    transform: function (d) {
        var dc = c2d.getContext(d);
        var m11 = jsi.readFloat(d, 4);
        var m12 = jsi.readFloat(d, 8);
        var m21 = jsi.readFloat(d, 12);
        var m22 = jsi.readFloat(d, 16);
        var dx = jsi.readFloat(d, 20);
        var dy = jsi.readFloat(d, 24);
        dc.transform(m11, m12, m21, m22, dx, dy);
    },
    setTransform: function (d) {
        var dc = c2d.getContext(d);
        var m11 = jsi.readFloat(d, 4);
        var m12 = jsi.readFloat(d, 8);
        var m21 = jsi.readFloat(d, 12);
        var m22 = jsi.readFloat(d, 16);
        var dx = jsi.readFloat(d, 20);
        var dy = jsi.readFloat(d, 24);
        dc.setTransform(m11, m12, m21, m22, dx, dy);
    },

    save: function (d) {
        var dc = c2d.getContext(d);
        dc.save();
    },
    restore: function (d) {
        var dc = c2d.getContext(d);
        dc.restore();
    }
};