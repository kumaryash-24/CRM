
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Sector
} from 'recharts';
import { ServiceRequestData, RevenueData, SatisfactionData, TechnicianWorkload } from '../../types';

const COLORS = ['#0ea5e9', '#14b8a6', '#f97316'];

export const ServiceRequestChart: React.FC<{ data: ServiceRequestData[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
      <XAxis dataKey="name" stroke="#6b7280" />
      <YAxis stroke="#6b7280" />
      <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '0.5rem' }} />
      <Legend />
      <Line type="monotone" dataKey="requests" stroke="#0ea5e9" strokeWidth={2} activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

export const RevenueChart: React.FC<{ data: RevenueData[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
      <XAxis dataKey="name" stroke="#6b7280" />
      <YAxis stroke="#6b7280" />
      <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '0.5rem' }} />
      <Legend />
      <Bar dataKey="revenue" fill="#14b8a6" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg">{payload.name}</text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} Responses`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">{`(Rate ${(percent * 100).toFixed(2)}%)`}</text>
    </g>
  );
};


export const SatisfactionPieChart: React.FC<{ data: SatisfactionData[] }> = ({ data }) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const onPieEnter = React.useCallback((_: any, index: number) => {
        setActiveIndex(index);
    }, [setActiveIndex]);
    
    return (
        <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie 
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data} 
                cx="50%" 
                cy="50%" 
                innerRadius={60}
                outerRadius={80} 
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
            >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
        </PieChart>
        </ResponsiveContainer>
    );
};

export const TechnicianWorkloadChart: React.FC<{ data: TechnicianWorkload[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
      <XAxis type="number" stroke="#6b7280" />
      <YAxis type="category" dataKey="name" stroke="#6b7280" width={80} />
      <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '0.5rem' }} />
      <Legend />
      <Bar dataKey="completed" stackId="a" fill="#0ea5e9" name="Completed Jobs" radius={[0, 4, 4, 0]} />
      <Bar dataKey="pending" stackId="a" fill="#f97316" name="Pending Jobs" radius={[4, 0, 0, 4]} />
    </BarChart>
  </ResponsiveContainer>
);

export const MiniLineChart: React.FC<{ data: any[], dataKey: string, stroke: string }> = ({ data, dataKey, stroke }) => (
    <ResponsiveContainer width="100%" height={100}>
      <LineChart data={data}>
        <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '0.5rem' }} />
        <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
);
