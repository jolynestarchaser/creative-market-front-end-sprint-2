import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const ProductBreakdown = ({ items, totalItems }) => {
  return (
    <article className="rounded-2xl bg-white p-5 md:p-6">
      <h2 className="text-lg font-bold text-gray-900">
        ยอดขายจำแนกตาม Category
      </h2>

      <div className="mt-6 flex justify-center">
        <div className="relative h-44 w-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={items}
                dataKey="value"
                nameKey="label"
                innerRadius={50}
                outerRadius={74}
                paddingAngle={4}
                cornerRadius={8}
                stroke="none"
              >
                {items.map((item) => (
                  <Cell key={item.label} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{totalItems}</span>
            <span className="text-sm text-gray-400">items</span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-600">{item.label}</span>
            </div>
            <span className="font-semibold text-gray-900">{item.sold}</span>
          </div>
        ))}
      </div>
    </article>
  );
};

export default ProductBreakdown;
