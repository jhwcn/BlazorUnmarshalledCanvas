//please refer to https://github.com/dotnet/aspnetcore/blob/master/src/Components/Web.JS/src/Platform/Platform.ts

window.jsi = {
    toJSStr: function (arg) {
        return Blazor.platform.toJavaScriptString(arg);
    },
    toDotNetStr: function (arg) {
        return BINDING.js_to_mono_obj(arg);
    },

    getArrLen: function (array) {
        return Blazor.platform.getArrayLength(array);
    },
    getArrEntry: function (array) {
        return Blazor.platform.getArrayEntryPtr(array);
    },
    readInt16: function (baseAddress, fieldOffset) {
        return Blazor.platform.readInt16Field(baseAddress, fieldOffset);
    },
    readInt32: function (baseAddress, fieldOffset) {
        return Blazor.platform.readInt32Field(baseAddress, fieldOffset);
    },
    readUInt64: function (baseAddress, fieldOffset) {
        return Blazor.platform.readUInt64Field(baseAddress, fieldOffset);
    },
    readFloat: function (baseAddress, fieldOffset) {
        return Blazor.platform.readFloatField(baseAddress, fieldOffset);
    },
    readObject: function (baseAddress, fieldOffset) {
        return Blazor.platform.readObjectField(baseAddress, fieldOffset);
    },
    readString: function (baseAddress, fieldOffset) {
        return Blazor.platform.readStringField(baseAddress, fieldOffset);
    },
    readStruct: function (baseAddress, fieldOffset) {
        return Blazor.platform.readStructField(baseAddress, fieldOffset);
    },
};