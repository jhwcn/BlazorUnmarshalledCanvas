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

    getTextAlign: function (d) {
        var dc = c2d.getContext(d);
        return jsi.toDotNetStr(dc.textAlign);
    },
    setTextAlign: function (d) {
        var dc = c2d.getContext(d);
        var a = jsi.readString(d, 4);
        dc.textAlign = a;
    },

    getTextBaseline: function (d) {
        var dc = c2d.getContext(d);
        return jsi.toDotNetStr(dc.textBaseline);
    },
    setTextBaseline: function (d) {
        var dc = c2d.getContext(d);
        var b = jsi.readString(d, 4);
        dc.textBaseline = b;
    },

    getLineWidth: function (d) {
        var dc = c2d.getContext(d);
        return jsi.toDotNetStr(dc.lineWidth.toString());
    },
    setLineWidth: function (d) {
        var dc = c2d.getContext(d);
        var w = jsi.readFloat(d, 4);
        dc.lineWidth = w;
    },

    getLineCap: function (d) {
        var dc = c2d.getContext(d);
        return jsi.toDotNetStr(dc.lineCap);
    },
    setLineCap: function (d) {
        var dc = c2d.getContext(d);
        var a = jsi.readString(d, 4);
        dc.lineCap = a;
    },

    getMiterLimit: function (d) {
        var dc = c2d.getContext(d);
        return jsi.toDotNetStr(dc.miterLimit.toString());
    },
    setMiterLimit: function (d) {
        var dc = c2d.getContext(d);
        var a = jsi.readFloat(d, 4);
        dc.miterLimit = a;
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

    getGlobalCompositeOperation: function (d) {
        var dc = c2d.getContext(d);
        return jsi.toDotNetStr(dc.globalCompositeOperation);
    },
    setGlobalCompositeOperation: function (d) {
        var dc = c2d.getContext(d);
        var c = jsi.readString(d, 4);
        dc.globalCompositeOperation = c;
    },

    getImageSmoothingEnabled: function (d) {
        var dc = c2d.getContext(d);
        return dc.imageSmoothingEnabled;
    },
    setImageSmoothingEnabled: function (d) {
        var dc = c2d.getContext(d);
        var s = jsi.readInt32(d, 4);
        dc.imageSmoothingEnabled = s !== 0;
    },

    getShadowBlur: function (d) {
        var dc = c2d.getContext(d);
        return jsi.toDotNetStr(dc.shadowBlur.toString());
    },
    setShadowBlur: function (d) {
        var dc = c2d.getContext(d);
        var a = jsi.readFloat(d, 4);
        dc.shadowBlur = a;
    },

    getShadowColor: function (d) {
        var dc = c2d.getContext(d);
        return jsi.toDotNetStr(dc.shadowColor);
    },
    setShadowColor: function (d) {
        var dc = c2d.getContext(d);
        var a = jsi.readString(d, 4);
        dc.shadowColor = a;
    },

    getShadowOffsetX: function (d) {
        var dc = c2d.getContext(d);
        return jsi.toDotNetStr(dc.shadowOffsetX.toString());
    },
    setShadowOffsetX: function (d) {
        var dc = c2d.getContext(d);
        var a = jsi.readFloat(d, 4);
        dc.shadowOffsetX = a;
    },

    getShadowOffsetY: function (d) {
        var dc = c2d.getContext(d);
        return jsi.toDotNetStr(dc.shadowOffsetY.toString());
    },
    setShadowOffsetY: function (d) {
        var dc = c2d.getContext(d);
        var a = jsi.readFloat(d, 4);
        dc.shadowOffsetY = a;
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

    isPointInPath: function (d) {
        var dc = c2d.getContext(d);
        var x = jsi.readFloat(d, 4);
        var y = jsi.readFloat(d, 8);
        var e = jsi.readInt32(d, 12);
        return dc.isPointInPath(x, y, e === 0 ? "nonzero" : "evenodd");
    },
    isPointInStroke: function (d) {
        var dc = c2d.getContext(d);
        var x = jsi.readFloat(d, 4);
        var y = jsi.readFloat(d, 8);
        return dc.isPointInStroke(x, y);
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
    ellipse: function (d) {
        var dc = c2d.getContext(d);
        var x = jsi.readFloat(d, 4);
        var y = jsi.readFloat(d, 8);
        var rx = jsi.readFloat(d, 12);
        var ry = jsi.readFloat(d, 16);
        var ro = jsi.readFloat(d, 20);
        var s = jsi.readFloat(d, 24);
        var e = jsi.readFloat(d, 28);
        var a = jsi.readInt32(d, 32);
        dc.ellipse(x, y, rx, ry, ro, s, e, a !== 0);
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
    rotateAt: function (d) {
        var dc = c2d.getContext(d);
        var x = jsi.readFloat(d, 4);
        var y = jsi.readFloat(d, 8);
        var a = jsi.readFloat(d, 12);
        dc.translate(x, y);
        dc.rotate(a);
        dc.translate(-x, -y);
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
    resetTransform: function (d) {
        var dc = c2d.getContext(d);
        dc.setTransform(1, 0, 0, 1, 0, 0);
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