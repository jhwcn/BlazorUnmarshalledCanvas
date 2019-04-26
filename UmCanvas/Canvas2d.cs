using System;

namespace UmCanvas
{
    public enum TextAlign { Start, Left, Right, Center, End }

    public enum TextBaseline { Alphabetic, Top, Hanging, Middle, Ideographic, Bottom }

    /// <summary>
    /// Provides invoking methods to the "2d" context of the HTML5 canvas.
    /// </summary>
    public class Canvas2d : Canvas
    {
        public Canvas2d(string id)
            : base(id)
        {
        }

        public override void Release()
        {
            Invoke("c2d.release");
        }

        private string _fillStyle;
        public string FillStyle
        {
            get
            {
                if (null == _fillStyle)
                    _fillStyle = InvokeRet<string>("c2d.getFillStyle");
                return _fillStyle;
            }
            set
            {
                if (_fillStyle == value)
                    return;
                _fillStyle = value;
                Invoke("c2d.setFillStyle", value);
            }
        }

        private string _strokeStyle;
        public string StrokeStyle
        {
            get
            {
                if (null == _strokeStyle)
                    _strokeStyle = InvokeRet<string>("c2d.getStrokeStyle");
                return _strokeStyle;
            }
            set
            {
                if (_strokeStyle == value)
                    return;
                _strokeStyle = value;
                Invoke("c2d.setStrokeStyle", value);
            }
        }

        private string _font;
        public string Font
        {
            get
            {
                if (null == _font)
                    _font = InvokeRet<string>("c2d.getFont");
                return _font;
            }
            set
            {
                if (_font == value)
                    return;
                _font = value;
                Invoke("c2d.setFont", value);
            }
        }

        private TextAlign? _textAlign;
        public TextAlign TextAlign
        {
            get
            {
                if (null == _textAlign)
                {
                    string str = InvokeRet<string>("c2d.getTextAlign");
                    Enum.TryParse(str, true, out TextAlign ret);
                    _textAlign = ret;
                }
                return _textAlign.Value;
            }
            set
            {
                if (_textAlign == value)
                    return;
                _textAlign = value;
                Invoke("c2d.setTextAlign", value.ToString().ToLower());
            }
        }

        private TextBaseline? _textBaseline;
        public TextBaseline TextBaseline
        {
            get
            {
                if (null == _textBaseline)
                {
                    string str = InvokeRet<string>("c2d.getTextBaseline");
                    Enum.TryParse(str, true, out TextBaseline ret);
                    _textBaseline = ret;
                }
                return _textBaseline.Value;
            }
            set
            {
                if (_textBaseline == value)
                    return;
                _textBaseline = value;
                Invoke("c2d.setTextBaseline", value.ToString().ToLower());
            }
        }

        private float? _lineWidth;
        public float LineWidth
        {
            get
            {
                if (null == _lineWidth)
                {
                    string str = InvokeRet<string>("c2d.getLineWidth");
                    float.TryParse(str, out float width);
                    _lineWidth = width;
                }
                return _lineWidth.Value;
            }
            set
            {
                if (_lineWidth == value)
                    return;
                _lineWidth = value;
                Invoke("c2d.setLineWidth", value);
            }
        }

        private float? _globalAlpha;
        public float GlobalAlpha
        {
            get
            {
                if (null == _globalAlpha)
                {
                    string str = InvokeRet<string>("c2d.getGlobalAlpha");
                    float.TryParse(str, out float ga);
                    _globalAlpha = ga;
                }
                return _globalAlpha.Value;
            }
            set
            {
                if (_globalAlpha == value)
                    return;
                _globalAlpha = value;
                Invoke("c2d.setGlobalAlpha", value);
            }
        }

        public void ClearRect(double x, double y, double width, double height)
        {
            ClearRect((float)x, (float)y, (float)width, (float)height);
        }

        public void ClearRect(float x, float y, float width, float height)
        {
            Invoke("c2d.clearRect", x, y, width, height);
        }

        public void FillRect(double x, double y, double width, double height)
        {
            FillRect((float)x, (float)y, (float)width, (float)height);
        }

        public void FillRect(float x, float y, float width, float height)
        {
            Invoke("c2d.fillRect", x, y, width, height);
        }

        public void StrokeRect(double x, double y, double width, double height)
        {
            StrokeRect((float)x, (float)y, (float)width, (float)height);
        }

        public void StrokeRect(float x, float y, float width, float height)
        {
            Invoke("c2d.strokeRect", x, y, width, height);
        }

        public void FillText(string text, double x, double y, double? maxWidth = null)
        {
            float? fmw = null;
            if (null != maxWidth)
                fmw = (float)maxWidth.Value;
            FillText(text, (float)x, (float)y, fmw);
        }

        public void FillText(string text, float x, float y, float? maxWidth = null)
        {
            if (null == maxWidth)
                Invoke("c2d.fillText", text, x, y);
            else
                Invoke("c2d.fillText1", text, x, y, maxWidth.Value);
        }

        public void StrokeText(string text, double x, double y, double? maxWidth = null)
        {
            float? fmw = null;
            if (null != maxWidth)
                fmw = (float)maxWidth.Value;
            StrokeText(text, (float)x, (float)y, fmw);
        }

