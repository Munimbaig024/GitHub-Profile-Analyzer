import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = [
  '#aa3bff', // primary accent
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // yellow
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#14b8a6', // teal
];

const LanguageChart = ({ repos }) => {
  const data = useMemo(() => {
    if (!repos) return [];

    // Calculate language frequencies
    const langCounts = repos.reduce((acc, repo) => {
      const lang = repo.language;
      if (lang) {
        acc[lang] = (acc[lang] || 0) + 1;
      }
      return acc;
    }, {});

    // Format for recharts, sort by count descending, and take top 8
    return Object.keys(langCounts)
      .map((key) => ({ name: key, value: langCounts[key] }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [repos]);

  if (data.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">Top Languages</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
                color: 'hsl(var(--foreground))'
              }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LanguageChart;
