'use client';

import { useEffect, useState } from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import AnimatedTitle from './AnimatedTitle';
import AreaChartComponentImu from './AreaChartImu';

function GridItem({ title, children }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-4 bg-blue-75 unded-xl h-[800px] md:h-[400px]  my-28 gap-y-14">
            {children}
        </div>
    );
}


const Charts = () => {
    return (
        <div className='pt-10'>
            <AnimatedTitle
                title="Let&apos;s ch<b>e</b>ck some d<b>a</b>ta"
                containerClass="mt-5 !text-black text-center"
            />
            <GridItem >
                <AreaChartComponentSpeed />
                <AreaChartComponentImu />
            </GridItem>
        </div>
    )
}

export default Charts


const AreaChartComponentSpeed = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/speed');
                const result = await response.json();
                const filteredData = result.filter(row => row.speed !== -333)

                const formattedData = filteredData.map((row) => ({
                    timestamp: new Date(row.timestamp * 1000).toLocaleTimeString(),
                    speed: row.speed,
                    yaw_rate: row.yaw_rate,
                    v_front_left: row.v_front_left,
                    v_front_right: row.v_front_right,
                    v_rear_left: row.v_rear_left,
                    v_rear_right: row.v_rear_right,
                }));

                setData(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{ right: 30 }}
            >
                <YAxis />
                <XAxis dataKey="timestamp" />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <Area
                    type="monotone"
                    dataKey="speed"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    stackId="1"
                />

                <Area
                    type="monotone"
                    dataKey="yaw_rate"
                    stroke="#7c3aed"
                    fill="#8b5cf6"
                    stackId="1"
                />

                <Area
                    type="monotone"
                    dataKey="v_front_left"
                    stroke="#34d399"
                    fill="#6ee7b7"
                    stackId="1"
                />

                <Area
                    type="monotone"
                    dataKey="v_front_right"
                    stroke="#f59e0b"
                    fill="#fbbf24"
                    stackId="1"
                />

                <Area
                    type="monotone"
                    dataKey="v_rear_left"
                    stroke="#ef4444"
                    fill="#f87171"
                    stackId="1"
                />

                <Area
                    type="monotone"
                    dataKey="v_rear_right"
                    stroke="#9333ea"
                    fill="#c084fc"
                    stackId="1"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg">{label}</p>
                <p className="text-sm text-blue-400">
                    Speed:
                    <span className="ml-2">{payload[0].value}</span>
                </p>
                <p className="text-sm text-indigo-400">
                    Yaw Rate:
                    <span className="ml-2">{payload[1].value}</span>
                </p>
                <p className="text-sm text-green-400">
                    Front Left Speed:
                    <span className="ml-2">{payload[2].value}</span>
                </p>
                <p className="text-sm text-yellow-400">
                    Front Right Speed:
                    <span className="ml-2">{payload[3].value}</span>
                </p>
                <p className="text-sm text-red-400">
                    Rear Left Speed:
                    <span className="ml-2">{payload[4].value}</span>
                </p>
                <p className="text-sm text-purple-400">
                    Rear Right Speed:
                    <span className="ml-2">{payload[5].value}</span>
                </p>
            </div>
        );
    }

    return null;
};


