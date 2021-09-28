using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.JSInterop;
using Microsoft.JSInterop.WebAssembly;

namespace UmCanvas
{
    /// <summary>
    /// Provide the basic unmarshalled interop invoking methods to a HTML5 canvas.
    /// Use ValueTuple to pass the arguments as struct easily
    /// </summary>
    public abstract class Canvas
    {
        private readonly string _id;
        private int _width;
        private int _height;

        /// <param name="id">the id of HTML 5 Canvas in DOM</param>
        public Canvas(string id)
        {
            _id = id;
            _width = InvokeRet<int>("umc.getWidth");
            _height = InvokeRet<int>("umc.getHeight");
        }

        public string Id
        {
            get { return _id; }
        }

        //get the width of the canvas
        public int Width
        {
            get { return _width; }
        }

        //get the height of the canvas
        public int Height
        {
            get { return _height; }
        }

        /// <summary>
        /// Release from CanvasOnWindowResizedAsync
        /// Release the cached 2d context of the HTML5 canvas in javascript
        /// </summary>
        public virtual void Release()
        {
            lock (_dictCanvasOnWndResized)
            {
                _dictCanvasOnWndResized.Remove(Id);
            }
        }

        /// <summary>
        /// set the width height of the canvas to its client size
        /// Need to do this manually because Blazor doesn't allow to put script element inside a component, 
        /// see https://go.microsoft.com/fwlink/?linkid=872131
        /// </summary>
        /// <param name="onWndResized">the action to excute after javascript window.onResized.</param>
        public void Size2Client(Action onWndResized)
        {
            Invoke("umc.size2Client", null != onWndResized ? 1 : 0);
            lock (_dictCanvasOnWndResized)
            {
                if (null != onWndResized)
                {
                    _dictCanvasOnWndResized.TryGetValue(Id, out Action old);
                    if (old != onWndResized)
                        _dictCanvasOnWndResized[Id] = onWndResized;
                }
                else
                {
                    _dictCanvasOnWndResized.Remove(Id);
                }
            }
            _width = InvokeRet<int>("umc.getWidth");
            _height = InvokeRet<int>("umc.getHeight");
        }

        private static Dictionary<string, Action> _dictCanvasOnWndResized = new Dictionary<string, Action>();
        /// <summary>
        /// be called from Javascript window.onResize
        /// </summary>
        [JSInvokable]
        public static async void CanvasOnWindowResizedAsync()
        {
            await Task.Run(() =>
            {
                lock (_dictCanvasOnWndResized)
                {
                    foreach (Action act in _dictCanvasOnWndResized.Values.ToArray())
                        act();
                }
            });
        }

        #region invoke statistics
        private Dictionary<string, int> _invokeTimes;

        [Conditional("DEBUG")]
        public void ResetInvokeTimes()
        {
            if (null != _invokeTimes)
                _invokeTimes.Clear();
        }

        [Conditional("DEBUG")]
        private void IncreaseInvokeTimes(string identifier)
        {
            if (null == _invokeTimes)
                _invokeTimes = new Dictionary<string, int>();
            if (!_invokeTimes.ContainsKey(identifier))
                _invokeTimes[identifier] = 1;
            else
                _invokeTimes[identifier]++;
        }

        [Conditional("DEBUG")]
        public void DumpInvokeTimes()
        {
            var sb = new StringBuilder("c2d Invokes: ");
            int cnt = 0;
            if (null != _invokeTimes)
            {
                foreach (var kvp in _invokeTimes.OrderByDescending(k => k.Value))
                {
                    sb.Append(kvp.Key);
                    sb.Append(":");
                    sb.Append(kvp.Value);
                    sb.Append(";");
                    cnt += kvp.Value;
                }
            }
            sb.Append("Total:");
            sb.Append(cnt);
            Console.WriteLine(sb.ToString());
        }
        #endregion

        #region unmarshalled invoke methods
        private sealed class MyWebAssemblyJSRuntime : WebAssemblyJSRuntime
        {

        }
        private static readonly WebAssemblyJSRuntime _runtime = new MyWebAssemblyJSRuntime();
        private static WebAssemblyJSRuntime Runtime
        {
            get { return _runtime; }
        }

