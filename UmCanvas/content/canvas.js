window.umc = {
    size2Client: function (d) {
        var id = jsi.readString(d, 0);
        var c = document.getElementById(id);
        c.width = c.clientWidth;
        c.height = c.clientHeight;
        var auto = jsi.readInt32(d, 4);
        if (auto)
            umc.registerWindowResize();
    },
    registerWindowResize: function () {
        if (umc.resizeRegistered)
            return;
        umc.resizeRegistered = true;
        umc.resizeTaskId = null;
        window.addEventListener('resize', evt => {
            if (umc.resizeTaskId !== null) {
                clearTimeout(umc.resizeTaskId);
            }

            umc.resizeTaskId = setTimeout(() => {
                umc.resizeTaskId = null;
                umc.actualResize(evt);
            }, 50);
        });
    },
    actualResize: function (evt) {
        DotNet.invokeMethodAsync('UmCanvas', 'CanvasOnWindowResizedAsync');
    },

    getWidth: function (d) {
        var id = jsi.readString(d, 0);
        var c = document.getElementById(id);
        return c.width;
    },
    getHeight: function (d) {
        var id = jsi.readString(d, 0);
        var c = document.getElementById(id);
        return c.height;
    }
};