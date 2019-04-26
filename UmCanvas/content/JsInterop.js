//please refer to https://github.com/aspnet/AspNetCore/blob/master/src/Components/Browser.JS/src/Platform/Platform.ts

window.jsi = {
    toJSStr: Blazor.platform.toJavaScriptString,
    toDotNetStr: Blazor.platform.toDotNetString,

    getArrLen: Blazor.platform.getArrayLength,
    getArrEntry: Blazor.platform.getArrayEntryPtr,

    readInt32: Blazor.platform.readInt32Field,
    readFloat: Blazor.platform.readFloatField,
    readObject: Blazor.platform.readObjectField,
    readString: Blazor.platform.readStringField,
    readStruct: Blazor.platform.readStructField
};