        public void Invoke(string identifier)
        {
            InvokeRet<object>(identifier);
        }

        public TRes InvokeRet<TRes>(string identifier)
        {
            IncreaseInvokeTimes(identifier);
            return Runtime.InvokeUnmarshalled<ValueTuple<string>, TRes>(identifier, ValueTuple.Create(Id));
        }

        public void Invoke<T0>(string identifier, T0 arg0)
        {
            InvokeRet<T0, object>(identifier, arg0);
        }

        public TRes InvokeRet<T0, TRes>(string identifier, T0 arg0)
        {
            IncreaseInvokeTimes(identifier);
            return Runtime.InvokeUnmarshalled<ValueTuple<string, T0>, TRes>(identifier, ValueTuple.Create(Id, arg0));
        }

        public void Invoke<T0, T1>(string identifier, T0 arg0, T1 arg1)
        {
            InvokeRet<T0, T1, object>(identifier, arg0, arg1);
        }

        public TRes InvokeRet<T0, T1, TRes>(string identifier, T0 arg0, T1 arg1)
        {
            IncreaseInvokeTimes(identifier);
            return Runtime.InvokeUnmarshalled<ValueTuple<string, T0, T1>, TRes>(identifier, ValueTuple.Create(Id, arg0, arg1));
        }

        public void Invoke<T0, T1, T2>(string identifier, T0 arg0, T1 arg1, T2 arg2)
        {
            InvokeRet<T0, T1, T2, object>(identifier, arg0, arg1, arg2);
        }

        public TRes InvokeRet<T0, T1, T2, TRes>(string identifier, T0 arg0, T1 arg1, T2 arg2)
        {
            IncreaseInvokeTimes(identifier);
            return Runtime.InvokeUnmarshalled<ValueTuple<string, T0, T1, T2>, TRes>(identifier, ValueTuple.Create(Id, arg0, arg1, arg2));
        }

        public void Invoke<T0, T1, T2, T3>(string identifier, T0 arg0, T1 arg1, T2 arg2, T3 arg3)
        {
            InvokeRet<T0, T1, T2, T3, object>(identifier, arg0, arg1, arg2, arg3);
        }

        public TRes InvokeRet<T0, T1, T2, T3, TRes>(string identifier, T0 arg0, T1 arg1, T2 arg2, T3 arg3)
        {
            IncreaseInvokeTimes(identifier);
            return Runtime.InvokeUnmarshalled<ValueTuple<string, T0, T1, T2, T3>, TRes>(identifier, ValueTuple.Create(Id, arg0, arg1, arg2, arg3));
        }

        public void Invoke<T0, T1, T2, T3, T4>(string identifier, T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            InvokeRet<T0, T1, T2, T3, T4, object>(identifier, arg0, arg1, arg2, arg3, arg4);
        }

        public TRes InvokeRet<T0, T1, T2, T3, T4, TRes>(string identifier, T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4)
        {
            IncreaseInvokeTimes(identifier);
            return Runtime.InvokeUnmarshalled<ValueTuple<string, T0, T1, T2, T3, T4>, TRes>(identifier, ValueTuple.Create(Id, arg0, arg1, arg2, arg3, arg4));
        }

        public void Invoke<T0, T1, T2, T3, T4, T5>(string identifier, T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5)
        {
            InvokeRet<T0, T1, T2, T3, T4, T5, object>(identifier, arg0, arg1, arg2, arg3, arg4, arg5);
        }

        public TRes InvokeRet<T0, T1, T2, T3, T4, T5, TRes>(string identifier, T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5)
        {
            IncreaseInvokeTimes(identifier);
            return Runtime.InvokeUnmarshalled<ValueTuple<string, T0, T1, T2, T3, T4, T5>, TRes>(identifier, ValueTuple.Create(Id, arg0, arg1, arg2, arg3, arg4, arg5));
        }