        public void StrokeText(string text, float x, float y, float? maxWidth = null)
        {
            if (null == maxWidth)
                Invoke("c2d.strokeText", text, x, y);
            else
                Invoke("c2d.strokeText1", text, x, y, maxWidth.Value);
        }

        public float MeasureText(string text)
        {
            string ret = InvokeRet<string, string>("c2d.measureText", text);
            float width;
            float.TryParse(ret, out width);
            return width;
        }

        private static float[] _emptyLineDash = new float[0];
        public float[] GetLineDash()
        {
            string str = InvokeRet<string>("c2d.getLineDash");
            if (string.IsNullOrEmpty(str))
                return _emptyLineDash;
            string[] strs = str.Split(',');
            int cnt = 0;
            foreach (string ds in strs)
            {
                if (float.TryParse(ds, out float tmp))
                    cnt++;
            }
            if (cnt == 0)
                return _emptyLineDash;
            float[] ret = new float[cnt];
            cnt = 0;
            foreach (string ds in strs)
            {
                if (float.TryParse(ds, out float tmp))
                {
                    ret[cnt] = tmp;
                    cnt++;
                }
            }
            return ret;
        }

        public void SetLineDash(float[] segments)
        {
            Invoke("c2d.setLineDash", segments);
        }

        public void BeginPath()
        {
            Invoke("c2d.beginPath");
        }

        public void ClosePath()
        {
            Invoke("c2d.closePath");
        }

        public void MoveTo(double x, double y)
        {
            MoveTo((float)x, (float)y);
        }

        public void MoveTo(float x, float y)
        {
            Invoke("c2d.moveTo", x, y);
        }

        public void LineTo(double x, double y)
        {
            LineTo((float)x, (float)y);
        }

        public void LineTo(float x, float y)
        {
            Invoke("c2d.lineTo", x, y);
        }

        public void BezierCurveTo(double cp1X, double cp1Y, double cp2X, double cp2Y, double x, double y)
        {
            BezierCurveTo((float)cp1X, (float)cp1Y, (float)cp2X, (float)cp2Y, (float)x, (float)y);
        }

        public void BezierCurveTo(float cp1X, float cp1Y, float cp2X, float cp2Y, float x, float y)
        {
            Invoke("c2d.bezierCurveTo", cp1X, cp1Y, cp2X, cp2Y, x, y);
        }

        public void QuadraticCurveTo(double cpx, double cpy, double x, double y)
        {
            QuadraticCurveTo((float)cpx, (float)cpy, (float)x, (float)y);
        }

        public void QuadraticCurveTo(float cpx, float cpy, float x, float y)
        {
            Invoke("c2d.quadraticCurveTo", cpx, cpy, x, y);
        }

        public void Arc(double x, double y, double radius, double startAngle, double endAngle, bool? anticlockwise = null)
        {
            Arc((float)x, (float)y, (float)radius, (float)startAngle, (float)endAngle, anticlockwise);
        }

        public void Arc(float x, float y, float radius, float startAngle, float endAngle, bool? anticlockwise = null)
        {
            Invoke("c2d.arc", x, y, radius, startAngle, endAngle, anticlockwise == true ? 1 : 0);
        }

        public void ArcTo(double x1, double y1, double x2, double y2, double radius)
        {
            ArcTo((float)x1, (float)y1, (float)x2, (float)y2, (float)radius);
        }

        public void ArcTo(float x1, float y1, float x2, float y2, float radius)
        {
            Invoke("c2d.arcTo", x1, y1, x2, y2, radius);
        }

        public void Rect(double x, double y, double width, double height)
        {
            Rect((float)x, (float)y, (float)width, (float)height);
        }

        public void Rect(float x, float y, float width, float height)
        {
            Invoke("c2d.rect", x, y, width, height);
        }

        public void Fill()
        {
            Invoke("c2d.fill");
        }

        public void Stroke()
        {
            Invoke("c2d.stroke");
        }

        public void Clip()
        {
            Invoke("c2d.clip");
        }

        public void Rotate(double angle)
        {
            Rotate((float)angle);
        }

        public void Rotate(float angle)
        {
            Invoke("c2d.rotate", angle);
        }

        public void Scale(double x, double y)
        {
            Scale((float)x, (float)y);
        }

        public void Scale(float x, float y)
        {
            Invoke("c2d.scale", x, y);
        }

        public void Translate(double x, double y)
        {
            Translate((float)x, (float)y);
        }

        public void Translate(float x, float y)
        {
            Invoke("c2d.translate", x, y);
        }

        public void Transform(double m11, double m12, double m21, double m22, double dx, double dy)
        {
            Transform((float)m11, (float)m12, (float)m21, (float)m22, (float)dx, (float)dy);
        }

        public void Transform(float m11, float m12, float m21, float m22, float dx, float dy)
        {
            Invoke("c2d.transform", m11, m12, m21, m22, dx, dy);
        }

        public void SetTransform(double m11, double m12, double m21, double m22, double dx, double dy)
        {
            SetTransform((float)m11, (float)m12, (float)m21, (float)m22, (float)dx, (float)dy);
        }

        public void SetTransform(float m11, float m12, float m21, float m22, float dx, float dy)
        {
            Invoke("c2d.setTransform", m11, m12, m21, m22, dx, dy);
        }

        public void Save()
        {
            Invoke("c2d.save");
        }

        public void Restore()
        {
            Invoke("c2d.restore");
        }
    }
}
