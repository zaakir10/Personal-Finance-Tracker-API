import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useTheme } from '../hooks/useTheme';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const CashFlowChart = ({ data }) => {
  const { isDark } = useTheme();

  const tooltipStyle = {
    background: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(12px)',
    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
    borderRadius: '1.5rem',
    boxShadow: isDark ? '0 20px 25px -5px rgba(0,0,0,0.5)' : '0 20px 25px -5px rgba(0,0,0,0.1)',
  };

  const axisColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';
  const gridColor = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)';
  const labelColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <div className="bg-transparent space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg sm:text-xl font-black text-text-main tracking-tight">Financial Flow</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Expenses</span>
          </div>
        </div>
      </div>
      
      <div className="h-[220px] sm:h-[260px] md:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="8 8" stroke={gridColor} vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke={axisColor}
              tick={{ fill: labelColor, fontSize: 10, fontWeight: 'bold' }}
              tickMargin={12} 
              axisLine={false}
              tickLine={false}
              fontFamily="inherit"
            />
            <YAxis 
              stroke={axisColor}
              tick={{ fill: labelColor, fontSize: 10, fontWeight: 'bold' }}
              tickMargin={8}
              axisLine={false}
              tickLine={false}
              fontFamily="inherit"
              tickFormatter={(value) => `$${value}`}
              width={40}
            />
            <Tooltip 
              contentStyle={tooltipStyle}
              itemStyle={{ color: isDark ? '#fff' : '#0f172a', fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '11px' }}
              cursor={{ stroke: 'rgba(99, 102, 241, 0.2)', strokeWidth: 2 }}
            />
            <Area 
              name="Income"
              type="monotone" 
              dataKey="income" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorIncome)" 
              animationDuration={2000}
            />
            <Area 
              name="Expense"
              type="monotone" 
              dataKey="expense" 
              stroke="#ef4444" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorExpense)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const CategoryChart = ({ data }) => {
  const { isDark } = useTheme();

  const tooltipStyle = {
    background: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(12px)',
    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
    borderRadius: '1.5rem',
    boxShadow: isDark ? '0 20px 25px -5px rgba(0,0,0,0.5)' : '0 20px 25px -5px rgba(0,0,0,0.1)',
  };

  return (
    <div className="bg-transparent space-y-4 sm:space-y-6">
      <h3 className="text-lg sm:text-xl font-black text-text-main tracking-tight">Distribution</h3>
      <div className="h-[240px] sm:h-[280px] md:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={65}
              outerRadius={85}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={tooltipStyle}
              itemStyle={{ color: isDark ? '#fff' : '#0f172a', fontSize: '12px', fontWeight: 'bold' }}
            />
            <Legend 
              verticalAlign="bottom" 
              align="center"
              iconType="circle"
              formatter={(value) => (
                <span style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