        public void Invoke<T0, T1, T2, T3, T4, T5, T6>(string identifier, T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6)
        {
            InvokeRet<T0, T1, T2, T3, T4, T5, T6, object>(identifier, arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        }

        private struct ArgStruct8<T0, T1, T2, T3, T4, T5, T6, T7>
        {
            public T0 Arg0;
            public T1 Arg1;
            public T2 Arg2;
            public T3 Arg3;
            public T4 Arg4;
            public T5 Arg5;
            public T6 Arg6;
            public T7 Arg7;
        }

        public TRes InvokeRet<T0, T1, T2, T3, T4, T5, T6, TRes>(string identifier, T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6)
        {
            IncreaseInvokeTimes(identifier);
            ArgStruct8<string, T0, T1, T2, T3, T4, T5, T6> arg = new ArgStruct8<string, T0, T1, T2, T3, T4, T5, T6>()
            {
                Arg0 = Id,
                Arg1 = arg0,
                Arg2 = arg1,
                Arg3 = arg2,
                Arg4 = arg3,
                Arg5 = arg4,
                Arg6 = arg5,
                Arg7 = arg6,
            };
            return Runtime.InvokeUnmarshalled<ArgStruct8<string, T0, T1, T2, T3, T4, T5, T6>, TRes>(identifier, arg);
        }

        public void Invoke<T0, T1, T2, T3, T4, T5, T6, T7>(string identifier, T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, T7 arg7)
        {
            InvokeRet<T0, T1, T2, T3, T4, T5, T6, T7, object>(identifier, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
        }

        private struct ArgStruct9<T0, T1, T2, T3, T4, T5, T6, T7, T8>
        {
            public T0 Arg0;
            public T1 Arg1;
            public T2 Arg2;
            public T3 Arg3;
            public T4 Arg4;
            public T5 Arg5;
            public T6 Arg6;
            public T7 Arg7;
            public T8 Arg8;
        }

        public TRes InvokeRet<T0, T1, T2, T3, T4, T5, T6, T7, TRes>(string identifier, T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, T7 arg7)
        {
            IncreaseInvokeTimes(identifier);
            ArgStruct9<string, T0, T1, T2, T3, T4, T5, T6, T7> arg = new ArgStruct9<string, T0, T1, T2, T3, T4, T5, T6, T7>()
            {
                Arg0 = Id,
                Arg1 = arg0,
                Arg2 = arg1,
                Arg3 = arg2,
                Arg4 = arg3,
                Arg5 = arg4,
                Arg6 = arg5,
                Arg7 = arg6,
                Arg8 = arg7,
            };
            return Runtime.InvokeUnmarshalled<ArgStruct9<string, T0, T1, T2, T3, T4, T5, T6, T7>, TRes>(identifier, arg);
        }

        public void Invoke<T0, T1, T2, T3, T4, T5, T6, T7, T8>(string identifier, T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, T7 arg7, T8 arg8)
        {
            InvokeRet<T0, T1, T2, T3, T4, T5, T6, T7, T8, object>(identifier, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
        }

        private struct ArgStruct10<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>
        {
            public T0 Arg0;
            public T1 Arg1;
            public T2 Arg2;
            public T3 Arg3;
            public T4 Arg4;
            public T5 Arg5;
            public T6 Arg6;
            public T7 Arg7;
            public T8 Arg8;
            public T9 Arg9;
        }

        public TRes InvokeRet<T0, T1, T2, T3, T4, T5, T6, T7, T8, TRes>(string identifier, T0 arg0, T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, T7 arg7, T8 arg8)
        {
            IncreaseInvokeTimes(identifier);
            ArgStruct10<string, T0, T1, T2, T3, T4, T5, T6, T7, T8> arg = new ArgStruct10<string, T0, T1, T2, T3, T4, T5, T6, T7, T8>()
            {
                Arg0 = Id,
                Arg1 = arg0,
                Arg2 = arg1,
                Arg3 = arg2,
                Arg4 = arg3,
                Arg5 = arg4,
                Arg6 = arg5,
                Arg7 = arg6,
                Arg8 = arg7,
                Arg9 = arg8,
            };
            return Runtime.InvokeUnmarshalled<ArgStruct10<string, T0, T1, T2, T3, T4, T5, T6, T7, T8>, TRes>(identifier, arg);
        }
        #endregion
    }
}
