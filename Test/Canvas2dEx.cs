using UmCanvas;

namespace Test
{
    public static class Canvas2dEx
    {
        public static void DrawLine(this Canvas2d canvas, double x1, double y1, double x2, double y2)
        {
            DrawLine(canvas, (float)x1, (float)y1, (float)x2, (float)y2);
        }
        public static void DrawLine(this Canvas2d canvas, float x1, float y1, float x2, float y2)
        {
            canvas.Invoke("c2de.drawLine", x1, y1, x2, y2);
        }

        public static void DrawArc(this Canvas2d canvas, double x, double y, double radius, double startAngle, double endAngle, bool? anticlockwise = null)
        {
            DrawArc(canvas, (float)x, (float)y, (float)radius, (float)startAngle, (float)endAngle, anticlockwise);
        }

        public static void DrawArc(this Canvas2d canvas, float x, float y, float radius, float startAngle, float endAngle, bool? anticlockwise = null)
        {
            canvas.Invoke("c2de.drawArc", x, y, radius, startAngle, endAngle, anticlockwise == true ? 1 : 0);
        }
    }
}