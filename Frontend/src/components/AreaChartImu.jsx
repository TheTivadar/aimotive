"use client"
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AreaChartComponentImu = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/imu');
                const result = await response.json();
                const filteredData = result.filter(row => row.conf_gyro > -333);
                const formattedData = filteredData.map((row) => ({
                    timestamp: new Date(row.timestamp * 1000).toLocaleTimeString(),
                    gyro_x: row.gyro_x,
                    gyro_y: row.gyro_y,
                    gyro_z: row.gyro_z,
                    acc_x: row.acc_x,
                    acc_y: row.acc_y,
                    acc_z: row.acc_z,
                    conf_gyro: row.conf_gyro,
                    conf_acc: row.conf_acc,
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
                <Tooltip content={<CustomTooltip2 />} />
                <Legend />

                <Area
                    type="monotone"
                    dataKey="gyro_x"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    stackId="1"
                />
                <Area
                    type="monotone"
                    dataKey="gyro_y"
                    stroke="#7c3aed"
                    fill="#8b5cf6"
                    stackId="1"
                />
                <Area
                    type="monotone"
                    dataKey="gyro_z"
                    stroke="#34d399"
                    fill="#6ee7b7"
                    stackId="1"
                />
                <Area
                    type="monotone"
                    dataKey="acc_x"
                    stroke="#f59e0b"
                    fill="#fbbf24"
                    stackId="1"
                />
                <Area
                    type="monotone"
                    dataKey="acc_y"
                    stroke="#ef4444"
                    fill="#f87171"
                    stackId="1"
                />
                <Area
                    type="monotone"
                    dataKey="acc_z"
                    stroke="#9333ea"
                    fill="#c084fc"
                    stackId="1"
                />
                <Area
                    type="monotone"
                    dataKey="conf_gyro"
                    stroke="#38bdf8"
                    fill="#bfdbfe"
                    stackId="1"
                />
                <Area
                    type="monotone"
                    dataKey="conf_acc"
                    stroke="#22c55e"
                    fill="#a7f3d0"
                    stackId="1"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};
export default AreaChartComponentImu

const CustomTooltip2 = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg">{label}</p>
                <p className="text-sm text-blue-400">
                    Gyro X:
                    <span className="ml-2">{payload[0].value}</span>
                </p>
                <p className="text-sm text-indigo-400">
                    Gyro Y:
                    <span className="ml-2">{payload[1].value}</span>
                </p>
                <p className="text-sm text-green-400">
                    Gyro Z:
                    <span className="ml-2">{payload[2].value}</span>
                </p>
                <p className="text-sm text-yellow-400">
                    Acc X:
                    <span className="ml-2">{payload[3].value}</span>
                </p>
                <p className="text-sm text-red-400">
                    Acc Y:
                    <span className="ml-2">{payload[4].value}</span>
                </p>
                <p className="text-sm text-purple-400">
                    Acc Z:
                    <span className="ml-2">{payload[5].value}</span>
                </p>
                <p className="text-sm text-teal-400">
                    Conf Gyro:
                    <span className="ml-2">{payload[6].value}</span>
                </p>
                <p className="text-sm text-lime-400">
                    Conf Acc:
                    <span className="ml-2">{payload[7].value}</span>
                </p>
            </div>
        );
    }

    return null;
};